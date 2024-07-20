import React, { useState, useEffect, useMemo } from "react";
import { ConfigProvider, message } from "antd";
import {
  useGetProductsByCounterIdQuery,
  useGetProductsQuery,
} from "../../../../services/productAPI";
import ProductTable from "./ProductTable";
import CartTable from "./CartTable";
import CartSummary from "./CartSummary";
import ProductSearch from "./ProductSearch";
import VoucherModal from "./VoucherModal";
import SendRequestCustomerPolicyModal from "./SendRequestCustomerPolicyModal";
import PolicyModel from "./PolicyModel";

export default function ProductSpace({
  onProductChange,
  auth,
  customerId,
  discountChange,
  onDiscountData,
  customerPoint,
  onPointDiscount,
  onSubtotalOrder,
}) {
  const {
    data: productsData,
    isError,
    isLoading,
  } = useGetProductsByCounterIdQuery(auth?.counter?.id);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [pointCustomer, setPointCustomer] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [fixedDiscount, setFixedDiscount] = useState(0);
  const [isPromotionModalVisible, setPromotionModalVisible] = useState(false);
  const [isVoucherModalVisible, setVoucherModalVisible] = useState(false);
  const [isSendRequestModalVisible, setSendRequestModalVisible] =
    useState(false);
  const [promotion, setPromotion] = useState(null);
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

  const subtotal = useMemo(
    () =>
      cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0),
    [cartItems]
  );

  const discount = useMemo(
    () => (subtotal * discountPercent) / 100 + fixedDiscount,
    [subtotal, discountPercent, fixedDiscount]
  );

  const totalBeforeDiscount = useMemo(() => {
    const total = subtotal - discount - pointCustomer * 1000;
    return Math.max(total, 0); // Ensure total is not negative
  }, [subtotal, discount, pointCustomer]);

  const filteredProducts =
    productsData?.filter((item) =>
      item.barcode.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  console.log(filteredProducts);
  const productData = filteredProducts.map((item, index) => ({
    key: index,
    id: item.id,
    product_image: item.image_url,
    product_name: item.product_name,
    counter: item?.counter_id?.counterName,
    barcode: item.barcode,
    type: item.type,
    price: calculatePrice(item),
    available_quantity: item.quantity,
  }));

  const sendProductData = (updatedCartItems = cartItems) => {
    const productData = updatedCartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      totalPrice: item.price,
    }));

    const subtotal = updatedCartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    const discount = (subtotal * discountPercent) / 100 + fixedDiscount;

    onSubtotalOrder(subtotal);
    onProductChange({
      products: productData,
      discount: discount,
    });
  };

  const handleApplyDiscount = (discountData) => {
    setDiscountPercent(discountData.discountRate);
    setFixedDiscount(discountData.fixedDiscountAmount);

    const subtotal = cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    const discountSend =
      (subtotal * discountData.discountRate) / 100 +
      discountData.fixedDiscountAmount +
      pointCustomer * 1000;
    discountChange(discountSend);
    onDiscountData(discountData);
  };

  const handleApplyPromotion = (promotion) => {
    setPromotion(promotion);
    const discountData = {
      discountRate: promotion.discountPercentage,
      fixedDiscountAmount: promotion.fixedDiscountAmount,
    };
    handleApplyDiscount(discountData);
  };

  const handlePointChange = (point) => {
    setPointCustomer(point);
    onPointDiscount(point);
    const discountSend =
      (subtotal * discountPercent) / 100 + fixedDiscount + point * 1000;
    discountChange(discountSend);
  };

  return (
    <div className="product-space">
      <div className="product-select">
        <h1 className="select-title">Product Selection</h1>
        <ProductSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ConfigProvider renderEmpty={() => <div>No products found</div>}>
          <ProductTable
            products={productData}
            addToCart={addToCart}
            isLoading={isLoading}
          />
        </ConfigProvider>
      </div>
      <CartTable
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />
      <CartSummary
        customerPoint={customerPoint}
        subtotal={subtotal}
        discount={discount}
        discountPercent={discountPercent}
        totalBeforeDiscount={totalBeforeDiscount}
        setVoucherModalVisible={setVoucherModalVisible}
        setPromotionModalVisible={setPromotionModalVisible}
        setSendRequestModalVisible={setSendRequestModalVisible}
        onPointChange={handlePointChange}
      />
      <VoucherModal
        isVisible={isVoucherModalVisible}
        onClose={() => setVoucherModalVisible(false)}
        onApplyPromotion={handleApplyPromotion}
      />
      <SendRequestCustomerPolicyModal
        isVisible={isSendRequestModalVisible}
        onClose={() => setSendRequestModalVisible(false)}
        customerId={customerId}
      />
      <PolicyModel
        isVisible={isPromotionModalVisible}
        onClose={() => setPromotionModalVisible(false)}
        customerId={customerId}
        onApplyDiscount={handleApplyDiscount}
      />
    </div>
  );
}
