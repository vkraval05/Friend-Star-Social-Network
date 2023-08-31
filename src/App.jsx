import Login from "./pages/login/Login";
import './App.scss'
import Register from "./pages/register/Register";
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import LeftBar from "./Components/LeftBar/LeftBar";
import RightBar from "./Components/RightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import { useContext } from "react";
import { DarkModeContext } from "./Context/DarkModeContext";
import { AuthContext } from "./Context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



function App() {

  const { currentUser } = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);

  const queryClient = new QueryClient();

  const Layout = () => {

    return <>
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <div className="body">
            <Navbar />
            <div style={{ display: "flex"}}>
              <LeftBar />
              <div style={{ flex: 6 }}>
                <Outlet />
              </div>
              <RightBar />
            </div>
          </div>
        </div>
      </QueryClientProvider>
    </>
  }

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <ProtectedRoute> <Layout /> </ProtectedRoute>,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: "/profile/:id",
          element: <Profile />
        }
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    }
  ])
  return <>
    <RouterProvider router={router} />
  </>;
}

export default App;
