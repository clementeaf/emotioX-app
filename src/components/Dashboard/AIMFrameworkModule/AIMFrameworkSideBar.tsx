import NavBar from '../../../core-ui/NavBars';
import { useAIMFrameWorkNavigationStore } from '../../../store/useAIMFrameWorkNavigationStore';
import { BuildSideBar } from './SideBarContents/BuildSideBar';
import { RecruitSideBar } from './SideBarContents/RecruitSideBar';
import ResultsSideBar from './SideBarContents/ResultsSideBar';

export default function AIMFrameworkSideBar() {
  const { selectedScreen } = useAIMFrameWorkNavigationStore();
  return (
    <div>
        <NavBar />
        {selectedScreen === 0 && <BuildSideBar />}
        {selectedScreen === 1 && <RecruitSideBar />}
        {selectedScreen === 2 && <ResultsSideBar />}
    </div>
  )
}
