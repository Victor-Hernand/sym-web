import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import { Suspense, lazy } from "react";
import Home from "./pages/Home";

// Rutas secundarias en bloques aparte: se descargan solo al visitarlas.
const Catalogo = lazy(() => import("./pages/Catalogo"));
const Nosotros = lazy(() => import("./pages/Nosotros"));
const Contacto = lazy(() => import("./pages/Contacto"));
const Privacidad = lazy(() => import("./pages/Privacidad"));

function RouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg" role="status" aria-live="polite">
      <span className="font-display text-xs font-bold uppercase tracking-wider text-[#1B3A6B]/50">Cargando…</span>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<RouteFallback />}>
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/catalogo"} component={Catalogo} />
      <Route path={"/nosotros"} component={Nosotros} />
      <Route path={"/contacto"} component={Contacto} />
      <Route path={"/privacidad"} component={Privacidad} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <CartProvider>
            <Toaster />
            <Router />
          </CartProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
