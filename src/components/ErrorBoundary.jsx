import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';

/**
 * ErrorBoundaryClass — Standard React Class Component for catching runtime rendering errors.
 * React requires class components for error boundaries as functional components do not
 * currently support static getDerivedStateFromError or componentDidCatch hooks.
 */
class ErrorBoundaryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Update state so the next render will show the fallback UI.
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Log error telemetry details.
  componentDidCatch(error, errorInfo) {
    // NOTE: This is where a real error-reporting service like Sentry or LogRocket 
    // would hook in later to report production errors to developer monitors.
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  // Resets the error boundary state to attempt clean re-rendering.
  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const isDev = import.meta.env.DEV;
      return (
        <div className="flex items-center justify-center p-6 min-h-[400px]">
          <Card className="max-w-md w-full p-8 text-center border-danger/30 shadow-lg">
            <div className="mx-auto w-16 h-16 bg-danger/10 text-danger rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8" />
            </div>
            
            <h2 className="text-2xl font-bold text-text-primary mb-3">Something went wrong</h2>
            <p className="text-text-secondary text-sm mb-6 leading-relaxed">
              This section hit an error, but the rest of the app is fine.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="primary" onClick={this.handleReset} className="w-full sm:w-auto">
                Try again
              </Button>
              <Button variant="outline" onClick={() => this.props.navigate('/dashboard')} className="w-full sm:w-auto">
                Go to dashboard
              </Button>
            </div>

            {/* In development mode only, output diagnostic stack traces */}
            {isDev && this.state.error && (
              <details className="text-left bg-bg-page border border-border rounded-xl p-4 mt-6 overflow-x-auto text-xs font-mono max-h-48 text-text-secondary">
                <summary className="cursor-pointer font-bold text-text-primary mb-2 select-none">
                  Error Details (Dev Mode Only)
                </summary>
                <div className="text-danger font-semibold mb-1">
                  {this.state.error.toString()}
                </div>
                <pre className="whitespace-pre-wrap leading-relaxed opacity-85">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Functional wrapper for ErrorBoundaryClass to inject the React Router useNavigate hook.
 */
export default function ErrorBoundary({ children }) {
  const navigate = useNavigate();
  return (
    <ErrorBoundaryClass navigate={navigate}>
      {children}
    </ErrorBoundaryClass>
  );
}
