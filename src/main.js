import { validateInputs, calculateAmounts, renderAmounts } from './helper.js';

//Input elements

export const inputs = {
  bill: document.querySelector('#cost-amount'),
  numberOfPeople: document.querySelector('#number-of-people'),
  tipPercentage: document.querySelector('ul'),
  defaultTip: document.querySelector('#default-tip'),
  customTip: document.querySelector('#custom-input'),
  resetButton: document.querySelector('.reset-btn'),
};

//Output elements
export const outputs = {
  tipPerPerson: document.querySelector('#tip-per-person'),
  totalPerPerson: document.querySelector('#total-per-person'),
  errorMessage: document.querySelectorAll('.span-people'),
};

// Variable to track the selected tip percentage
let selectedTipPercentage = 0.1;

const billAmountPerPerson = e => {
  //Step 1: Validate user input
  if (!validateInputs(e.target)) return;

  //Step 2: Grab the values from the input fields

  const billValue = parseFloat(inputs.bill.value);
  const peopleValue = parseFloat(inputs.numberOfPeople.value);

  //Step 3: Calculate the amounts
  const amounts = calculateAmounts(
    billValue,
    peopleValue,
    selectedTipPercentage
  );

  //Step 5: Render the amounts
  renderAmounts(amounts);
};

const handleTipSelection = e => {
  //add active class to the selected tip percentage

  if (e.target.tagName === 'BUTTON') {
    selectedTipPercentage = parseFloat(e.target.value);

    //remove active class from all other tip percentages
    const allTips = document.querySelectorAll('button');
    allTips.forEach(tip => {
      tip.classList.remove('active');
    });

    //add active class to the selected tip percentage
    e.target.classList.add('active');
    billAmountPerPerson(e);
  }
};

const handleCustomTip = e => {
  selectedTipPercentage = parseFloat(e.target.value) / 100;

  //remove active class from all other tip percentages
  const allTips = document.querySelectorAll('button');
  allTips.forEach(tip => {
    tip.classList.remove('active');
  });

  billAmountPerPerson(e);
};

// Reset button

const handleReset = () => {
  //reset input and output values
  inputs.bill.value = '';
  inputs.numberOfPeople.value = '';
  inputs.customTip.value = '';
  outputs.tipPerPerson.textContent = '$0.00';
  outputs.totalPerPerson.textContent = '$0.00';

  //remove active class from all other tip percentages
  const allTips = document.querySelectorAll('button');
  allTips.forEach(tip => {
    tip.classList.remove('active');
  });

  //reset default tip percentage
  selectedTipPercentage = 0.1;
  defaultTip.classList.add('active');

  // Hide error message

  outputs.errorMessage.forEach(error => {
    error.classList.add('hidden');
  });

  //reset input outlines

  inputs.bill.style.outline = 'none';
  inputs.numberOfPeople.style.outline = 'none';
};

// Add event listeners to the input fields

inputs.bill.addEventListener('blur', billAmountPerPerson);
inputs.numberOfPeople.addEventListener('blur', billAmountPerPerson);
inputs.tipPercentage.addEventListener('click', handleTipSelection);
inputs.customTip.addEventListener('blur', handleCustomTip);
inputs.resetButton.addEventListener('click', handleReset);
