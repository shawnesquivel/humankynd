import "./App.css";
import { Routes, Route } from "react-router-dom";
import CreateProfile from "./pages/CreateProfile";
import CreateProfilePageTwo from "./pages/CreateProfilePageTwo";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Browse from "./pages/Browse";
import Profile from "./pages/Profile";
import CreateProject from "./pages/CreateProject";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route exact path="/createprofile" element={<CreateProfile />}></Route>
      <Route path="/createprofile/2" element={<CreateProfilePageTwo />} />
      <Route path="/createprofile" element={<CreateProfile />} />
      <Route path="/createprofile" element={<CreateProfile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/createproject" element={<CreateProject />} />
    </Routes>
  );
}

export default App;
