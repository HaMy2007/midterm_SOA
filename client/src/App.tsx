import { Suspense } from "react";
import { Route, Routes } from "react-router";
import RoleSelectionScreen from "./pages/RoleSelectionScreen";
import Dashboard from "./pages/Dashboard";
import { RoleProvider } from "./context/RoleContext";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import Reservations from "./pages/Reservations";
import Reviews from "./pages/Reviews";

function App() {
  return (
    <Suspense fallback={<p>Loading component...</p>}>
      <RoleProvider>
        <Routes>
          <Route path="/" element={<RoleSelectionScreen />} />
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route path="menu" element={<Menu />} />
            <Route path="orders" element={<Orders />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Routes>
      </RoleProvider>
    </Suspense>
  );
}

export default App;
