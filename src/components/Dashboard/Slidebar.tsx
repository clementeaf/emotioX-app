import { Box, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useLocation } from 'react-router-dom';
import Footer from '../Layout/Footer';
import DefaultSidebarList from './DefaultSidebarList';
import SidebarHeader from './SidebarHeader';
import DocumentationSection from './DocumentationSection';
import AttentionPredictionSideBar from './AttentionPredictionSideBar';
import AIMFrameworkSideBar from './AIMFrameworkModule/AIMFrameworkSideBar';

const sidebarRoutes: { [key: string]: JSX.Element } = {
  '/dashboard': <DefaultSidebarList />,
  '/researchHistory': <DefaultSidebarList />,
  '/clients': <DefaultSidebarList />,
  '/newResearch': <DefaultSidebarList />,
  '/newResearch/attention-prediction': <AttentionPredictionSideBar />,
  '/newResearch/aim-framework': <AIMFrameworkSideBar />,
};

export default function Sidebar() {
  const location = useLocation();
  const currentSidebar = sidebarRoutes[location.pathname] || <DefaultSidebarList />;

  return (
    <Stack
      sx={{
        width: '250px',
        height: '100vh',
        bgcolor: 'white',
        borderRight: `1px solid ${grey[200]}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        overflowY: 'auto', // Desplazamiento solo vertical
        overflowX: 'hidden', // Evita el desplazamiento horizontal
      }}
    >
      <SidebarHeader />
      {currentSidebar}
      <Box sx={{ mt: 'auto', width: '100%' }}> {/* Empuja el Footer al fondo */}
        {location.pathname !== '/dashboard/newResearch/attention-prediction' && <DocumentationSection />}
        <Footer />
      </Box>
    </Stack>
  );
}
