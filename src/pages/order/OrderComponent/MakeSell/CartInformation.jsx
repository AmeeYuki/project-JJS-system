// CartInformation.js
import { RiCouponLine, RiUserStarLine } from "@remixicon/react";
import { Table, Button, ConfigProvider } from "antd";

const CartInformation = ({
  cartItems,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}) => {
  const calculatePrice = (product) => {
    if (!product) return 0;
    const stonePrice = product.price_stone || 0;
    const processingPrice = product.price_processing || 0;
    const typeSellPrice = product.type?.sell_price_per_gram || 0;
    const weight = product.weight || 0;
    const totalPrice = stonePrice + processingPrice + typeSellPrice * weight;
    return totalPrice;
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Product",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text, record) => record.type.type,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => text.toLocaleString(),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button onClick={() => decreaseQuantity(record)}>-</Button>
          <span style={{ margin: "0 10px" }}>{record.quantity}</span>
          <Button onClick={() => increaseQuantity(record)}>+</Button>
        </div>
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text) => text.toLocaleString(),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => removeFromCart(record)}>Delete</Button>
      ),
    },
  ];

  const data = cartItems.map((item, index) => ({
    key: index,
    id: item.id,
    product_name: item.product_name,
    type: item.type,
    price: calculatePrice(item),
    quantity: item.quantity,
    total: calculatePrice(item) * item.quantity,
  }));

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + calculatePrice(item) * item.quantity;
  }, 0);

  // Discount (giả sử là 10%)
  const discountPercent = 10;
  const discount = (subtotal * discountPercent) / 100;

  const totalBeforeDiscount = subtotal - discount;

  return (
    <div className="product-cart">
      <h1 className="title">Cart Information: </h1>
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: "#f1f1f1",
          },
        }}
      >
        <Table columns={columns} dataSource={data} pagination={false} />
      </ConfigProvider>
      <br />
      <div className="cart-total">
        <div className="voucher d-flex-center">
          <div>
            <p className="d-flex-text-center">
              <RiCouponLine />
              Voucher:
              <Button type="primary" size="small">
                Add Voucher
              </Button>
            </p>
          </div>
          <p>200 VNĐ</p>
        </div>
        <div className="policy d-flex-center">
          <div>
            <p className="d-flex-text-center">
              <RiUserStarLine />
              Customer Policy:
              <Button type="primary" size="small">
                Send Request
              </Button>
              <Button type="primary" size="small">
                Add policy
              </Button>
            </p>
          </div>
          <p>200 VNĐ</p>
        </div>
        <div className="money ">
          <div className="d-flex-center">
            <p>Provisional:</p>
            <p>{subtotal.toLocaleString()} VNĐ</p>
          </div>
          <div className="d-flex-center">
            <p>Discount :</p>
            <p>{discountPercent}%</p>
          </div>
          <div className="d-flex-center">
            <p style={{ fontSize: "25px", fontWeight: 500 }}>Total:</p>
            <p style={{ color: "red", fontWeight: 500 }}>
              {totalBeforeDiscount.toLocaleString()} VNĐ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartInformation;
