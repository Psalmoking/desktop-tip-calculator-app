"use strict";

// selectors
const billAmountEl = document.querySelector(".input-bill");
const tipPercentageContainer = document.querySelector(".tip-percentages");
const tipPercentages = document.querySelectorAll(".tip-percentage");
const noOfPeopleEl = document.querySelector(".input-number");
const customTipEl = document.querySelector(".custom-tip");
const inputCustomTip = document.querySelector(".custom-tip-percentage");
const btnCalculate = document.querySelector(".btn-calculate");
const btnReset = document.querySelector(".btn-reset");
const tipPerPersonEl = document.querySelector(".tip-per-person");
const totalPerPersonEl = document.querySelector(".tip-total");
const invalidInputEl = document.querySelector(".invalid-input");

const tipCalculator = function () {
  let tipPercentage, tip, total;

  // FUNCTIONS
  const init = function () {
    billAmountEl.value = noOfPeopleEl.value = inputCustomTip.value = "";
    tipPercentages.forEach((tip) => tip.classList.remove("active-tip"));
    tip = 0;
    total = 0;
    invalidInputEl.style.visibility = "hidden";
    customTipEl.classList.remove("tip-hidden");
    inputCustomTip.classList.add("tip-hidden");
    noOfPeopleEl.style.borderColor = "hsl(172, 67%, 45%)";
    updateSummaryUI(tip, total);
  };

  const calcTip = function (cost, tipPercent, no) {
    return (cost / no) * (tipPercent / 100);
  };

  const updateSummaryUI = function (tip, total) {
    tipPerPersonEl.textContent = `${new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(tip)}`;
    totalPerPersonEl.textContent = `${new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(total)}`;
  };

  // EVENT LISTENERS

  // select tip percent
  tipPercentageContainer.addEventListener("click", function (e) {
    tipPercentage = 0;
    tipPercentages.forEach((tip) => tip.classList.remove("active-tip"));
    if (e.target.classList.contains("tip-percentage")) {
      // display Active Tip
      e.target.classList.add("active-tip");

      // hide input custom  tip
      customTipEl.classList.remove("tip-hidden");
      inputCustomTip.classList.add("tip-hidden");

      // select tip percentage
      tipPercentage = Number.parseInt(e.target.textContent);
    }
    if (e.target.classList.contains("custom-tip")) {
      // show input custom tip
      customTipEl.classList.add("tip-hidden");
      inputCustomTip.classList.remove("tip-hidden");
      inputCustomTip.focus();
    }
  });

  btnCalculate.addEventListener("click", function (e) {
    invalidInputEl.style.visibility = "hidden";
    noOfPeopleEl.focus();
    // 1. Get input parameters
    const bill = +billAmountEl.value;
    const noOfPeople = +noOfPeopleEl.value;

    // check number of people
    if (!noOfPeople) {
      console.log("Can't be zero");
      invalidInputEl.style.visibility = "visible";
      noOfPeopleEl.style.borderColor = "red";
      noOfPeopleEl.focus();
    }

    if (!tipPercentage) {
      tipPercentage = +Number.parseInt(inputCustomTip.value);
    }

    // 2. Calculate tip and total
    if (bill && noOfPeople && tipPercentage) {
      tip = calcTip(bill, tipPercentage, noOfPeople);
      total = bill / noOfPeople + tip;

      console.log("Tip: ", tip);
      console.log("Total: ", total);

      // display tip and total to UI
      noOfPeopleEl.blur();
      noOfPeopleEl.style.borderColor = "hsl(172, 67%, 45%)";
      invalidInputEl.style.visibility = "hidden";

      updateSummaryUI(tip, total);
    }
  });

  btnReset.addEventListener("click", function (e) {
    init();
  });
};

tipCalculator();
