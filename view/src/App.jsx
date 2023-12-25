import { Route, Routes } from "react-router";
import "./App.css";
import MainLayout from "./Layouts/mainLayout";
import ContactPage from "./pages/ContactPage/ContactPage";
import Home from "./pages/homePage/home";
import Login from "./pages/LoginPage/login";
import SignUp from "./pages/SignUpPage";
import User from "./pages/UserPage/User";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/user" element={<User />} />
          </Route>
        </Route>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
