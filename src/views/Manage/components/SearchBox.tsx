import InputSearch from "@/components/SearchBar";
import { Box } from "@mui/material";
import { ReactNode } from "react";

interface SearchBoxProps{
    children?: ReactNode,
    onSearch: (data: string) => void;
    initialValue: string;
    placeholder?: string;
}
const SearchBox = ({
    children,
    onSearch,
    initialValue,
    placeholder = 'Tìm kiếm....',
} : SearchBoxProps) => {
    return (
        <Box display='flex' justifyContent='space-between'>
            {children && (
                <Box>
                    {children}
                </Box>
            )}            
                <InputSearch
                    style={{ width: '50%' }}
                    onSearch={onSearch}
                    initialValue={initialValue}
                    placeholder={placeholder}
                    colorIcon="#000"
                    color="#000"
                />
        </Box>
    )
}

export default SearchBox;