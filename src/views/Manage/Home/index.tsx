import Page from "@/components/Page"
import { ROLE } from "@/constants/roles";
import useAuth from "@/hooks/useAuth"
import { Box } from "@mui/material"
import DashboardInMod from "../Roles/Mod/Home";
import CalendarHomeInMod from "../Roles/Mod/CalendarHome";

const ManagementHome = () => {
    const { profile } = useAuth();
    return(
        <Page title="Trang chủ">
            {profile?.role === ROLE.MOD && (
                <CalendarHomeInMod/>
            )}
        </Page>
    )
}

export default ManagementHome