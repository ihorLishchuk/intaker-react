import {lazy, Suspense} from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import './App.css'
import {setupApiIdInterceptor} from "./interceptors/setupApiIdInterceptor.ts";
import useAppConfig from "./hooks/useAppConfg.ts";
import SnackbarProvider from "./services/SnackBarProvider.tsx";

const HomePage = lazy(() => import("./components/dashboard/Dashboard.tsx"));
const NotFoundPage = lazy(() => import("./components/page-not-found/PageNotFound.tsx"));

const App = () => {
  setupApiIdInterceptor(useAppConfig());

  return (
      <SnackbarProvider>
          <Suspense fallback={<div className="container">Loading...</div>}>
              <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="dashboard" element={<HomePage />} />
                  <Route path="*" element={<NotFoundPage />} />
              </Routes>
          </Suspense>
      </SnackbarProvider>
  )
}

export default App
