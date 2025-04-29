'use strict';

//Input elements
const bill = document.querySelector('#cost-amount');
const numberOfPeople = document.querySelector('#number-of-people');
const tipPercentage = document.querySelector('ul');

//Output elements
const tipPerPerson = document.querySelector('#tip-per-person');
const totalPerPerson = document.querySelector('#total-per-person');

// Variable to track the selected tip percentage
let selectedTipPercentage = null;

//Function to grab the bill amount (outputs a number)

const billAmount = () => {
  const billValue = parseFloat(bill.value);
  console.log(billValue);
  return billValue;
};

//Function to grab the number of people (outputs a number)
const people = () => {
  const numberOfPeopleValue = parseFloat(numberOfPeople.value);
  console.log(numberOfPeopleValue);
  return numberOfPeopleValue;
};

//callback to calculate and render the total per person and tip amount per person

const billAmountPerPerson = () => {
  //Step 1: Validate user input
  if (!bill.checkValidity()) {
    console.log('Please enter a valid bill amount');
    return;
  } else if (!numberOfPeople.checkValidity()) {
    console.log('Please enter a valid number of people');
    return;
  } else if (selectedTipPercentage === null) {
    console.log('Please select a tip percentage');
    return;
  }

  //Step 2: Grab the values from the input fields

  const billValue = billAmount();
  const peopleValue = people();
  const tipValue = billValue * selectedTipPercentage;

  //Step 3: Calculate the total per person and tip amount per person
  const total = billValue / peopleValue;
  const tipValuePerPerson = tipValue / peopleValue;

  //Step 4: Render the calculated numbers to the DOM
  totalPerPerson.textContent = `$${total.toFixed(2)}`;
  tipPerPerson.textContent = `$${tipValuePerPerson.toFixed(2)}`;
};

// Add event listeners to the input fields

bill.addEventListener('blur', billAmountPerPerson);
numberOfPeople.addEventListener('blur', billAmountPerPerson);

tipPercentage.addEventListener('click', e => {
  //add active class to the selected tip percentage
  if (e.target.tagName === 'BUTTON') {
    selectedTipPercentage = parseFloat(e.target.value);
    console.log(selectedTipPercentage);

    //remove active class from all other tip percentages
    const allTips = document.querySelectorAll('button');
    allTips.forEach(tip => {
      tip.classList.remove('active');
    });

    //add active class to the selected tip percentage
    e.target.classList.add('active');
  }
  //call the function to calculate the total per person and tip amount per person
  //after selecting a tip percentage
  billAmountPerPerson();
});
