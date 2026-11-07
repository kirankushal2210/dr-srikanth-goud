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
          {/* Global Unified Scroll-Persistent TRS Backdrop (Authentic Darker Party Yellow #F5C619 / #EBB51A) */}
          <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#ECC224]" aria-hidden="true">
            {/* 60% Primary Rich Party Yellow Canvas */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#F5C619] via-[#ECC224] to-[#DFAB14]" />

            {/* Persistent Leader Portrait Backdrop on Right */}
            <img
              src={`${import.meta.env.BASE_URL}hero-bg.png`}
              alt=""
              className="w-full h-full object-cover object-right lg:object-[82%_center] opacity-30 mix-blend-multiply"
            />

            {/* Official TRS Party Flag / Emblem Watermarks - Clearly Visible (opacity 18-20%) */}
            <div className="absolute -left-10 top-1/4 h-[580px] w-[460px] opacity-[0.20] select-none pointer-events-none lg:left-6 lg:top-1/3">
              <img
                src={`${import.meta.env.BASE_URL}assets/images/trs-official-flag.png`}
                alt="TRS Official Flag"
                className="w-full h-full object-contain rounded-2xl drop-shadow-xl"
              />
            </div>
            <div className="absolute -right-12 bottom-12 h-[540px] w-[420px] opacity-[0.18] select-none pointer-events-none">
              <img
                src={`${import.meta.env.BASE_URL}assets/images/trs-official-flag.png`}
                alt="TRS Official Flag"
                className="w-full h-full object-contain rounded-2xl drop-shadow-xl"
              />
            </div>

            {/* Directional Warm Gold Editorial Scrim for Crisp WCAG AAA Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#ECC224]/95 via-[#ECC224]/85 via-45% to-transparent" />
            
            {/* Ambient TRS Gold Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_25%,rgba(245,198,25,0.3),transparent_65%)]" />
          </div>

          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
