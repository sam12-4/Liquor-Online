import React from 'react';

/**
 * Error boundary component to catch errors in child components
 * and display a fallback UI instead of crashing the entire app
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to the console
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI if provided, otherwise a default message
      return this.props.fallback || <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 