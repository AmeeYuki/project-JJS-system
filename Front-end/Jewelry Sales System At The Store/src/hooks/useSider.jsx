import { useMemo } from "react";
import {
  UserOutlined,
  SolutionOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";

const useSider = () => {
  const siderList = useMemo(() => {
    return [
      {
        label: "Dashboard",
        icon: <SolutionOutlined />,
        href: "/",
      },
      {
        label: "Home",
        icon: <FieldTimeOutlined />,
        href: "home",
      },
      {
        label: "Product",
        icon: <FieldTimeOutlined />,
        href: "product",
      },
      {
        label: "Order",
        icon: <FieldTimeOutlined />,
        href: "order",
      },
      {
        label: "Customer",
        icon: <FieldTimeOutlined />,
        href: "customer",
      },
      {
        label: "Employee",
        icon: <FieldTimeOutlined />,
        href: "employee",
      },
      {
        label: "Counter",
        icon: <FieldTimeOutlined />,
        href: "counter",
      },
      {
        label: "Promotion",
        icon: <FieldTimeOutlined />,
        href: "promotion",
      },
      {
        label: "Setting",
        icon: <FieldTimeOutlined />,
        href: "Setting",
      },
    ];
  }, []);
  return siderList;
};

export default useSider;
