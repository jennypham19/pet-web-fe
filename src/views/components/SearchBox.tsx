import InputSearch from "@/components/SearchBar";
import { Box } from "@mui/material";
import { ReactNode } from "react";

interface SearchBoxProps{
    children?: ReactNode,
    onSearch: (data: string) => void;
    initialValue: string;
    placeholder?: string;
    detailPanel?: React.ReactNode
}
const SearchBox = ({
    children,
    onSearch,
    initialValue,
    placeholder = 'Tìm kiếm....',
    detailPanel
} : SearchBoxProps) => {
    return (
        <Box display='flex' flexDirection={{ xs: 'column', md: 'row'}} justifyContent={{ xs: 'flex-start', md: 'space-between'}}>
            {children && (
                <Box>
                    {children}
                </Box>
            )}   
                <Box mt={{ xs: 1, md: 0 }} gap={1.5} display='flex' flexDirection='row'>        
                    <InputSearch
                        style={{ width: '100%' }}
                        onSearch={onSearch}
                        initialValue={initialValue}
                        placeholder={placeholder}
                        colorIcon="#000"
                        color="#000"
                    />
                    {detailPanel}
                </Box> 
        </Box>
    )
}

export default SearchBox;