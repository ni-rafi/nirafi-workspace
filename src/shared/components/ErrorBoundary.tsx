import { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, RotateCcw, Home, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  variant?: 'card' | 'page';
  contextTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Caught error:', error, errorInfo);
  }

  private handleReset = () => {
    if (this.props.onReset) {
      this.props.onReset();
    }
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      const error = this.state.error || new Error('Unknown rendering error');

      // 1. If custom fallback is provided as node or render function
      if (this.props.fallback) {
        if (typeof this.props.fallback === 'function') {
          return this.props.fallback(error, this.handleReset);
        }
        return this.props.fallback;
      }

      const variant = this.props.variant || 'page';

      // 2. Card Fallback View
      if (variant === 'card') {
        return (
          <div className="flex flex-col justify-between overflow-hidden rounded-lg border border-destructive/30 bg-destructive/[0.03] dark:bg-destructive/[0.06] p-5 shadow-xs transition-all duration-300 min-h-[140px]">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold tracking-wider uppercase text-destructive">
                  Lecture Error
                </span>
                <h4 className="font-bold text-sm leading-tight text-foreground line-clamp-1">
                  {this.props.contextTitle || 'Failed to load lecture'}
                </h4>
                <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed mt-1">
                  {error.message || 'An error occurred while rendering this card.'}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end">
              <Button
                size="sm"
                variant="ghost"
                onClick={this.handleReset}
                className="h-7 text-[10px] font-bold gap-1 px-2.5 bg-destructive/10 hover:bg-destructive/20 text-destructive border border-destructive/20 rounded-md"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </Button>
            </div>
          </div>
        );
      }

      // 3. Page Fallback View (Default)
      return (
        <div className="min-h-[450px] w-full flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-card border rounded-2xl p-8 shadow-lg flex flex-col items-center gap-5">
            <div className="p-4 bg-destructive/10 rounded-full text-destructive">
              <AlertTriangle className="h-12 w-12" />
            </div>
            
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Something went wrong
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
                An unexpected error occurred while rendering this view.
              </p>
            </div>

            <div className="w-full bg-muted/30 dark:bg-muted/10 border rounded-lg p-3 text-left">
              <span className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground block mb-1">
                Error Details
              </span>
              <p className="text-xs font-mono text-destructive break-all leading-normal">
                {error.toString()}
              </p>
            </div>

            <div className="flex items-center gap-3 w-full mt-2">
              <Button
                onClick={this.handleReset}
                className="flex-1 font-bold gap-1.5 h-10 text-xs bg-primary hover:bg-primary/95 text-primary-foreground rounded-lg"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Retry</span>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex-1 font-bold gap-1.5 h-10 text-xs rounded-lg no-underline hover:no-underline"
              >
                <Link to="/" className="no-underline hover:no-underline flex items-center justify-center gap-1.5">
                  <Home className="h-3.5 w-3.5" />
                  <span>Go to Dashboard</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
