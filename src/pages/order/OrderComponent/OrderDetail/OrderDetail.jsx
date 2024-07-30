import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetOrderByIdQuery,
  useGetOrderDetailQuery,
  useGetWarrantiesByOrderIdQuery,
} from "../../../../services/orderAPI";
import InformationCustomer from "./InformationCustomer";
import "../../Order.css";
import OrderTable from "./OrderTable";
import { Button, Spin } from "antd";

export default function OrderDetail() {
  const { id } = useParams();
  const { data: order } = useGetOrderByIdQuery(id);
  const { data: products } = useGetOrderDetailQuery(id);
  const { data: warranties } = useGetWarrantiesByOrderIdQuery({ orderId: id });
  console.log(warranties);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (order && products) {
      setIsLoading(false);
    }
  }, [order, products]);

  if (isLoading) {
    return (
      <div>
        <Spin />
      </div>
    );
  }

  const handleBackOrder = () => {
    navigate("/order");
  };

  return (
    <div className="order-page">
      <div className="header">
        <h1 className="title">Order Detail</h1>
        <hr />
      </div>
      <div className="information">
        <InformationCustomer warranties={warranties} order={order} />
      </div>
      <div className="order-space">
        <OrderTable order={order} products={products} />
      </div>

      <div className="d-flex-center" style={{ marginTop: 20 }}>
        <div>
          <Button type="primary" size="large" onClick={handleBackOrder}>
            Back
          </Button>
        </div>
        <div></div>
      </div>
    </div>
  );
}
