import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './AuthContext'
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{ padding: '20px', background: 'red', color: 'white' }}>
      <p>Uygulamada bir hata oluştu:</p>
      <pre style={{ color: 'white' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary} style={{ background: 'white', color: 'red', border: 'none', padding: '10px', marginTop: '10px' }}>Tekrar Dene</button>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>,
)
