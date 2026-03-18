import { Card, CardContent } from "@mui/material";

interface CardDataProps{
    children: React.ReactNode
}

const CardData = (props: CardDataProps) => {
    const { children } = props;
    return(
        <Card
            onClick={() => {}}
            sx={{ cursor: 'pointer', borderRadius: 3, boxShadow: '2px 2px 4px 2px rgba(0,0,0,0.1)' }}
        >
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}

export default CardData;