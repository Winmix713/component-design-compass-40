
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
    this.reset = this.reset.bind(this);
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  reset(): void {
    this.setState({ hasError: false, error: null });
  }

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback(this.state.error, this.reset);
      }
      
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="p-6 max-w-md mx-auto mt-10 border rounded-md shadow-lg bg-destructive/5">
          <h2 className="text-lg font-bold text-destructive mb-4">Something went wrong</h2>
          <p className="text-sm text-muted-foreground mb-4">
            {this.state.error.message || 'An unexpected error occurred'}
          </p>
          <pre className="text-xs bg-muted p-2 rounded mb-4 overflow-auto max-h-40">
            {this.state.error.stack}
          </pre>
          <button
            className="bg-primary text-white px-4 py-2 rounded text-sm"
            onClick={this.reset}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
