import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import routes from './routes/routes';
import { fallbackRender } from './core-ui/fallbackRender';

function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

function App() {

  return (
    <Router>
      <ErrorBoundary fallbackRender={fallbackRender}>
        <Suspense fallback={<div>Loading...</div>}>
          <AppRoutes />
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
