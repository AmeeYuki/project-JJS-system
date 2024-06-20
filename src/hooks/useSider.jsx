// import { useMemo } from "react";
// import {
//   UserOutlined,
//   SolutionOutlined,
//   FieldTimeOutlined,
//   HomeOutlined,
//   AreaChartOutlined,
//   ShoppingOutlined,
//   ShoppingCartOutlined,
//   UsergroupDeleteOutlined,
//   TagOutlined,
//   PercentageOutlined,
// } from "@ant-design/icons";

// import { selectAuth } from "../slices/auth.slice";
// import { useSelector } from "react-redux";

// const useSider = () => {
//   const auth = useSelector(selectAuth);
//   const role = auth.roles;
//   console.log(role);
//   const siderList = useMemo(() => {
//     return [
//       {
//         label: "Home",
//         icon: <HomeOutlined />,
//         href: "",
//       },

//       {
//         label: "Dashboard",
//         icon: <AreaChartOutlined />,
//         href: "dashboard",
//       },

//       {
//         label: "Product",
//         icon: <ShoppingOutlined />,
//         href: "product",
//       },
//       {
//         label: "Order",
//         icon: <ShoppingCartOutlined />,
//         href: "order",
//       },
//       {
//         label: "Customer",
//         icon: <UsergroupDeleteOutlined />,
//         href: "customer",
//       },
//       {
//         label: "User manager",
//         icon: <UserOutlined />,
//         href: "user",
//       },
//       {
//         label: "Counter",
//         icon: <TagOutlined />,
//         href: "counter",
//       },
//       {
//         label: "Promotion",
//         icon: <PercentageOutlined />,
//         href: "promotion",
//       },
//     ];
//   }, []);
//   return siderList;
// };

// export default useSider;

import { useMemo } from "react";
import {
  UserOutlined,
  SolutionOutlined,
  FieldTimeOutlined,
  HomeOutlined,
  AreaChartOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  UsergroupDeleteOutlined,
  TagOutlined,
  PercentageOutlined,
} from "@ant-design/icons";

import { selectAuth } from "../slices/auth.slice";
import { useSelector } from "react-redux";

const useSider = () => {
  const auth = useSelector(selectAuth);
  const role = auth?.roles[0]; // Assuming role is the first element in the roles array
  console.log(role);

  const siderList = useMemo(() => {
    const list = [
      {
        label: "Home",
        icon: <HomeOutlined />,
        href: "",
        roles: ["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_STAFF"],
      },
      {
        label: "Dashboard",
        icon: <AreaChartOutlined />,
        href: "dashboard",
        roles: ["ROLE_ADMIN"],
      },
      {
        label: "Product",
        icon: <ShoppingOutlined />,
        href: "product",
        roles: ["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_STAFF"],
      },
      {
        label: "Order",
        icon: <ShoppingCartOutlined />,
        href: "order",
        roles: ["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_STAFF"],
      },
      {
        label: "Customer",
        icon: <UsergroupDeleteOutlined />,
        href: "customer",
        roles: ["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_STAFF"],
      },
      {
        label: "User manager",
        icon: <UserOutlined />,
        href: "user",
        roles: ["ROLE_ADMIN"],
      },
      {
        label: "Counter",
        icon: <TagOutlined />,
        href: "counter",
        roles: ["ROLE_ADMIN", "ROLE_MANAGER"],
      },
      {
        label: "Promotion",
        icon: <PercentageOutlined />,
        href: "promotion",
        roles: ["ROLE_ADMIN", "ROLE_MANAGER"],
      },
    ];

    return list.filter((item) => item.roles.includes(role));
  }, [role]);

  return siderList;
};

export default useSider;
