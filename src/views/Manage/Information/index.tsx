import Page from "@/components/Page"
import useAuth from "@/hooks/useAuth";
import InformationDesktop from "@/layouts/Breakpoint/Desktop/InformationDesktop";
import InformationMobile from "@/layouts/Breakpoint/Mobile/InformationMobile";
import { Box, useMediaQuery, useTheme } from "@mui/material"

const ManagementInformation = () => {
    const { profile } = useAuth();
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));

    return(
        <Page title="Hồ sơ người dùng">
            <Box px={3} py={2}>
                {profile && (
                    md ? (
                        <InformationMobile profile={profile}/>
                    ) : (
                        <InformationDesktop profile={profile} md={md} />
                    )
                )}
            </Box>
        </Page>
    )
}

export default ManagementInformation