import { useState } from "react";

import {
  formatAmount,
  formatTerm,
  formatRate,
  calculateResults,
} from "./utils/utils.js";

import iconCalculator from "./assets/images/icon-calculator.svg";
import illustrationEmpty from "./assets/images/illustration-empty.svg";

function App() {
  const [amount, setAmount] = useState(0);
  const [term, setTerm] = useState(0);
  const [rate, setRate] = useState(0);
  const [repaymentType, setRepaymentType] = useState();
  const [result, setResult] = useState();
  const [error, setError] = useState({
    amount: false,
    term: false,
    rate: false,
    repaymentType: false,
  });

  function handleReset() {
    setAmount(0);
    setTerm(0);
    setRate(0);
    setRepaymentType();
    setResult();
    setError({
      amount: false,
      term: false,
      rate: false,
      repaymentType: false,
    });
  }

  function updateError(field) {
    setError((prev) => {
      return { ...prev, [field]: true };
    });
  }
  function clearError(field) {
    setError((prev) => {
      return { ...prev, [field]: false };
    });
  }

  function validateEntry() {
    let hasError = false;

    if (!amount) {
      updateError("amount");
      hasError = true;
    }
    if (!term) {
      updateError("term");
      hasError = true;
    }
    if (!rate || rate === "0.00") {
      updateError("rate");
      hasError = true;
    }
    if (!repaymentType) {
      updateError("repaymentType");
      hasError = true;
    }
    if (!hasError) {
      setResult(calculateResults(amount, term, rate, repaymentType));
    }
  }

  return (
    <main className="align-center flex min-h-screen justify-center bg-slate-100 font-medium md:items-center ">
      <section className="w-full bg-white text-sm md:text-base text-slate-700 md:flex md:max-w-5xl md:rounded-3xl overflow-hidden
">
        <div className="flex flex-col gap-4 p-6 md:grow-1 md:basis-50 md:p-10 md:gap-8">
          <div className="md:flex md:justify-between md:items-center">
            <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
              Mortgage calculator
            </h2>
            <button
              onClick={handleReset}
              type="button"
              className="cursor-pointer border-none bg-none underline"
            >
              Clear all
            </button>
          </div>
          <form noValidate className="flex flex-col gap-4">
            <div className={`input-group flex flex-col gap-2 ${ error.amount ? 'error': ''}`}>
              <label htmlFor="amount">Mortgage Amount</label>
              <div className="relative text-lg">
                <span className="input-deco rounded-s-sm">$</span>
                <input
                  className="input ps-14"
                  type="text"
                  id="amount"
                  aria-invalid={error.amount}
                  value={amount}
                  onChange={(e) => {
                    setAmount(formatAmount(e, amount));
                  }}
                  required
                  onFocus={() => {
                    clearError("amount");
                  }}
                />
              </div>
              <span className="text-error" id="amount-error">
                {error.amount ? "This field is required" : null}
              </span>
            </div>
            <div className={`input-group flex flex-col gap-2 ${ error.amount ? 'error': ''}`}>
              <label htmlFor="term">Mortgage Term</label>
              <div className="relative text-lg">
                <input
                  className="input ps-4"
                  type="text"
                  id="term"
                  aria-invalid={error.term}
                  value={term}
                  onChange={(e) => {
                    setTerm(formatTerm(e, term));
                  }}
                  required
                  onFocus={() => {
                    clearError("term");
                  }}
                />
                <span className="input-deco -translate-x-full rounded-e-sm">
                  years
                </span>
              </div>
              <span className="text-error" id="term-error">
                {error.term ? "This field is required" : null}
              </span>
            </div>
            <div className={`input-group flex flex-col gap-2 ${ error.amount ? 'error': ''}`}>
              <label htmlFor="rate">Interest Rate</label>
              <div className="relative text-lg">
                <input
                  className="input ps-4"
                  type="text"
                  id="rate"
                  aria-invalid={error.rate}
                  value={rate}
                  onChange={(e) => {
                    setRate(formatRate(e, rate));
                  }}
                  onBlur={() => {
                    if (rate) {
                      setRate(parseFloat(rate).toFixed(2));
                    } else {
                      setRate(0);
                    }
                  }}
                  required
                  onFocus={() => {
                    clearError("rate");
                  }}
                />
                <span className="input-deco -translate-x-full rounded-e-sm">
                  %
                </span>
              </div>
              <span className="text-error" id="rate-error">
                {error.rate ? "This field is required" : null}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <p>Mortgage Type</p>
              <div className="input has-[input:checked]:bg-lime/25 has-[input:checked]:border-lime hover:border-lime flex cursor-pointer px-4 text-lg transition">
                <input
                  className="me-4 w-4 cursor-pointer accent-slate-900"
                  type="radio"
                  value="repayment"
                  id="repayment"
                  name="repaymentType"
                  checked={repaymentType === "repayment"}
                  onChange={() => {
                    setRepaymentType("repayment");
                    clearError("repaymentType");
                  }}
                  required
                  aria-invalid={error.repaymentType}
                ></input>
                <label className="grow-1 cursor-pointer" htmlFor="repayment">
                  Repayment
                </label>
              </div>
              <div className="input has-[input:checked]:bg-lime/25 has-[input:checked]:border-lime hover:border-lime flex cursor-pointer px-4 text-lg transition">
                <input
                  className="me-4 w-4 cursor-pointer accent-slate-900"
                  type="radio"
                  value="interest"
                  id="interest"
                  name="repaymentType"
                  checked={repaymentType === "interest"}
                  onChange={() => {
                    setRepaymentType("interest");
                    clearError("repaymentType");
                  }}
                  required
                  aria-invalid={error.repaymentType}
                ></input>
                <label className="grow-1 cursor-pointer" htmlFor="interest">
                  Interest only
                </label>
              </div>
              <span className="text-error" id="repayment-type-error">
                {error.repaymentType ? "This field is required" : null}
              </span>
            </div>
            <button
              onClick={() => {
                validateEntry();
                // setResult(calculateResults(amount, term, rate, repaymentType));
              }}
              className="hover:bg-lime/50 bg-lime text-bold mbs-2 flex cursor-pointer items-center justify-center gap-2 rounded-full px-8 py-3 text-lg font-bold text-slate-900 transition"
              type="button"
            >
              <img className="w-6" src={iconCalculator} alt="" />
              Calculate Repayments
            </button>
          </form>
        </div>
        <div className="flex flex-col md:grow-1 md:basis-50 gap-4 bg-slate-900 p-6 text-slate-300 text-sm md:text-base md:p-10 md:rounded-bl-[4rem]">
          {result ? (
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-white">Your results</h2>
              <p>Your results are shown below based on the information you provided. 
  To adjust the results, edit the form and click “calculate repayments” again.</p>
              <div className="bg-black/30 border-t-4 border-lime rounded-md p-4 flex flex-col gap-3 md:mbs-4 ">
                <p>Your monthly repayments</p>
                <span className="text-lime text-4xl md:text-5xl font-medium border-b border-slate-700 pbe-4 md:pbe-6">${result.monthlyRepayment}</span>
                <p>Total you'll pay over the term</p>
                <span className="text-white text-xl font-medium">${result.totalRepayment}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 text-center md:justify-center h-full">
              <img src={illustrationEmpty} alt="" />
              <h2 className="text-xl font-bold text-white">
                Results shown here
              </h2>
              <p>
                Complete the form and click “calculate repayments” to see what
                your monthly repayments would be.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
