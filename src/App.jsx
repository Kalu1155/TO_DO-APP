import "./App.css";
// import '../css/style.css'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import SignIn from "./Pages/SignIn";
import Signup from "./Pages/SignUp";
import OverView from "./Pages/OverView";
import OverviewLayout from "./Component/Layout/OverviewLayout";
import Tasks from "./Pages/Tasks";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<Signup />} />

          <Route path="" element={<OverviewLayout />}>
            <Route path="/" element={<Navigate to="/overview" />} />
            <Route path="/overview" element={<OverView />} />
            <Route path="/tasks" element={<Tasks />} />
          </Route>

          <Route path="*" element={<Navigate to="/sign-in" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
