import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Dashboard from "./pages/Dashboard";
import Tutorial from "./pages/Tutorial";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </div>
  );
};

export default App;
