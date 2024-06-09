import React, { useState, useEffect } from "react";
import { Button, ConfigProvider, Table } from "antd";
import Search from "antd/es/input/Search";
import { useLazyGetProductsQuery } from "../../../../services/productAPI";
import CartInformation from "./CartInformation";

export default function ProductSpace() {
  const [trigger, { data: productsData, isError, isLoading }] =
    useLazyGetProductsQuery();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

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
  };

  const removeFromCart = (product) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== product.id);
    const productTotalPrice = calculatePrice(product) * product.quantity;

    setCartItems(updatedCartItems);
    setTotalItems(totalItems - product.quantity);
    setTotalPrice(totalPrice - productTotalPrice);
  };

  const increaseQuantity = (product) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );

    setCartItems(updatedCartItems);
    setTotalItems(totalItems + 1);
    setTotalPrice(totalPrice + calculatePrice(product));
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
      <CartInformation
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />
    </div>
  );
}
