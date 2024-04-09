import { createContext } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Home from "./components/Home/Home/Home";
import SignInForm from "./components/Login/LoginMain/SignInForm";
import Dashboard from "./components/Dashboard/Dashboard/Dashboard";
import AppointMent from "./components/AppointMent/AppointMent/AppointMent";
import PrivateRoute from "./components/Login/PrivateRoute/PrivateRoute";
import Search from "./components/Search/Search";
import ChatRoom from './components/Forum/ChatRoom';


export const UserContext = createContext();

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <SignInForm /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/chat", element: <ChatRoom /> },
  { path: "/search", element: <Search /> },
  {
    path: "/appointment/:username",
    element: (
      <PrivateRoute>
        <AppointMent />
      </PrivateRoute>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
