import React from "react";
import { Table, Button } from "antd";

const Cart = ({ cartItems, removeFromCart }) => {
  // console.log(cartItems);
  const cartColumns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Price",
      dataIndex: "totalPriceSell",
      key: "unitPrice",
      render: (totalPriceSell) => `${totalPriceSell.toLocaleString()} VNĐ`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total",
      key: "total",
      render: (_, record) =>
        `${(record.totalPriceSell * record.quantity).toLocaleString()} VNĐ`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => removeFromCart(record.key)} type="danger">
          Remove
        </Button>
      ),
    },
  ];

  // const calculateTotalPrice = (
  //   priceProcessing,
  //   priceStone,
  //   weight,
  //   sellPricePerGram
  // ) => {
  //   return priceProcessing + priceStone + weight * sellPricePerGram;
  // };
  // const orderData = products.map((item, index) => ({
  //   key: index,
  //   no: index + 1,
  //   product_name: item.product.productName,
  //   product_image: item.product.imageUrl,
  //   quantity: item.quantity,
  //   weight: item.product.weight,
  //   weightUnit: item.product.weightUnit,
  //   unitPrice: item.unitPrice,
  //   barcode: item.product.barcode,
  //   priceProcessing: item.product.priceProcessing,
  //   priceStone: item.product.priceStone,
  //   buy_price_per_gram: item.product.type.buy_price_per_gram,
  //   sell_price_per_gram: item.product.type.sell_price_per_gram,
  //   type: item.product.type.type,
  //   totalPriceSell: calculateTotalPrice(
  //     item.product.priceProcessing,
  //     item.product.priceStone,
  //     item.product.weight,
  //     item.product.type.sell_price_per_gram
  //   ),
  // }));

  return (
    <div>
      <h6 className="sub-title">Cart</h6>
      <hr />
      <Table columns={cartColumns} dataSource={cartItems} pagination={false} />
    </div>
  );
};

export default Cart;
