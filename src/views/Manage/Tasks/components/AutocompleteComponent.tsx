import { PaginatedResponse } from "@/services/base-service";
import { HttpResponse } from "@/types/common";
import { Autocomplete, Box, Checkbox, CircularProgress, TextField, Typography } from "@mui/material";
import { debounce } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window"

const SELECT_ALL_KEY = "__all__";
const LIMIT = 20;
const MAX_CACHE = 50;

export interface AutocompleteComponentProps<T>{
    label?: string,
    placeholder?: string;
    fetchOptions: (params: {
        page: number;
        limit: number;
        searchTerm?: string;
    }) => Promise<HttpResponse<PaginatedResponse<T>>>;
    getOptionLabel: (option: T) =>  string;
    getRenderOption: (option: T) => React.ReactNode;
    onChange: (value: T[]) => void;
    getOptionKey: (option: T) => string | number;
    debounceTime?: number;
    error?: boolean;
    helperText?: React.ReactNode;
}
export default function AutocompleteComponent<T>(props: AutocompleteComponentProps<T>){
    const { label, placeholder, fetchOptions, getOptionLabel, getRenderOption, onChange, getOptionKey, debounceTime = 400, error, helperText } = props;
    const [options, setOptions] = useState<T[]>([]);
    const [value, setValue] = useState<T[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    // =========== CACHE ============
    const cacheRef = useRef(new Map<string, { data: T[]; total: number }>());

    const getCacheKey = (page: number, search?: string) => `${search || ""}_${page}`;

    const setCache = (key: string, value: any) => {
        if(cacheRef.current.size > MAX_CACHE){
            const firstKey = cacheRef.current.keys().next().value;
            firstKey && cacheRef.current.delete(firstKey);
        }

        cacheRef.current.set(key, value)
    }

    // ======== SELECT ALL ========
    const selectAllOption = {
        id: SELECT_ALL_KEY,
        name: "Chọn tất cả thú cưng",
    } as any;

    // ====== FETCH =======
    const fetchData = async(pageNumber: number, search?: string, append = false) => {
        const key = getCacheKey(pageNumber, search);

        // dùng cache
        if(cacheRef.current.has(key)){
            const cached = cacheRef.current.get(key)!;
            setOptions((prev) => append ? [...prev, ...cached.data] : cached.data);
            setTotal(cached.total);
            setHasMore(cached.data.length === LIMIT);
            return;
        }

        setLoading(false);
        try {
            const res = await fetchOptions({ page: pageNumber, limit: LIMIT, searchTerm: search });
            const newData = res.data !== null &&  res.data.data || [];
            // cache
            setCache(key, {
                data: newData,
                total: res.data !== null && res.data.total,
            });
            setOptions((prev) =>
                append ? [...prev, ...newData] : newData
            );
            res.data !== null && setTotal(res.data.total);
            setHasMore(newData.length === LIMIT);
        } catch (err) {
            console.error(err);
            setOptions([])
        } finally {
            setLoading(false);
        }
    }

    // ======= SEARCH ======
    const debounceSearch = useMemo(
        () =>
            debounce((search: string) => {
                setPage(1);
                fetchData(1, search, false);
            }, debounceTime),
        []
    )

    useEffect(() => {
        return () => debounceSearch.cancel();
    }, []);

    // ====== OPEN =======
    const handleOpen = () => {
        if(options.length === 0){
            fetchData(1, "", false);
        }
    };

    // ====== SCROLL =======
    const handleScroll = (event: any) => {
        const node = event.currentTarget;
        const isBottom = node.scrollTop + node.clientHeight >= node.scrollHeight - 5;
        if(isBottom && hasMore && !loading){
            const nextPage = page + 1;
            setPage(nextPage);
            fetchData(nextPage, inputValue, true);
        }
    }

    // ===== OPTIONS =====
    const displayOptions = options.length > 0 ? [selectAllOption, ...options] : options;

    // ===== VIRTUAL LIST =====
    const ListboxComponent = (props: any) => {
        const { children, ...other } = props;
        const itemData = children;
        return(
            <div {...other}>
                {/* sticky select all */}
                {itemData[0]}
                <FixedSizeList
                    height={300}
                    width='100%'
                    itemSize={50}
                    itemCount={itemData.length - 1}
                    overscanCount={5}
                >
                    {({ index, style }: ListChildComponentProps) => (
                        <div style={style}>{itemData[index + 1]}</div>
                    )}
                </FixedSizeList>
            </div>
        )
    };

    return(
        <Autocomplete
            multiple
            options={displayOptions}
            value={value}
            disableCloseOnSelect
            onOpen={handleOpen}
            filterOptions={(x) => x}
            ListboxComponent={ListboxComponent as any}
            ListboxProps={{ onScroll: handleScroll }}
            getOptionLabel={(option) =>
                getOptionKey(option) === SELECT_ALL_KEY
                    ? "Chọn tất cả thú cưng"
                    : getOptionLabel(option)
            }
            isOptionEqualToValue={(o,v) =>
                getOptionKey(o) === getOptionKey(v)
            }
            onInputChange={(e, newValue, reason) => {
                if(reason === "input"){
                    setInputValue(newValue);
                    debounceSearch(newValue)
                }

                if(reason === "clear"){
                    debounceSearch.cancel();
                    setInputValue("");
                    setPage(1);
                    fetchData(1, "", false);
                }
            }}
            onChange={(e, newValue) => {
                const isSelectAll = newValue.some((item) => getOptionKey(item) === SELECT_ALL_KEY)
                let finalValue = newValue;
                if(isSelectAll){
                    const isAllSelected = value.length === total;
                    finalValue = isAllSelected ? [] : options;
                }
                setValue(finalValue);
                onChange(finalValue);

                // reset search
                debounceSearch.cancel();
                setInputValue("");
                setPage(1);
                fetchData(1, "", false);
            }}
            loading={loading}
            renderOption={(props, option, { selected }) => {
                const isAll = getOptionKey(option) === SELECT_ALL_KEY;
                const isCheckedAll = value.length === total && total > 0;
                const isIndeterminate = value.length > 0 && value.length < total;
                return(
                    <Box
                        component="li"
                        { ...props }
                        sx={{
                            gap: 1,
                            position: isAll ? "sticky" : "relative",
                            top: 0,
                            zIndex: 1,
                            bgcolor: (theme) =>
                                isAll ? theme.palette.background.paper : "inherit",
                            borderBottom: isAll ? "1px solid #eee" : "none",
                            mb: isAll ? 1 : 0
                        }}
                    >
                        <Checkbox
                            checked={isAll ? isCheckedAll : selected}
                            indeterminate={isAll ? isIndeterminate : false}
                        />
                        {isAll ? "Chọn tất cả thú cưng" : (getRenderOption ? getRenderOption(option) : getOptionLabel(option))}
                    </Box>
                )
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    placeholder={value.length === 0 ? placeholder : ""}
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
                                <Typography sx={{ mr: 1, fontSize: 12 }}>
                                    {`Đã chọn ${value.length}/${total}`}
                                </Typography>
                                {loading && <CircularProgress size={18}/>}
                                {params.InputProps.endAdornment}
                            </>
                        )
                    }}    
                />
            )}
        />
    )
}