import { BsSpeedometer2 } from 'react-icons/bs';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { FaChartBar } from 'react-icons/fa';
import { LuUser2 } from 'react-icons/lu';

type SidebarRoute = {
  path: string;
  label: string;
  icon: React.ComponentType; // Especificamos el tipo como un componente de React
  action?: () => void;
};

// Definimos la configuración sin ejecutar `useResearchStore`
const sidebarRoutes: SidebarRoute[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: BsSpeedometer2, // Pasamos solo la referencia al componente, no el JSX
  },
  {
    path: '/newResearch',
    label: 'New Research',
    icon: IoDocumentTextOutline,
    action: async () => {
      const researchStoreModule = await import('../store/useResearchStore');
      const { resetForm } = researchStoreModule.useResearchStore();
      resetForm();
    },
  },
  {
    path: '/researchHistory',
    label: "Research's history",
    icon: FaChartBar,
  },
  {
    path: '/clients',
    label: 'Clients',
    icon: LuUser2,
  },
  {
    path: '/componentsTest',
    label: 'ComponentTest',
    icon: BsSpeedometer2,
  },
];

export default sidebarRoutes;
