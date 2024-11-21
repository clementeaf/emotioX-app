import { BsSpeedometer2 } from 'react-icons/bs';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { FaChartBar } from 'react-icons/fa';
import { LuUser2 } from 'react-icons/lu';

type SidebarRoute = {
  path: string;
  label: string;
  icon: React.ComponentType;
  actionType?: 'RESET_FORM';
};

const sidebarRoutes: SidebarRoute[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: BsSpeedometer2,
  },
  {
    path: '/newResearch',
    label: 'New Research',
    icon: IoDocumentTextOutline,
    actionType: 'RESET_FORM',
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
    path: '/studies',
    label: 'Studies',
    icon: LuUser2,
  },
  {
    path: '/componentsTest',
    label: 'ComponentTest',
    icon: BsSpeedometer2,
  },
];

export default sidebarRoutes;
