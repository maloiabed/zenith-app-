import * as React from 'react';
import { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, ShieldAlert } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<any, any> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Zenith Module Error:', error, errorInfo);

    // Synchronize telemetry with backend
    fetch('/api/log-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: error.toString(),
        stack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        module: 'Zenith_Core'
      }),
    }).catch(err => console.error('Telemetry uplink failed:', err));
  }

  render() {
    if ((this as any).state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-red-50/30 rounded-3xl border border-red-100 text-center animate-in fade-in zoom-in duration-300">
          <div className="bg-red-100 p-4 rounded-2xl mb-6">
            <ShieldAlert className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="text-xl font-black uppercase tracking-widest text-red-900 mb-2">Cognitive Link Severed</h2>
          <p className="text-sm text-red-700/70 mb-8 max-w-md italic font-medium leading-relaxed">
            "Zenith encountered a localized system failure in this module. The biological data link remains secure, but the UI layer requires resuscitation."
          </p>
          
          <div className="bg-white/50 backdrop-blur-sm border border-red-100 p-4 rounded-xl mb-8 w-full max-w-md text-left">
            <div className="flex items-center text-red-500 mb-2">
              <AlertTriangle className="h-3 w-3 mr-2" />
              <span className="text-[10px] font-black uppercase tracking-tighter">Stack Trace Fragment</span>
            </div>
            <code className="text-[10px] font-mono text-red-800 break-words">
            {((this as any).state as any).error?.message || 'Unknown kernel panic'}
            </code>
          </div>

          <button 
            onClick={() => (this as any).setState({ hasError: false, error: null })}
            className="flex items-center px-6 py-3 bg-red-600 text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-lg shadow-red-200"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Re-Initialize Link
          </button>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
