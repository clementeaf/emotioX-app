// BehaviouralResearchWrapper.tsx
import { useEffect } from 'react';
import { useNavigationStore } from '../../../store/useNavigationStore';
import Index from '../StudiesIndex';

export default function BehaviouralResearchWrapper() {
  const { setFrameworkType, setSelectedScreen } = useNavigationStore();

  useEffect(() => {
    // Configura el tipo de framework al montar este componente
    setFrameworkType('BehaviouralResearch');
    setSelectedScreen(0);  // Si quieres iniciar en "Build", de lo contrario, ajusta el valor
  }, [setFrameworkType, setSelectedScreen]);

  return <Index frameworkType="BehaviouralResearch" />;
}
