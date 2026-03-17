import Box from '@mui/material/Box';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAppSelector } from '@/store';
import { SidebarTitleContext } from '@/contexts/SidebarTitleContext';
import { COLORS } from '@/constants/colors';
import { Star } from '@mui/icons-material';
import { Typography } from '@mui/material';

const DashboardLayout = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [title, setTitle] = useState('');

  const { profile } = useAppSelector((state) => state.auth);

  const handleToggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleToggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Box>
      <SidebarTitleContext.Provider value={{ title, setTitle }}>
      <Box sx={{ display: 'flex' }}>
        <Sidebar
          profile={profile}
          collapsed={collapsed}
          openSidebar={openSidebar}
          onCloseSidebar={handleToggleSidebar}
          onToggleCollapsed={handleToggleCollapsed}
        />
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100svh',
            paddingTop: '64px',
            overflow: 'hidden',
          }}
        >
          <Header
            collapsed={collapsed}
            onToggleSidebar={handleToggleSidebar}
            onToggleCollapsed={handleToggleCollapsed}
          />
          <Box display='flex' flexDirection='row' p={2} bgcolor={COLORS.PRIMARY}>
            <Star sx={{ color: '#fff'}}></Star>
            <Typography sx={{ color: '#fff', ml: 1 }}>Xin chào {profile?.name}</Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Outlet />
          </Box>
          <Footer />
        </Box>
      </Box>
      </SidebarTitleContext.Provider>
    </Box>
  );
};

export default DashboardLayout;
