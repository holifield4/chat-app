import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
import Loading from "./components/loading/Loading";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading/>}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
