import { useEffect } from 'react';
import { useNavigationStore } from '../../../store/useNavigationStore';
import Index from '../StudiesIndex';

export default function AIMFrameworkWrapper() {
  const { setFrameworkType, setSelectedScreen } = useNavigationStore();

  useEffect(() => {
    setFrameworkType('AIMFramework');
    setSelectedScreen(0);
  }, [setFrameworkType, setSelectedScreen]);

  return <Index frameworkType="AIMFramework" />;
}
