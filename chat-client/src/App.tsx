import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Loading from "./components/loading/Loading";
import PageLayout from "./layout/PageLayout";
import { ThemeInit } from "../.flowbite-react/init";
import useAuth from "./stores/useAuth";
import CustomToast from "./components/toast/Toast";
import useSocket from "./stores/useSocket";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const Home = lazy(() => import("./pages/Home"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const connectSocket = useSocket((state) => state.connect);

  useEffect(() => {
    if (isAuthenticated) {
      connectSocket();
    }
  }, [isAuthenticated, connectSocket]);
  return (
    <>
      <ThemeInit />
      <BrowserRouter>
        <PageLayout>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route
                path="/"
                element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </PageLayout>
      </BrowserRouter>
      <CustomToast />
    </>
  );
}

export default App;
