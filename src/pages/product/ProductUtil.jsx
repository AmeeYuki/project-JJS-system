export const convertProductData = (data) => {
  return data.map((item, index) => {
    const counterName = item.counter_id?.counterName || "N/A";
    const counterLocation = item.counter_id?.location || "N/A";
    return {
      id: item.id,
      index: index + 1,
      productName: item.product_name,
      typeName: item.type?.type || "N/A",
      barcode: item.barcode,
      weight: item.weight,
      weightUnit: item.weight_unit,
      priceProcessing: item.price_processing,
      priceStone: item.price_stone,
      quantity: item.quantity,
      active: item.status === "active",
      description: item.description || "",
      counterName: counterName,
      counterLocation: counterLocation,
      buyPricePerGram: item.type?.buy_price_per_gram || 0,
      sellPricePerGram: item.type?.sell_price_per_gram || 0,
      image: item.image_url,
      typeId: item.type?.id || null,
      counterId: item.counter_id?.id || null,
    };
  });
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
