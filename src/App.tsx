import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./features/auth/pages/login";
// import ForgetPassword from "./features/auth/pages/forgotPassword";
import Signup from "./features/auth/pages/signup";
import Dashboard from "./features/dashboard/pages/dashboard";
import OAuthCallback from "./features/auth/pages/oauthCallback";
import { SharedVault } from "./pages/SharedVault";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./features/auth/routes/ProtectedRoute";
import PublicRoute from "./features/auth/routes/PublicRoute";
import  PageNotFound  from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className:
            "!bg-white !text-gray-900 !border !border-gray-200 !shadow dark:!bg-[#111111] dark:!text-white dark:!border-white/10",
        }}
      />
      <Routes>

        <Route path="/" element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        } />


        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

        {/* <Route path="/forgot-password" element={
          <PublicRoute>
            <ForgetPassword />
          </PublicRoute>
        } /> */}


        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />


        <Route path="/dashboard/*" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />


        <Route path="/auth-success" element={<OAuthCallback />} />

        <Route path="/share/:shareLink" element={<SharedVault />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
