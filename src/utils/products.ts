export const formatPrice = (priceStr: string, promotionPriceStr?: string) => {
  const price = parseFloat(priceStr);
  const promotionPrice = parseFloat(promotionPriceStr || "0");

  const isValidPrice = !isNaN(price) && price > 0;
  const isValidPromotion =
    !isNaN(promotionPrice) && promotionPrice > 0 && promotionPrice < price;

  const discount =
    isValidPromotion && isValidPrice
      ? Math.floor(100 - (promotionPrice * 100) / price)
      : 0;

  return {
    currentPrice: isValidPromotion ? promotionPrice : price,
    previousPrice: isValidPromotion ? price : 0,
    discount,
  };
};
