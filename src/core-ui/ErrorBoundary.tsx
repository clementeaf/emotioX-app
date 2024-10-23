import { FallbackProps, ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { Button, Typography } from '@mui/material';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert" style={{ padding: "20px", textAlign: "center" }}>
      <Typography variant="h6" color="error">
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {error.message}
      </Typography>
      <Button variant="contained" color="primary" onClick={resetErrorBoundary} sx={{ marginTop: 2 }}>
        Try again
      </Button>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Lógica de reset. Ej: reiniciar el estado o navegación.
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
