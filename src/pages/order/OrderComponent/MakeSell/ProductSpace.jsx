import React, { useState, useEffect } from "react";
import { ConfigProvider, message } from "antd";
import { useGetProductsQuery } from "../../../../services/productAPI";
import ProductTable from "./ProductTable";
import CartTable from "./CartTable";
import CartSummary from "./CartSummary";
import ProductSearch from "./ProductSearch";
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

    const currentQuantityInCart =
      existingItemIndex >= 0 ? cartItems[existingItemIndex].quantity : 0;

    if (currentQuantityInCart + 1 > product.available_quantity) {
      message.error("Cannot add more than available quantity.");
      return;
    }

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
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    const currentQuantityInCart =
      existingItemIndex >= 0 ? cartItems[existingItemIndex].quantity : 0;

    if (currentQuantityInCart + 1 > product.available_quantity) {
      message.error("Cannot add more than available quantity.");
      return;
    }

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
    available_quantity: item.quantity,
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
        <ProductSearch setSearchTerm={setSearchTerm} />

        <div className="product-show">
          {isLoading ? (
            <p>Loading...</p>
          ) : productsData && productsData.products ? (
            <ProductTable products={productData} addToCart={addToCart} />
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
          <CartTable
            cartItems={cartItems}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            removeFromCart={removeFromCart}
          />
        </ConfigProvider>
        <br />
        <CartSummary
          subtotal={subtotal}
          discount={discount}
          discountPercent={discountPercent}
          totalBeforeDiscount={totalBeforeDiscount}
          setVoucherModalVisible={setVoucherModalVisible}
          setPromotionModalVisible={setPromotionModalVisible}
          setSendRequestModalVisible={setSendRequestModalVisible}
        />
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
