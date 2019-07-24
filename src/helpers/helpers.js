import { useState } from "react";

function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const useCurrency = initial => {
  const [currency, setCurrency] = useState(initial);

  const updaterFunc = (input, blur) => {
    // don't validate empty input
    if (input === "") {
      setCurrency("");
      return;
    }

    input = input.toString();

    // check for decimal
    if (input.indexOf(".") >= 0) {
      // get position of first decimal
      // this prevents multiple decimals from
      // being entered
      var decimal_pos = input.indexOf(".");

      // split number by decimal point
      var left_side = input.substring(0, decimal_pos);
      var right_side = input.substring(decimal_pos);

      // add commas to left side of number
      left_side = formatNumber(left_side);

      // validate right side
      right_side = formatNumber(right_side);

      // On blur make sure 2 numbers after decimal
      if (blur === "blur") {
        right_side += "00";
      }

      // Limit decimal to only 2 digits
      right_side = right_side.substring(0, 2);

      // join number by .
      input = left_side + "." + right_side;
      console.log(input);
    } else {
      // no decimal entered
      // add commas to number
      // remove all non-digits
      input = formatNumber(input);

      // final formatting
      if (blur === "blur") {
        input += ".00";
      }
    }
    setCurrency(input);
  };
  return [currency, updaterFunc];
};
