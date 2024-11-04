import { Stack } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../Dashboard/Sidebar/Slidebar';
import Header from '../Dashboard/Header';
import Breadcrumb from '../Breadcrumb';

export default function DashboardLayout() {
  const location = useLocation();
  return (
    <Stack direction="row" sx={{ width: '100vw', height: '100vh' }}>
      <Sidebar />
      <Stack sx={{ flex: 1, height: '100vh' }}>
        <Header />
        <Stack sx={{ flex: 1, bgcolor: 'grey.100', overflowY: 'auto', p: 3 }}>
          {location.pathname !== '/dashboard' && <Breadcrumb />}
          <Outlet />
        </Stack>
      </Stack>
    </Stack>
  );
}
