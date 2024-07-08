/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import Loadable from "./Loadable";
import MainLayout from "../layout/MainLayout";
import AuthGuard from "./AuthGuard";
import GuestGuard from "./GuestGuard";

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
const OrderDetail = Loadable({
  loader: () => import("../pages/order/OrderComponent/OrderDetail/OrderDetail"),
});
const MakeSell = Loadable({
  loader: () => import("../pages/order/OrderComponent/MakeSell/MakeSell"),
});
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
const Policy = Loadable({
  loader: () => import("../pages/customerPolicy/Policy"),
});

const MakePurchase = Loadable({
  loader: () =>
    import("../pages/order/OrderComponent/MakePurchased/MakePurchase"),
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
            element: Home,
          },
          {
            path: "/",
            element: <AuthGuard allowedRoles={["ROLE_ADMIN"]} />,
            children: [
              {
                path: "dashboard",
                element: Dashboard,
              },
              {
                path: "user",
                element: User,
              },
            ],
          },
          {
            path: "/",
            element: (
              <AuthGuard allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]} />
            ),
            children: [
              {
                path: "counter",
                element: Counter,
              },
              {
                path: "promotion",
                element: Promotion,
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
          {
            path: "/",
            element: (
              <AuthGuard
                allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_STAFF"]}
              />
            ),
            children: [
              {
                path: "customer",
                element: Customer,
              },
              {
                path: "order",
                element: Order,
              },
              {
                path: "order/make-sell",
                element: MakeSell,
              },
              {
                path: "order/make-purchase",
                element: MakePurchase,
              },
              {
                path: "product",
                element: Product,
              },
              {
                path: "order/:id",
                element: OrderDetail,
              },
              {
                path: "policy",
                element: Policy,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <GuestGuard />,
    children: [
      {
        path: "login",
        element: Login,
      },
      {
        path: "forget-password",
        element: ForgetPassword,
      },
    ],
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
