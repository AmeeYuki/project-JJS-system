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

const useSider = () => {
  const siderList = useMemo(() => {
    return [
      {
        label: "Home",
        icon: <HomeOutlined />,
        href: "/",
      },
      {
        label: "Dashboard",
        icon: <AreaChartOutlined />,
        href: "dashboard",
      },

      {
        label: "Product",
        icon: <ShoppingOutlined />,
        href: "product",
      },
      {
        label: "Order",
        icon: <ShoppingCartOutlined />,
        href: "order",
      },
      {
        label: "Customer",
        icon: <UsergroupDeleteOutlined />,
        href: "customer",
      },
      {
        label: "User manager",
        icon: <UserOutlined />,
        href: "user",
      },
      {
        label: "Counter",
        icon: <TagOutlined />,
        href: "counter",
      },
      {
        label: "Promotion",
        icon: <PercentageOutlined />,
        href: "promotion",
      },
      // {
      //   label: "Setting",
      //   icon: <FieldTimeOutlined />,
      //   href: "Setting",
      // },
    ];
  }, []);
  return siderList;
};

export default useSider;
