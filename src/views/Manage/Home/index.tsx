import Page from "@/components/Page"
import { ROLE } from "@/constants/roles";
import useAuth from "@/hooks/useAuth"
import { Box } from "@mui/material"
import DashboardInMod from "../Roles/Mod/Home";

const ManagementHome = () => {
    const { profile } = useAuth();
    return(
        <Page title="Trang chủ">
            {profile?.role === ROLE.MOD && (
                <DashboardInMod/>
            )}
        </Page>
    )
}

export default ManagementHome