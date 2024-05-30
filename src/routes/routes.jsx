/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import Loadable from "./Loadable";
import MainLayout from "../layout/MainLayout";
import AuthGuard from "./AuthGuard";

const Login = Loadable({ loader: () => import("../pages/login/Login") });
const ForgetPassword = Loadable({
  loader: () => import("../pages/login/ForgetPassword"),
});
const LoginFirstTime = Loadable({
  loader: () => import("../pages/login/LoginFirstTime"),
});

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
const Category = Loadable({
  loader: () => import("../pages/category/Category"),
});
const CounterDetail = Loadable({
  loader: () => import("../pages/counter/CounterDetail"),
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
            index: true,
            // path: "",
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
            path: "order",
            element: Order,
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
          {
            path: "category",
            element: Category,
          },
          {
            path: "counter/:id",
            element: CounterDetail,
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
    path: "forget-password",
    element: ForgetPassword,
  },
  {
    path: "login-first-time",
    element: LoginFirstTime,
  },
  {
    path: "*",
    element: <div>404 Page not found</div>,
  },
]);
