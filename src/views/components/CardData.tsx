import { Card, CardContent } from "@mui/material";

interface CardDataProps{
    children: React.ReactNode,
    onDetail?: () => void;
}

const CardData = (props: CardDataProps) => {
    const { children, onDetail } = props;
    return(
        <Card
            onClick={onDetail}
            sx={{ cursor: 'pointer', borderRadius: 3, boxShadow: '2px 2px 4px 2px rgba(0,0,0,0.1)' }}
        >
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}

export default CardData;