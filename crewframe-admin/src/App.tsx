import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import Login from "./pages/Login/Login";
import Overview from "./pages/Overview/Overview";
import Leads from "./pages/Leads/Leads";
import Work from "./pages/Work/Work";
import Crew from "./pages/Crew/Crew";
import Pricing from "./pages/Pricing/Pricing";
import Testimonials from "./pages/Testimonials/Testimonials";
import Faq from "./pages/Faq/Faq";
import Settings from "./pages/Settings/Settings";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Overview />} />
        <Route path="leads" element={<Leads />} />
        <Route path="work" element={<Work />} />
        <Route path="crew" element={<Crew />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="faq" element={<Faq />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
