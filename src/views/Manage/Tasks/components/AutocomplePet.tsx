import {
  Autocomplete,
  Box,
  Checkbox,
  CircularProgress,
  TextField,
} from "@mui/material";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";

export interface AutocompleteProps<T> {
  label?: string;
  placeholder?: string;
  fetchOptions: (params: {
    page: number;
    limit: number;
    searchTerm?: string;
  }) => Promise<any>;
  getOptionLabel: (option: T) => string;
  getOptionKey: (option: T) => string | number;
  onChange: (value: T[]) => void;
  debounceTime?: number;
  getRenderOption: (option: T) => React.ReactNode;
}

export default function AutocompleteComponentPet<T>(
  props: AutocompleteProps<T>
) {
  const {
    label,
    placeholder,
    fetchOptions,
    getOptionLabel,
    getOptionKey,
    onChange,
    debounceTime = 400,
    getRenderOption
  } = props;

  const [options, setOptions] = useState<T[]>([]);
  const [value, setValue] = useState<T[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // ===== fetch data =====
  const fetchData = async (pageNumber: number, search?: string, append = false) => {
    setLoading(true);
    try {
      const res = await fetchOptions({
        page: pageNumber,
        limit: 10,
        searchTerm: search,
      });

      const newData = res.data?.data || [];

      setOptions((prev) =>
        append ? [...prev, ...newData] : newData
      );

      setHasMore(newData.length === 10);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ===== debounce search =====
  const debounceSearch = useMemo(
    () =>
      debounce((search: string) => {
        setPage(1);
        fetchData(1, search, false);
      }, debounceTime),
    [debounceTime]
  );

  useEffect(() => {
    return () => debounceSearch.cancel();
  }, [debounceSearch]);

  // ===== load lần đầu khi open =====
  const handleOpen = () => {
    if (options.length === 0) {
      fetchData(1, "", false);
    }
  };

  // ===== scroll load more =====
  const handleScroll = (event: any) => {
    const listboxNode = event.currentTarget;

    const isBottom =
      listboxNode.scrollTop + listboxNode.clientHeight >=
      listboxNode.scrollHeight - 5;

    if (isBottom && !loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(nextPage, inputValue, true);
    }
  };

  return (
    <Autocomplete
      multiple
      options={options}
      value={value}
      onOpen={handleOpen}
      disableCloseOnSelect
      filterOptions={(x) => x}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={(o, v) =>
        getOptionKey(o) === getOptionKey(v)
      }
      onInputChange={(e, newValue, reason) => {
        if (reason === "input") {
          setInputValue(newValue);
          debounceSearch(newValue);
        }

        if (reason === "clear") {
            debounceSearch.cancel();
            setOptions([]);
            setValue([]);
            setInputValue("");
            setPage(1);
        }
      }}
      onChange={(e, newValue) => {
        setValue(newValue);
        onChange(newValue);

        // reset search
        debounceSearch.cancel();
        setInputValue("");

        // reset lại data
        setPage(1);
        fetchData(1, "", false);
      }}
      loading={loading}
      ListboxProps={{
        onScroll: handleScroll,
        style: { maxHeight: 300, overflow: "auto" },
      }}
      renderOption={(props, option, { selected }) => (
        <Box sx={{ gap: 1 }} component="li" {...props}>
            <Checkbox checked={selected} />
            {getRenderOption ? getRenderOption(option) : getOptionLabel(option)}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={value.length === 0 ? placeholder : ' '}
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
                {loading && <CircularProgress size={18} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}