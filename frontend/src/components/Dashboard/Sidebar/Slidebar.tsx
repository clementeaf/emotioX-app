import { Box, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useLocation } from 'react-router-dom';
import SidebarHeader from './SidebarHeader';
import DocumentationSection from './DocumentationSection';
import sidebarConfig from './sidebarConfig';
import DefaultSidebarList from './DefaultSidebarList';
import { useSelectedResearchStore } from '../../../store/useSelectedResearchStore';
import { useEffect } from 'react';
import Footer from '../../Layout/Footer';

export default function Sidebar() {
  const location = useLocation();
  const { setResearchType, setCustomFormat } = useSelectedResearchStore();

  useEffect(() => {
    if (location.pathname.includes('/behavioural-research')) {
      setResearchType('BehaviouralResearch');
      setCustomFormat(false);
    } else if (location.pathname.includes('/aim-framework')) {
      setResearchType('AIMFramework');
      setCustomFormat(false);
    }
  }, [location.pathname, setResearchType, setCustomFormat]);

  const currentConfig = sidebarConfig.find((item) => item.path === location.pathname);
  const SidebarContent = currentConfig ? currentConfig.component : <DefaultSidebarList />;
  const showDocumentation = currentConfig ? currentConfig.showDocumentation !== false : true;

  return (
    <Stack
      sx={{
        minWidth: '270px',
        width: '100%',
        height: '100vh',
        bgcolor: 'white',
        borderRight: `1px solid ${grey[200]}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      <SidebarHeader />
      {SidebarContent}
      <Box sx={{ mt: 'auto', width: '100%' }}>
        {showDocumentation && <DocumentationSection />}
        <Footer />
      </Box>
    </Stack>
  );
}
