import { useNavigationStore } from '../../store/useNavigationStore';
import FrameworkIndex from './FrameworkIndex';

type IndexProps = {
  frameworkType: 'BehaviouralResearch' | 'AIMFramework';
};

export default function Index({ frameworkType }: IndexProps) {
  const { selectedScreen } = useNavigationStore();

  return (
    <FrameworkIndex
      frameworkType={frameworkType}
      selectedScreen={selectedScreen}
    />
  );
}
