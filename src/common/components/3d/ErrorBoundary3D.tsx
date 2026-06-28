import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary3D extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("3D Canvas Error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="ans-flex ans-items-center ans-justify-center ans-h-full ans-bg-gray-900 ans-rounded-lg">
          <div className="ans-text-center ans-p-8 ans-max-w-md">
            <h3 className="ans-text-2xl ans-font-bold ans-text-red-400 ans-mb-4">
              3D Scene Failed to Load
            </h3>
            <p className="ans-text-gray-400 ans-mb-2">
              {this.state.error?.message || "WebGL initialization failed"}
            </p>
            <p className="ans-text-gray-500 ans-text-sm ans-mb-6">
              Your browser may not support WebGL or 3D graphics are disabled.
            </p>
            <button
              onClick={this.handleReload}
              className="ans-px-6 ans-py-3 ans-bg-cyan-500 hover:ans-bg-cyan-600 ans-text-white ans-rounded-lg ans-font-semibold ans-transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
