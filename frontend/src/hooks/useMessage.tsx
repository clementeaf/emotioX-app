import { useCallback, useState } from "react";

export const useMessage = () => {
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const setError = useCallback((text: string) => {
    setMessage({ type: 'error', text });
  }, []);

  const setSuccess = useCallback((text: string) => {
    setMessage({ type: 'success', text });
  }, []);

  return { message, setError, setSuccess };
};