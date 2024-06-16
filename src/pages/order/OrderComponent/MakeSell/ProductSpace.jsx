import React, { useState, useEffect } from "react";
import { Button, ConfigProvider, Table, InputNumber } from "antd";
import Search from "antd/es/input/Search";
import { RiCouponLine, RiUserStarLine } from "@remixicon/react";

import { useLazyGetProductsQuery } from "../../../../services/productAPI";

export default function ProductSpace({ onProductChange }) {
  const [trigger, { data: productsData, isError, isLoading }] =
    useLazyGetProductsQuery();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(10); // Giảm giá mặc định là 10%

  const onSearch = (value) => {
    setSearchKeyword(value.trim());
    if (value.trim() === "") {
      setFilteredProducts([]);
    } else {
      trigger(value);
    }
  };

  useEffect(() => {
    if (isError) {
      console.error("Error fetching product data.");
    }
  }, [isError]);

  useEffect(() => {
    if (productsData && productsData.products) {
      const filtered = productsData.products.filter((product) =>
        product.barcode.includes(searchKeyword)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchKeyword, productsData]);

  const calculatePrice = (product) => {
    if (!product) return 0;

    const stonePrice = product.price_stone || 0;
    const processingPrice = product.price_processing || 0;
    const typeSellPrice = product.type?.sell_price_per_gram || 0;
    const weight = product.weight || 0;

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
    sendProductData();
  };

  const removeFromCart = (product) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== product.id);
    const productTotalPrice = calculatePrice(product) * product.quantity;

    setCartItems(updatedCartItems);
    setTotalItems(totalItems - product.quantity);
    setTotalPrice(totalPrice - productTotalPrice);
    sendProductData();
  };

  const increaseQuantity = (product) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );

    setCartItems(updatedCartItems);
    setTotalItems(totalItems + 1);
    setTotalPrice(totalPrice + calculatePrice(product));
    sendProductData();
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
    sendProductData();
  };

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + calculatePrice(item) * item.quantity;
  }, 0);

  const discount = (subtotal * discountPercent) / 100;

  const totalBeforeDiscount = subtotal - discount;

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

  const calculateDiscount = (product) => {
    const subtotalPerProduct = calculatePrice(product) * product.quantity;
    const discountPerProduct = (subtotalPerProduct * discountPercent) / 100;
    return discountPerProduct;
  };
  const sendProductData = () => {
    const productData = cartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      totalPrice: calculatePrice(item) * item.quantity,
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
            placeholder="Search by barcode"
            onSearch={onSearch}
            enterButton
          />
        </ConfigProvider>

        <div className="product-show">
          {isLoading ? (
            <p>Loading...</p>
          ) : filteredProducts?.length > 0 ? (
            <div className="product-item" key={filteredProducts[0].id}>
              <div style={{ width: 200 }}>
                <img
                  className="image-product"
                  src={
                    filteredProducts[0].image_url ||
                    "https://kitadiamonds.com.vn/datafiles/setone/16781741575723_hinh-kim-cuong-goc.png"
                  }
                  alt="Product"
                />
              </div>
              <div className="info-item">
                <div className="product-details">
                  <p>Product name: {filteredProducts[0].product_name}</p>
                  <p>Barcode: {filteredProducts[0].barcode}</p>
                  <p>
                    Price:{" "}
                    {calculatePrice(filteredProducts[0]).toLocaleString()}
                  </p>
                  <p>Type: {filteredProducts[0].type.type}</p>
                </div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    className="btn-addtocart"
                    type="primary"
                    size="large"
                    onClick={() => addToCart(filteredProducts[0])}
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <p>
              {isLoading ? (
                "Loading..."
              ) : (
                <div className="info-item" style={{ height: 150 }}>
                  Not product here
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
    </div>
  );
}
