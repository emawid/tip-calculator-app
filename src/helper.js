//Function to validate inputs

import { inputs, outputs } from './main.js';

export const validateInputs = e => {
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
export const calculateAmounts = (billValue, peopleValue, tipPercentage) => {
  const tipValue = billValue * tipPercentage;
  const total = billValue / peopleValue;
  const tipValuePerPerson = tipValue / peopleValue;

  return {
    total,
    tipValuePerPerson,
  };
};

//function to render the amounts
export const renderAmounts = ({ total, tipValuePerPerson }) => {
  if (total && tipValuePerPerson) {
    outputs.totalPerPerson.textContent = `$${total.toFixed(2)}`;
    outputs.tipPerPerson.textContent = `$${tipValuePerPerson.toFixed(2)}`;
  }
};
