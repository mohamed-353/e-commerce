const displayAEDCurrency = (num) => {
  const formatter = new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    minimumFractionDigits: 0
  });
  return formatter.format(num);
}

export default displayAEDCurrency;
