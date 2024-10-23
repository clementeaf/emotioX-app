import { Stack } from '@mui/material';
import Sidebar from '../Dashboard/Slidebar';
import { Outlet } from 'react-router-dom';
import Header from '../Dashboard/Header';

export default function PublicStudyLayout() {
    return (
        <Stack direction="row" sx={{ width: '100vw', height: '100%' }}>
        <Sidebar />
        <Stack sx={{ flex: 1 }}>
          <Header />
          <Stack sx={{ flex: 1, bgcolor: 'grey.100', overflowY: 'auto', p: 3 }}>
            <Outlet />
          </Stack>
        </Stack>
      </Stack>
    )
}