const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
});

const previousMoneyToFloat = str => parseFloat(str.replace(/\$/g, ""));

/**
 * Converted @method previousMoneyToFloat to use `Box`
 * This is better than the previous solution because by using box we have un-nested the expression
 *
 * @param {string} str
 */
const moneyToFloat = str =>
  Box(str)
    .map(s => s.replace(/\$/g, ""))
    .map(s => parseFloat(s));

const previousPercentToFloat = str => {
  const replaced = str.replace(/\$/g, "");
  const number = parseFloat(replaced);
  return number * 0.01;
};

/**
 * Converted @method previousPercentToFloat to use `Box`
 * This implementation is better than the previous because we got rid
 * of state variables and the flow is much simpler
 *
 * @param {string} str
 */
const percentToFloat = str =>
  Box(str)
    .map(s => s.replace(/\$/g, ""))
    .map(s => parseFloat(s))
    .map(s => s * 0.01);

const previousApplyDiscount = (price, discount) => {
  const cost = moneyToFloat(price);
  const savings = percentToFloat(discount);
  return cost - cost * savings;
};

const applyDiscount = (price, discount) =>
  moneyToFloat(price).fold(cost =>
    percentToFloat(discount).fold(savings => cost - cost * savings)
  );

const result = applyDiscount("$5.00", "20%");

result;
