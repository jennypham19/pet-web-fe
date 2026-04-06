import { PaginatedResponse } from "@/services/base-service";
import { HttpResponse } from "@/types/common";
import {
    Autocomplete,
    Box,
    Checkbox,
    CircularProgress,
    TextField,
    Typography
} from "@mui/material";
import { debounce } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";

const LIMIT = 20;
const MAX_CACHE = 50;

export interface AutocompleteComponentProps<T>{
    label?: string;
    placeholder?: string;
    fetchOptions: (params: {
        page: number;
        limit: number;
        searchTerm?: string;
    }) => Promise<HttpResponse<PaginatedResponse<T>>>;
    getOptionLabel: (option: T) =>  string;
    getRenderOption: (option: T) => React.ReactNode;
    onChange: (value: T | null) => void;
    getOptionKey: (option: T) => string | number;
    debounceTime?: number;
    error?: boolean;
    helperText?: React.ReactNode;
    values?: T | null;
}

export default function AutocompleteComponent<T>(props: AutocompleteComponentProps<T>) {
    const { label, placeholder, fetchOptions, getOptionLabel, getRenderOption, onChange, getOptionKey, debounceTime, error, helperText, values } = props;

    const [options, setOptions] = useState<T[]>([]);
    const [value, setValue] = useState<T | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        if(values !== undefined){
            setValue(values)
        }
    }, [values])

    // =========== CACHE ============
    const cacheRef = useRef(
        new Map<string, { data: T[]; total: number }>()
    );

    const getCacheKey = (page: number, search?: string) => `${search || ""}_${page}`;

    const setCache = (key: string, value: any) => {
        if(cacheRef.current.size > MAX_CACHE){
            const firstKey = cacheRef.current.keys().next().value;
            firstKey && cacheRef.current.delete(firstKey);
        }
    }

    // ====== FETCH =======
    const fetchData = async(pageNumber: number, search?: string, append = false) => {
        const key = getCacheKey(pageNumber, search);
        if(cacheRef.current.has(key)){
            const cached = cacheRef.current.get(key)!;
            setOptions((prev) => append ? [...prev, ...cached.data] : cached.data);
            setTotal(cached.total);
            setHasMore(cached.data.length === LIMIT);
            return;
        }

        setLoading(true);
        try {
            const res = await fetchOptions({ page: pageNumber, limit: LIMIT, searchTerm: search});
            const newData = res.data?.data || [];
            setCache(key, {
                data: newData,
                total: res.data?.total || 0
            });

            setOptions((prev) => append ? [...prev, ...newData] :  newData);
            setTotal(res.data?.total || 0);
            setHasMore(newData.length === LIMIT);
        } catch (error) {
            console.error("Error fetching options:", error);
            setOptions([]);
            setTotal(0);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }

    // ====== SEARCH ======
    const debounceSearch = useMemo(() => debounce((search: string) => {
        setPage(1);
        fetchData(1, search, false);
    }, debounceTime), []);

    useEffect(() => {
        return () => debounceSearch.cancel();
    }, []);

    // ====== OPEN =======
    const handleOpen = () => {
        if (options.length === 0) {
            fetchData(1, "", false);
        }
    };

    // ====== SCROLL =======
    const handleScroll = (event: any) => {
        const node = event.currentTarget;
        const isBottom =
            node.scrollTop + node.clientHeight >= node.scrollHeight - 5;

        if (isBottom && hasMore && !loading) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchData(nextPage, inputValue, true);
        }
    };

    // ===== VIRTUAL LIST =====
    const ListboxComponent = (props: any) => {
        const { children, ...other } = props;
        const itemData = children;

        return (
            <div {...other}>
                <FixedSizeList
                    height={300}
                    width="100%"
                    itemSize={50}
                    itemCount={itemData.length}
                    overscanCount={5}
                >
                    {({ index, style }: ListChildComponentProps) => (
                        <div style={style}>{itemData[index]}</div>
                    )}
                </FixedSizeList>
            </div>
        );
    };

    return(
        <Autocomplete
            options={options}
            value={value}
            onOpen={handleOpen}
            filterOptions={(x) => x}
            ListboxComponent={ListboxComponent as any}
            ListboxProps={{ onScroll: handleScroll }}
            getOptionLabel={(option) => getOptionLabel(option)}
            isOptionEqualToValue={(o, v) => getOptionKey(o) === getOptionKey(v)}
            onInputChange={(e, newValue, reason) => {
                if(reason === 'input'){
                    setInputValue(newValue);
                    debounceSearch(newValue);
                }

                if(reason === 'clear'){
                    debounceSearch.cancel();
                    setInputValue("");
                    setPage(1);
                    fetchData(1, "", false);
                }
            }}
            onChange={(e, newValue) => {
                setValue(newValue);
                onChange(newValue);
            }}
            loading={loading}
            renderOption={(props, option,  { selected }) => {
                return (
                    <Box 
                        component='li' {...props}
                        sx={{
                            gap: 1,
                            position: 'relative',
                            top: 0,
                            zIndex: 1,
                            bgcolor: "inherit"
                        }}
                    >
                        <Checkbox
                            checked={selected}
                        />
                        {getRenderOption ? getRenderOption(option) : getOptionLabel(option)}
                    </Box>
                )
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    placeholder={!value ? placeholder : ""}
                    error={error}
                    helperText={helperText}
                    InputProps={{
                        ...params.InputProps,
                        sx: {
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: '1px solid rgb(53, 50, 50)',
                                borderRadius: '8px',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                border: '1px solid rgb(53, 50, 50)',
                            },
                        },
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress size={18} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        )
                    }}  
                />
            )}
        />
    )
}