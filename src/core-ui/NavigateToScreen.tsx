// NavigateToScreen.tsx
import { useEffect } from "react";
import { useNavigationStore } from "../store/useNavigationStore";

interface NavigateToScreenProps {
  screen: number;
}

export function NavigateToScreen({ screen }: NavigateToScreenProps) {
  const { selectedScreen, setSelectedScreen } = useNavigationStore();

  useEffect(() => {
    if (selectedScreen !== screen) {
      setSelectedScreen(screen);
    }
  }, [screen, selectedScreen, setSelectedScreen]);

  return null;
}
