import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import Home from '@/pages/home';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          {/* Global Unified Scroll-Persistent Backdrop */}
          <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#FAF8F5]" aria-hidden="true">
            {/* Persistent Leader Portrait Backdrop */}
            <img
              src={`${import.meta.env.BASE_URL}hero-bg.png`}
              alt=""
              className="w-full h-full object-cover object-right lg:object-[82%_center] opacity-35 mix-blend-multiply"
            />
            {/* Directional Luminous Warm Editorial Scrim (Guarantees crystal clear text contrast on the left, reveals portrait on the right) */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/90 via-45% to-[#FAF8F5]/35" />
            {/* Ambient Warm Golden Statesman Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_25%,rgba(202,138,4,0.12),transparent_60%)]" />
          </div>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
