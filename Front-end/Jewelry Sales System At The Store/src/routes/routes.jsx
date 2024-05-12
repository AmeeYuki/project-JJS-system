/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import Loadable from "./Loadable";
import MainLayout from "../layout/MainLayout";
import AuthGuard from "./AuthGuard";

const Login = Loadable({ loader: () => import("../pages/login/Login") });

const Counter = Loadable({
  loader: () => import("../pages/counter/Counter"),
});

const Customer = Loadable({
  loader: () => import("../pages/customer/Customer"),
});
const Order = Loadable({ loader: () => import("../pages/order/Order") });
const Product = Loadable({ loader: () => import("../pages/product/Product") });
const Promotion = Loadable({
  loader: () => import("../pages/promotion/Promotion"),
});
const User = Loadable({ loader: () => import("../pages/user/User") });
const Home = Loadable({ loader: () => import("../pages/home/Home") });
const Dashboard = Loadable({
  loader: () => import("../pages/dashboard/Dashboard"),
});
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthGuard />,

    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "",
            element: Home,
          },
          {
            path: "dashboard",
            element: Dashboard,
          },

          {
            path: "counter",
            element: Counter,
          },
          {
            path: "customer",
            element: Customer,
          },
          {
            path: "order",
            element: Order,
          },
          {
            path: "product",
            element: Product,
          },
          {
            path: "promotion",
            element: Promotion,
          },
          {
            path: "user",
            element: User,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: Login,
  },
  {
    path: "*",
    element: <div>404 Page not found</div>,
  },
]);
