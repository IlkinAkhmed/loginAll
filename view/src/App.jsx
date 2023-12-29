import { Route, Routes } from "react-router";
import "./App.css";
import MainLayout from "./Layouts/mainLayout";
import Admin from "./pages/AdminPage";
import AllUsers from "./pages/AllUsers";
import ContactPage from "./pages/ContactPage/ContactPage";
import Home from "./pages/homePage/home";
import Login from "./pages/LoginPage/login";
import News from "./pages/News";
import SignUp from "./pages/SignUpPage";
import User from "./pages/UserPage/User";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route element={<PrivateRoute check={["user", "admin"]} />}>
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/user" element={<User />} />
            <Route path="/news" element={<News />} />
          </Route>
          <Route element={<PrivateRoute check={["admin"]} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="/admin/users" element={<AllUsers />} />
        </Route>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
