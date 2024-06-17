import React, { useState, useEffect } from "react";
import { Button, ConfigProvider, Table } from "antd";
import Search from "antd/es/input/Search";
import { RiCouponLine, RiUserStarLine } from "@remixicon/react";
import { useGetProductsQuery } from "../../../../services/productAPI";
import PromotionModal from "./PromotionModal";
import VoucherModal from "./VoucherModal";
import SendRequestModal from "./SendRequestModal";

export default function ProductSpace({ onProductChange }) {
  const { data: productsData, isError, isLoading } = useGetProductsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(10);
  const [isPromotionModalVisible, setPromotionModalVisible] = useState(false);
  const [isVoucherModalVisible, setVoucherModalVisible] = useState(false);
  const [isSendRequestModalVisible, setSendRequestModalVisible] =
    useState(false);

  useEffect(() => {
    if (isError) {
      console.error("Error fetching product data.");
    }
  }, [isError]);

  const calculatePrice = (product) => {
    const stonePrice = product.price_stone;
    const processingPrice = product.price_processing;
    const typeSellPrice = product.type?.sell_price_per_gram;
    const weight = product.weight;
    const totalPrice = stonePrice + processingPrice + typeSellPrice * weight;
    return totalPrice;
  };

  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );
    let updatedCartItems = [...cartItems];

    if (existingItemIndex >= 0) {
      updatedCartItems[existingItemIndex].quantity += 1;
    } else {
      updatedCartItems.push({ ...product, quantity: 1 });
    }

    setCartItems(updatedCartItems);
    setTotalItems(totalItems + 1);
    setTotalPrice(totalPrice + calculatePrice(product));
    sendProductData(updatedCartItems);
  };

  const removeFromCart = (product) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== product.id);
    const productTotalPrice = calculatePrice(product) * product.quantity;

    setCartItems(updatedCartItems);
    setTotalItems(totalItems - product.quantity);
    setTotalPrice(totalPrice - productTotalPrice);
    sendProductData(updatedCartItems);
  };

  const increaseQuantity = (product) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );

    setCartItems(updatedCartItems);
    setTotalItems(totalItems + 1);
    setTotalPrice(totalPrice + calculatePrice(product));
    sendProductData(updatedCartItems);
  };

  const decreaseQuantity = (product) => {
    const updatedCartItems = cartItems
      .map((item) =>
        item.id === product.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCartItems);
    setTotalItems(totalItems - 1);
    setTotalPrice(totalPrice - calculatePrice(product));
    sendProductData(updatedCartItems);
  };

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const discount = (subtotal * discountPercent) / 100;

  const totalBeforeDiscount = subtotal - discount;

  const productColumns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (_, __, index) => index + 1,
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
      render: (text, record) => record.type.type,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => new Intl.NumberFormat("vi-VN").format(price) + " VNĐ",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => addToCart(record)}>Add to Cart</Button>
      ),
    },
  ];

  const cartColumns = [
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
      render: (text, record) => record.type.type,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => new Intl.NumberFormat("vi-VN").format(price) + " VNĐ",
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

  const cartData = cartItems.map((item, index) => ({
    key: index,
    id: item.id,
    product_name: item.product_name,
    product_image: item.product_image,
    barcode: item.barcode,
    type: item.type,
    price: item.price,
    quantity: item.quantity,
    total: item.price * item.quantity,
  }));
  const filteredProducts =
    productsData?.products.filter((item) =>
      item.barcode.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const productData = filteredProducts.map((item, index) => ({
    key: index,
    id: item.id,
    product_image: item.image_url,
    product_name: item.product_name,
    barcode: item.barcode,
    type: item.type,
    price: calculatePrice(item),
  }));
  console.log(filteredProducts);

  const sendProductData = (updatedCartItems = cartItems) => {
    const productData = updatedCartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      totalPrice: item.price * item.quantity,
    }));

    onProductChange(productData);
  };

  const sendDiscount = () => {
    const discountData = {
      percent: discountPercent,
      value: discount,
    };
    onProductChange([], discountData);
  };

  return (
    <div className="product-space">
      <div className="product-select">
        <h1 className="title">Product: </h1>
        <ConfigProvider
          theme={{
            token: {
              borderRadius: "6px",
            },
          }}
        >
          <Search
            style={{ width: "400px" }}
            placeholder="Search by product name"
            onSearch={(value) => setSearchTerm(value)}
            enterButton
          />
        </ConfigProvider>

        <div className="product-show">
          {isLoading ? (
            <p>Loading...</p>
          ) : productsData && productsData.products ? (
            <Table
              columns={productColumns}
              dataSource={productData}
              pagination={{ pageSize: 4 }}
            />
          ) : (
            <p>
              {isLoading ? (
                "Loading..."
              ) : (
                <div className="info-item" style={{ height: 150 }}>
                  No products available
                </div>
              )}
            </p>
          )}
        </div>
      </div>
      <div className="product-cart">
        <h1 className="title">Cart Information: </h1>
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: "#f1f1f1",
            },
          }}
        >
          <Table
            columns={cartColumns}
            dataSource={cartData}
            pagination={false}
          />
        </ConfigProvider>
        <br />
        <div className="cart-total">
          <div className="voucher d-flex-center">
            <div>
              <p className="d-flex-text-center">
                <RiCouponLine />
                Voucher:
                <Button
                  type="primary"
                  size="small"
                  onClick={() => setVoucherModalVisible(true)}
                >
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
                <Button
                  type="primary"
                  size="small"
                  onClick={() => setSendRequestModalVisible(true)}
                >
                  Send Request
                </Button>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => setPromotionModalVisible(true)}
                >
                  Add policy
                </Button>
              </p>
            </div>
            <p>200 VNĐ</p>
          </div>
          <div className="money">
            <div className="d-flex-center">
              <p>Provisional:</p>
              <p>{subtotal.toLocaleString()} VNĐ</p>
            </div>
            <div className="d-flex-center">
              <p>Discount ({discountPercent}%):</p>
              <p>{discount.toLocaleString()} VNĐ</p>
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
      <PromotionModal
        isVisible={isPromotionModalVisible}
        onClose={() => setPromotionModalVisible(false)}
      />
      <VoucherModal
        isVisible={isVoucherModalVisible}
        onClose={() => setVoucherModalVisible(false)}
      />
      <SendRequestModal
        isVisible={isSendRequestModalVisible}
        onClose={() => setSendRequestModalVisible(false)}
      />
    </div>
  );
}
