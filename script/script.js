'use strict';

let   start           = document.getElementById('start'),
      cancel          = document.getElementById('cancel'),
      incomePlus      = document.getElementsByTagName('button')[0],
      expensesPlus    = document.getElementsByTagName('button')[1],
      chkBox          = document.querySelector('#deposit-check'),
      valBudMonth     = document.getElementsByClassName('budget_month-value')[0],
      valBudDay       = document.getElementsByClassName('budget_day-value')[0],
      valExpMonth     = document.getElementsByClassName('expenses_month-value')[0],
      valAddIncome    = document.getElementsByClassName('additional_income-value')[0],
      valAddExpenses  = document.getElementsByClassName('additional_expenses-value')[0],
      valIncPeriod    = document.getElementsByClassName('income_period-value')[0],
      valTargMonth    = document.getElementsByClassName('target_month-value')[0],
      salaryAmount    = document.querySelector('.salary-amount'),
      itemIncome      = document.querySelector('.income-title'),
      addIncomeItem   = document.querySelectorAll('.additional_income-item'),
      expensesItems   = document.querySelectorAll('.expenses-items'),
      addExpensesItem = document.querySelector('.additional_expenses-item'),
      chkDep          = document.querySelector('#deposit-check'),
      cashDep         = document.querySelector('.deposit-amount'),
      percentDep      = document.querySelector('.deposit-percent'),
      targetAmount    = document.querySelector('.target-amount'),
      periodSelect    = document.querySelector('.period-select'),
      periodAmount    = document.querySelector('.period-amount'),
      incomeItems     = document.querySelectorAll('.income-items'),
      inputs          = document.getElementsByTagName('input'),
      inputText       = document.querySelectorAll('input[type=text]'),
      data            = document.querySelector('.data'),
      result          = document.querySelector('.result'),
      
      resultInputText = result.querySelectorAll('.result-total');

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function (s) {
  return isNaN(s);
};

const findInput = function () {
  const dataInputText = data.querySelectorAll('input[type=text]');
  return dataInputText;
};

let appData = {
  income: {},
  incomeMonth: 0,
  budget: 0,
  addIncome: [],
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  start: function () {     
    // if (salaryAmount.value === ''){
    //   alert('Ошибка, поле "месячный доход" должно быть заполнено!');
    //   return;
    // }
    
    this.budget = salaryAmount.value;
    this.getExpenses();
    this.getIncome(); 
    this.getExpensesMonth();
    this.getBudget();
    this.getAddExpenses();
    this.getAddIncome();
    //appData.getRange();

    this.showResult();


  },
  showResult: function () {
    
    valBudMonth.value = this.budgetMonth;
    valBudDay.value = this.budgetDay;
    valExpMonth.value = this.expensesMonth;
    valAddExpenses.value = this.addExpenses.join(', ');
    valAddIncome.value = this.addIncome.join(', ');
       
    valTargMonth.value = Math.ceil(this.getTargetMonth());
    valIncPeriod.value = this.calcSavedMoney();
    periodSelect.addEventListener('change', function () {
      valIncPeriod.value = appData.calcSavedMoney();      
    });
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);    
    cloneExpensesItem.children[0].value = '';    
    cloneExpensesItem.children[1].value = '';    

    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);    
    expensesItems = document.querySelectorAll('.expenses-items');


    if (expensesItems.length === 3){
      expensesPlus.style.display = 'none';
    }
  },
  addIncomeBlock: function () {    
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.children[0].value = '';    
    cloneIncomeItem.children[1].value = '';  
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== ''){
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });
  },
  getAddExpenses: function () {
    let addExpenses = addExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if (item !== ''){
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    addIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (item.value !== ''){
        appData.addIncome.push(itemValue);
      }
    });


  },  
  getExpensesMonth: function () {  
    for ( let prop in this.expenses)  {
      this.expensesMonth += +this.expenses[prop];
    } 

    return appData.expensesMonth;

  },
  getBudget: function () {

    this.budgetMonth = this.budget - this.expensesMonth;

    this.budgetDay = Math.floor(this.budgetMonth / 30);

    return this.budgetMonth, this.budgetDay;

  },
  getTargetMonth: function () {        
    
      return targetAmount.value / this.budgetMonth;
    
  },
  getRange: function () {    
    periodAmount.textContent = document.querySelector('.period-select').value;
  },  
  calcSavedMoney: function () {    
    return this.budgetMonth * periodSelect.value;  
  },
};


const chekSalAm = function () {
  

  if (salaryAmount.value === '') {
    document.querySelector('.income_period-value').value = '';
    start.addEventListener('click', chekSalAm);
  } else {     
    appData.start();
    start.style.display = 'none';
    cancel.style.display = 'block'; 
    
    let inputs = findInput();

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].setAttribute('disabled', 'disabled');      
    }    
  }
};

const reset = function () {
  
  let inputs = findInput();

  for (let i = 0; i < inputs.length; i++) {
      inputs[i].removeAttribute('disabled');
      inputs[i].value = '';     
    }
  for (let i = 0; i < resultInputText.length; i++) {
      resultInputText[i].value = '';     
    }

  const checkbox = document.querySelector('input[type=checkbox]');
  checkbox.checked = false;
  
  periodAmount.textContent = 1;
  document.querySelector('.period-select').value = 1;

  for (let i = 1; i < incomeItems.length; i++) {
    incomeItems[i].remove();    
  }
  for (let i = 1; i < expensesItems.length; i++) {
    expensesItems[i].remove();
    
  }  
  incomePlus.style.display = 'block';  
  expensesPlus.style.display = 'block';
  
  start.style.display = 'block';
  cancel.style.display = 'none'; 

  
};



start.addEventListener('click', chekSalAm);  
cancel.addEventListener('click', reset);  

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getRange);