import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Tokenomics from "./scenes/tokenomics";
import Invoices from "./scenes/invoices";
import Projects from "./scenes/project";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import ListingInfo from "./scenes/listinginfo";
import Signin from "./scenes/signin";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import SidebarContext, {useUserContext} from "./SidebarContext";

function App() {
  const navigate = useNavigate();
  const {user, userFunc} = useUserContext();
  const [theme, colorMode] = useMode();

  useEffect(() => {
    var userInfo = localStorage.getItem("userInfo");
    userFunc.updateUser(userInfo);
  }, []);

  useEffect(() => {
    if(user===null) {
      navigate("/");
    }
  }, [user])

  const goMainPage = () => {
    return (
      <>
          <Sidebar isSidebar={user!==null} />
          <main className="content">
            <Topbar setIsSidebar={user!==null} />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tokenomics" element={<Tokenomics />} />
              <Route path="/projectcategory" element={<Projects />} />
              <Route path="/pastprojects" element={<Invoices />} />
              <Route path="/listinginfo" element={<ListingInfo />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              {/* <Route path="/faq" element={<FAQ />} /> */}
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/" element={user!==null ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />} />
            </Routes>
          </main>
      </>
    )
  }

  return (
    <SidebarContext.Provider value={userFunc}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            {goMainPage()}
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </SidebarContext.Provider>
  );
}

export default App;
