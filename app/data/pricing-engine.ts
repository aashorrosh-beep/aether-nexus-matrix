export function calcOrderMath(wholesaleSum: number, shipSum: number) {
  const netProfit10 = +(wholesaleSum * 0.10).toFixed(2);
  const retailSubtotal = +(wholesaleSum + netProfit10).toFixed(2);
  const shipping = +shipSum.toFixed(2);
  const tax = +((retailSubtotal + shipping) * 0.0825).toFixed(2);
  const ccFee = +(((retailSubtotal + shipping + tax) * 0.029) + 0.30).toFixed(2);
  const grandTotal = +(retailSubtotal + shipping + tax + ccFee).toFixed(2);
  return { wholesaleSum, netProfit10, retailSubtotal, shipping, tax, ccFee, grandTotal };
}
