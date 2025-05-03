'use strict';

//Input elements

const inputs = {
  bill: document.querySelector('#cost-amount'),
  numberOfPeople: document.querySelector('#number-of-people'),
  tipPercentage: document.querySelector('ul'),
  defaultTip: document.querySelector('#default-tip'),
  customTip: document.querySelector('#custom-input'),
};

//Output elements
const outputs = {
  tipPerPerson: document.querySelector('#tip-per-person'),
  totalPerPerson: document.querySelector('#total-per-person'),
  errorMessage: document.querySelectorAll('.span-people'),
};

// Variable to track the selected tip percentage
let selectedTipPercentage = 0.1;

//Function to validate inputs

const validateInputs = e => {
  const inputElement =
    e.id === 'number-of-people' ? inputs.numberOfPeople : inputs.bill;

  if (!inputElement.checkValidity()) {
    inputElement.previousElementSibling.lastElementChild.classList.remove(
      'hidden'
    );

    return false;
  }

  inputElement.previousElementSibling.lastElementChild.classList.add('hidden');

  return true;
};

//function to calculate the amounts
const calculateAmounts = (billValue, peopleValue, tipPercentage) => {
  const tipValue = billValue * tipPercentage;
  const total = billValue / peopleValue;
  const tipValuePerPerson = tipValue / peopleValue;

  return {
    total,
    tipValuePerPerson,
  };
};

//function to render the amounts
const renderAmounts = ({ total, tipValuePerPerson }) => {
  if (total && tipValuePerPerson) {
    outputs.totalPerPerson.textContent = `$${total.toFixed(2)}`;
    outputs.tipPerPerson.textContent = `$${tipValuePerPerson.toFixed(2)}`;
  }
};

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

// Add event listeners to the input fields

inputs.bill.addEventListener('blur', billAmountPerPerson);
inputs.numberOfPeople.addEventListener('blur', billAmountPerPerson);
inputs.tipPercentage.addEventListener('click', handleTipSelection);
inputs.customTip.addEventListener('blur', e => {
  //set the selected tip percentage to the custom input value
  selectedTipPercentage = parseFloat(e.target.value) / 100;

  //remove active class from all other tip percentages
  const allTips = document.querySelectorAll('button');
  allTips.forEach(tip => {
    tip.classList.remove('active');
  });

  billAmountPerPerson(e);
});

// Reset button
const resetButton = document.querySelector('.reset-btn');

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

resetButton.addEventListener('click', handleReset);
