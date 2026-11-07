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
          {/* Global Unified Scroll-Persistent TRS Backdrop (60% Yellow Canvas) */}
          <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#FAF2DC]" aria-hidden="true">
            {/* 60% Primary Yellow Layer with subtle warm gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#F7C928]/30 via-[#FAF2DC] to-[#F5D86B]/25" />

            {/* Persistent Leader Portrait Backdrop on Right */}
            <img
              src={`${import.meta.env.BASE_URL}hero-bg.png`}
              alt=""
              className="w-full h-full object-cover object-right lg:object-[82%_center] opacity-35 mix-blend-multiply"
            />

            {/* Official TRS Party Emblem Ambient Watermark (Controlled Opacity 7-8%) */}
            <div className="absolute -left-12 top-1/4 h-[550px] w-[420px] opacity-[0.08] select-none pointer-events-none lg:left-10 lg:top-1/3">
              <img
                src={`${import.meta.env.BASE_URL}assets/images/trs-official-emblem.png`}
                alt=""
                className="w-full h-full object-contain rounded-2xl mix-blend-multiply"
              />
            </div>
            <div className="absolute -right-16 bottom-16 h-[500px] w-[380px] opacity-[0.07] select-none pointer-events-none">
              <img
                src={`${import.meta.env.BASE_URL}assets/images/trs-official-emblem.png`}
                alt=""
                className="w-full h-full object-contain rounded-2xl mix-blend-multiply"
              />
            </div>

            {/* Directional Luminous Warm Editorial Scrim (Guarantees 100% WCAG AAA legibility for copy) */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF2DC] via-[#FAF2DC]/92 via-45% to-transparent" />
            
            {/* Ambient TRS Gold Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_25%,rgba(243,186,22,0.14),transparent_60%)]" />
          </div>

          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
