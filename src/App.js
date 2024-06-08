import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Orders from "./scenes/orders";
import Invoices from "./scenes/invoices";
import Users from "./scenes/users";
import Reviews from "./scenes/reviews";
import Login from "./components/Login/Login";
import { Toaster } from "react-hot-toast";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const location = useLocation();

  // Check if the current location is the login page or the root path
  const isLoginPage =
    location.pathname === "/login" ;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <div style={{ minWidth: "85px" }}>
            {isLoginPage ? null : <Sidebar isSidebar={isSidebar} />}
          </div>
          <main className="content">
            {isLoginPage ? null : <Topbar setIsSidebar={setIsSidebar} />}

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/users" element={<Users />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/login" element={<Login />} />
              {/* <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
      <Toaster />
    </ColorModeContext.Provider>
  );
}

export default App;
