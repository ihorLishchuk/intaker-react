import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import './App.css'
import { apiIdInterceptor } from "./interceptors";
import { appConfig } from "./configs";
import { SnackbarProvider } from "./hooks";

const HomePage = lazy(() => import("./components/dashboard/Dashboard.tsx"));
const NotFoundPage = lazy(() => import("./components/page-not-found/PageNotFound.tsx"));

const App = () => {
  apiIdInterceptor(appConfig);

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
