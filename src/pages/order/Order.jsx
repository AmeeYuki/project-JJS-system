import "./Order.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import { RiAddLine } from "@remixicon/react";
import { AutoComplete, ConfigProvider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import OrderList from "./OrderComponent/OrderList";
import { useGetOrdersQuery } from "../../services/orderAPI";
import MakeOrderModal from "./OrderComponent/MakeOrderModel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const {
    data: orders,
    isLoading,
    refetch: refetchOrderData,
  } = useGetOrdersQuery();
  console.log(orders);

  function convertData(orders) {
    return orders.orders.map((el) => {
      return {
        orderId: el?.id,
        customerName: el?.customer.fullName,
        createBy: el?.created_by,
        date: el?.date,
        type: el?.type,
        // status,
      };
    });
  }

  useEffect(() => {
    if (orders) {
      setOrderData(convertData(orders));
    }
  }, [orders]);

  useEffect(() => {
    if (orders) {
      const filteredOrders = convertData(orders).filter(
        (order) =>
          order.createBy.toLowerCase().includes(searchValue.toLowerCase()) ||
          order.orderId
            .toString()
            .toLowerCase()
            .includes(searchValue.toLowerCase())
      );
      setOrderData(filteredOrders);
    }
  }, [searchValue, orders]);

  console.log(orderData);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleMakeSell = () => {
    setIsModalOpen(false);
    navigate("/order/make-sell");
  };

  const handleMakePurchase = () => {
    setIsModalOpen(false);
    console.log("Navigate to Make Purchase page");
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  return (
    <>
      <div className="order-page">
        <div className="header">
          <h1 className="title">Order History</h1>
        </div>
        <div className="action">
          <div className="action-left">
            <ConfigProvider
              theme={{
                token: {
                  borderRadius: 20,
                },
              }}
            >
              <AutoComplete
                style={{ width: 300 }}
                value={searchValue}
                onSearch={handleSearch}
                placeholder={
                  <i
                    style={{
                      color: "#2D3748",
                      fontWeight: "500",
                      fontSize: "12px",
                    }}
                  >
                    <SearchOutlined
                      style={{
                        marginRight: "0.5rem",
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    />{" "}
                    Search by order id or create by...
                  </i>
                }
                optionLabelProp="text"
              />
            </ConfigProvider>
          </div>
          <div className="action-right">
            <div>
              <CustomButton
                icon={RiAddLine}
                text="Make Order"
                iconSize="20px"
                iconColor="white"
                textColor="white"
                containerStyle={{
                  backgroundColor: "#000000",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
                iconPosition="left"
                fontSize="16px"
                padding="10px 10px"
                onClick={showModal}
              />
            </div>
          </div>
        </div>
        <div className="order-list">
          <OrderList ordersData={orderData} />
        </div>
        <MakeOrderModal
          open={isModalOpen}
          onMakeSell={handleMakeSell}
          onMakePurchase={handleMakePurchase}
          onCancel={handleCancel}
        />
      </div>
    </>
  );
}
