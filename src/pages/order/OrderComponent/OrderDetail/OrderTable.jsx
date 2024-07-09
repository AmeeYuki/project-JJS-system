import React from "react";
import { Flex, Table } from "antd";

export default function OrderTable({ products, order }) {
  const calculateTotalSellPrice = (
    priceProcessing,
    priceStone,
    weight,
    sellPricePerGram
  ) => {
    return priceProcessing + priceStone + weight * sellPricePerGram;
  };

  const calculateTotalBuyPrice = (weight, buyPricePerGram) => {
    return weight * buyPricePerGram;
  };

  const data = products.map((item, index) => {
    const totalPriceSell = calculateTotalSellPrice(
      item.product.priceProcessing,
      item.product.priceStone,
      item.product.weight,
      item.product.type.sell_price_per_gram
    );

    const totalPriceBuy = calculateTotalBuyPrice(
      item.product.weight,
      item.product.type.buy_price_per_gram
    );

    const total_price =
      order?.type === "sell"
        ? totalPriceSell * item.quantity
        : totalPriceBuy * item.quantity;

    return {
      key: index,
      no: index + 1,
      product_name: item.product.productName,
      product_id: item.product.id,
      product_image: item.product.imageUrl,
      quantity: item.quantity,
      weight: item.product.weight,
      weightUnit: item.product.weightUnit,
      unitPrice: item.unitPrice,
      barcode: item.product.barcode,
      priceProcessing: item.product.priceProcessing,
      priceStone: item.product.priceStone,
      buy_price_per_gram: item.product.type.buy_price_per_gram,
      sell_price_per_gram: item.product.type.sell_price_per_gram,
      type: item.product.type.type,
      totalPriceSell,
      totalPriceBuy,
      total_price,
    };
  });

  const subtotal = data.reduce((sum, item) => sum + item.total_price, 0);
  let total = subtotal - order.discount;
  if (total < 0) {
    total = 0;
  }

  const columns = [
    {
      title: "No.",
      key: "no",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.product_image}
            alt={record.product_name}
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
          <span>{record.product_name}</span>
        </div>
      ),
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      key: "barcode",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    ...(order?.type === "sell"
      ? [
          {
            title: "Price to Sell",
            dataIndex: "totalPriceSell",
            key: "totalPriceSell",
            render: (price) => `${price.toLocaleString()} VNĐ`,
          },
        ]
      : [
          {
            title: "Price to Buy",
            dataIndex: "totalPriceBuy",
            key: "totalPriceBuy",
            render: (price) => `${price.toLocaleString()} VNĐ`,
          },
        ]),
    {
      title: "Total",
      dataIndex: "total_price",
      key: "total_price",
      render: (total_price) => `${total_price.toLocaleString()} VNĐ`,
    },
  ];

  return (
    <div style={{ marginTop: 10 }}>
      <h3 style={{ fontWeight: 400 }}>Product</h3>
      <hr />
      <Table columns={columns} dataSource={data} pagination={false} />
      <br />
      <div className="border-total-detail">
        <Flex align="center" justify="space-between">
          <div>Sub total:</div>
          <div>{subtotal.toLocaleString()} VNĐ</div>
        </Flex>
        <Flex align="center" justify="space-between">
          <div>Discount: </div>
          <div>{order.discount.toLocaleString()} VNĐ</div>
        </Flex>
        <Flex style={{ color: "red" }} align="center" justify="space-between">
          <div>Total:</div>
          <div>{total.toLocaleString()} VNĐ</div>
        </Flex>
      </div>
    </div>
  );
}
