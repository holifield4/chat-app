import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "./components/loading/Loading";
import PageLayout from "./layout/PageLayout";
import { ThemeInit } from "../.flowbite-react/init";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const Home = lazy(() => import("./pages/Home"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <>
    <ThemeInit/>
    <BrowserRouter>
      <PageLayout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </PageLayout>
    </BrowserRouter>
    </>
  );
}

export default App;
