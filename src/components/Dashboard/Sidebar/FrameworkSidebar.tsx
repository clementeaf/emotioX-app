import NavBar from '../../../core-ui/NavBars';
import { useAIMFrameWorkNavigationStore } from '../../../store/useAIMFrameWorkNavigationStore';
import { BuildSidebar } from './BuildSidebar';
import { RecruitSidebar } from './RecruitSidebar';
import ResultsSidebar from './ResultsSidebar';

type FrameworkSidebarProps = {
  frameworkType: 'BehaviouralResearch' | 'AIMFramework';
};

export default function FrameworkSidebar({ frameworkType }: FrameworkSidebarProps) {
  const { selectedScreen } = useAIMFrameWorkNavigationStore();

  return (
    <div>
      <NavBar />
      {selectedScreen === 0 && <BuildSidebar frameworkType={frameworkType} />}
      {selectedScreen === 1 && <RecruitSidebar frameworkType={frameworkType} />}
      {selectedScreen === 2 && <ResultsSidebar frameworkType={frameworkType} />}
    </div>
  );
}
