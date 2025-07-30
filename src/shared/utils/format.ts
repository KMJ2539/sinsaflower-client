export const formatCurrency = (amount: number) => {
  return amount?.toLocaleString() || "0";
};
