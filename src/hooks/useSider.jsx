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
  TagsOutlined,
} from "@ant-design/icons";

import { selectAuth } from "../slices/auth.slice";
import { useSelector } from "react-redux";

const useSider = () => {
  const auth = useSelector(selectAuth);
  const role = auth?.roles?.[0] || null; // Check if roles array exists and has at least one element

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
      // {
      //   label: "Customer",
      //   icon: <UsergroupDeleteOutlined />,
      //   href: "customer",
      //   roles: ["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_STAFF"],
      // },

      {
        label: "Customer Manager",
        icon: <UsergroupDeleteOutlined />,
        href: "customer",
        roles: ["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_STAFF"],
      },
      {
        label: "Customer Policy",
        icon: <TagsOutlined />,
        href: "policy",
        roles: ["ROLE_ADMIN", "ROLE_MANAGER"],
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
