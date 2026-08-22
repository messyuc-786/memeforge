import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('MemeForge Uncaught Error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('memeforge_autosave_project');
      localStorage.removeItem('memeforge_user_saved_memes');
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-3xl bg-rose-500/20 border border-rose-500/40 text-rose-500 flex items-center justify-center mb-4 shadow-xl">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black font-anton uppercase tracking-wide mb-2 text-white">
            MemeForge Reload Needed
          </h1>
          <p className="text-sm text-slate-300 max-w-md mb-6 leading-relaxed">
            A small cache issue occurred. Click the button below to instantly reload the studio:
          </p>
          <button
            onClick={this.handleReset}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white font-black text-sm uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reload MemeForge</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
