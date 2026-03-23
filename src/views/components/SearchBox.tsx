import InputSearch from "@/components/SearchBar";
import { Box } from "@mui/material";
import { ReactNode } from "react";
import Grid from "@mui/material/Grid2"

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
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                {children && (
                    <Box>
                        {children}
                    </Box>
                )}                
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
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
            </Grid>    
        </Grid>
    )
}

export default SearchBox;