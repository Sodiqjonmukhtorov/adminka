import { Route, Routes } from "react-router-dom";
import { Category } from "./pages/category";
import { MainLayout } from "./layout/main-layout";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Support from "./pages/Support";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Category />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="support" element={<Support />} />
        </Route>
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    </>
  );
}

export default App;
