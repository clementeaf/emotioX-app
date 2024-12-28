import { Stack } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../Dashboard/Sidebar/Slidebar';
import Header from '../Dashboard/Header';
import Breadcrumb from '../Breadcrumb';

export default function DashboardLayout() {
  const location = useLocation();
  return (
    <Stack direction="row" sx={{ width: '100vw', height: '100%' }}>
      <Sidebar />
      <Stack sx={{ flex: 1, height: '100vh' }}>
        <Header />
        <Stack sx={{ flex: 1, bgcolor: 'grey.100', overflowY: 'auto', p: 3, height: '100%' }}>
          {location.pathname !== '/dashboard' && <Breadcrumb />}
          <Stack >
            <Outlet />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
