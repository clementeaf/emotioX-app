import AttentionPredictionSideBar from "../AttentionPredictionMoule/AttentionPredictionSideBar";
import DefaultSidebarList from "./DefaultSidebarList";
import FrameworkSidebar from "./FrameworkSidebar";

type SidebarConfigItem = {
  path: string;
  component: JSX.Element;
  showDocumentation?: boolean;
};

const sidebarConfig: SidebarConfigItem[] = [
  {
    path: '/dashboard',
    component: <DefaultSidebarList />,
    showDocumentation: true,
  },
  {
    path: '/researchHistory',
    component: <DefaultSidebarList />,
    showDocumentation: true,
  },
  {
    path: '/clients',
    component: <DefaultSidebarList />,
    showDocumentation: true,
  },
  {
    path: '/newResearch',
    component: <DefaultSidebarList />,
    showDocumentation: true,
  },
  {
    path: '/newResearch/attention-prediction',
    component: <AttentionPredictionSideBar />,
    showDocumentation: false,
  },
  {
    path: '/newResearch/behavioural-research',
    component: <FrameworkSidebar frameworkType="BehaviouralResearch" />,
    showDocumentation: true,
  },
  {
    path: '/newResearch/aim-framework',
    component: <FrameworkSidebar frameworkType="AIMFramework" />,
    showDocumentation: true,
  },
];

export default sidebarConfig;
