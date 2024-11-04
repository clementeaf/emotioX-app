import NavBar from '../../../core-ui/NavBars';
import { useAIMFrameWorkNavigationStore } from '../../../store/useAIMFrameWorkNavigationStore';
import { BuildSideBar } from './SideBarContents/BuildSidebar';
import { RecruitSidebar } from './SideBarContents/RecruitSidebar';
import ResultsSidebar from './SideBarContents/ResultsSidebar';

export default function BehaviouralResearchSideBar() {
  const { selectedScreen } = useAIMFrameWorkNavigationStore();
  return (
    <div>
        <NavBar />
        {selectedScreen === 0 && <BuildSideBar />}
        {selectedScreen === 1 && <RecruitSidebar />}
        {selectedScreen === 2 && <ResultsSidebar />}
    </div>
  )
}
