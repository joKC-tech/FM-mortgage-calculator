export function formatAmount(e, currentAmount) {
    const input = e.target.value;

    // Strip out any existing commas so we're only testing/working with raw digits
    const digitsOnly = input.replace(/,/g, "");

    if (/^\d*$/.test(digitsOnly)) {
      // Remove leading zeros, but keep a single "0" if that's all that's left
      const noLeadingZeros = digitsOnly.replace(/^0+(?=\d)/, "");

      // Format with commas every three digits
      return noLeadingZeros.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return currentAmount;
    }
  }

export function formatTerm(e, currentTerm) {
    let input = e.target.value;

    if (/^\d*$/.test(input)) {
      // Remove leading zeros, but keep a single "0" if that's all that's left
      const noLeadingZeros = input.replace(/^0+(?=\d)/, "");

      return noLeadingZeros
    } else {
      return currentTerm;
    }
  }

export function formatRate(e, currentRate) {
  const input = e.target.value;

  if (/^\d*\.?\d*$/.test(input)) {
    // Remove leading zeros, but keep a single "0" before a decimal point
    const noLeadingZeros = input.replace(/^0+(?=\d)/, "");

    return noLeadingZeros;
  } else {
    return currentRate;
  }
}


export function calculateResults(amount, term, rate, repaymentType) {
  // Convert incoming values to numbers, stripping any commas first
  const numericAmount = parseFloat(String(amount).replace(/,/g, ""));
  const numericTerm = parseFloat(String(term).replace(/,/g, ""));
  const numericRate = parseFloat(String(rate).replace(/,/g, ""));

  const monthlyRate = numericRate / 100 / 12;
  const numberOfPayments = numericTerm * 12;

  let monthlyRepayment;

  if (repaymentType === "repayment") {
    const numerator =
      monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments);
    const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;

    monthlyRepayment = numericAmount * (numerator / denominator);
  } else {
    monthlyRepayment = numericAmount * monthlyRate;
  }

  const totalRepayment = monthlyRepayment * numberOfPayments;

  // Helper: adds thousands-separator commas to only the integer part
  // of a fixed-decimal string, leaving the decimal portion untouched.
  function addCommas(fixedNumberString) {
    const [integerPart, decimalPart] = fixedNumberString.split(".");
    const withCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${withCommas}.${decimalPart}`;
  }

  return {
    monthlyRepayment: addCommas(monthlyRepayment.toFixed(2)),
    totalRepayment: addCommas(totalRepayment.toFixed(2)),
  };
}