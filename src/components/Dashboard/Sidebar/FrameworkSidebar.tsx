import NavBar from '../../../core-ui/NavBars';
import { useNavigationStore } from '../../../store/useNavigationStore';
import { ResearchSidebar } from './ResearchSideBar';

type FrameworkSidebarProps = {
  frameworkType: 'BehaviouralResearch' | 'AIMFramework';
};

export default function FrameworkSidebar({ frameworkType }: FrameworkSidebarProps) {
  const { selectedScreen } = useNavigationStore();
  const stageTypeMap = ['Build', 'Recruit', 'Result'] as const;
  const stageType = stageTypeMap[selectedScreen];

  return (
    <div>
      <NavBar />
      <ResearchSidebar frameworkType={frameworkType} stageType={stageType} />
    </div>
  );
}
