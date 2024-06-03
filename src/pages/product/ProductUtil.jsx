export const convertProductData = (data) => {
  return data.map((item, index) => ({
    id: item.id,
    index: index + 1,
    productName: item.product_name,
    type: item.type.type,
    barcode: item.barcode,
    weight: item.weight,
    weightUnit: item.weight_unit,
    priceProcessing: item.price_processing,
    priceStone: item.price_stone,
    quantity: item.quantity,
    active: item.status === "active",
    description: item.description || "",
    counterName: item.counter_id ? item.counter_id.counter_name : "N/A",
    counterLocation: item.counter_id ? item.counter_id.location : "N/A",
    buyPricePerGram: item.type ? item.type.buy_price_per_gram : 0,
    sellPricePerGram: item.type ? item.type.sell_price_per_gram : 0,
    image: item.image_url,
    typeId: item.type_id,
    counterId: item.counter_id,
  }));
};

export const formatCurrency = (value) => {
  if (value === undefined || value === null) {
    return "N/A";
  }
  return (
    value.toLocaleString("en-US", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }) + " VND"
  );
};
