import "./Order.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import { RiAddLine } from "@remixicon/react";
import SearchInput from "../../components/SearchInput/SearchInput";
import OrderList from "./OrderComponent/OrderList";
import { useGetOrdersQuery } from "../../services/orderAPI";
import MakeOrderModal from "./OrderComponent/MakeOrderModel";
import { useEffect, useState } from "react";
export default function Order() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderData, seOrderData] = useState([]);
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
        customerName: el?.customer_id,
        createBy: el?.created_by,
        date: el?.date,
        type: el?.type,
        // status,
      };
    });
  }

  useEffect(() => {
    if (orders) {
      seOrderData(convertData(orders));
    }
  }, [orders]);

  console.log(orderData);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleMakeSell = () => {
    setIsModalOpen(false);
    console.log("Navigate to Make Sell page");
  };

  const handleMakePurchase = () => {
    setIsModalOpen(false);
    console.log("Navigate to Make Purchase page");
  };

  return (
    <>
      <div className="order-page">
        <div className="header">
          <h1 className="title">Order History</h1>
        </div>
        <div className="action">
          <div className="action-left">
            <SearchInput placeholder={"Search by order id"} />
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
