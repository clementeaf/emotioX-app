export function fallbackRender({ error }: { error: Error }) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: 'red' }}>{error.message}</pre>
      </div>
    );
  }