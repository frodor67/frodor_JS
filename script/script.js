'use strict';

let   startB          = document.getElementById('start'),
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

// const findInput = function () {
//   const dataInputText = data.querySelectorAll('input[type=text]');
//   return dataInputText;
// };

const AppData = function () {
  this.income = {};
  this.incomeMonth = 0;
  this.budget = 0;
  this.addIncome = [];
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit =0;
  this.moneyDeposit = 0;
};


AppData.prototype.start = function () {
    console.log(this);     
    if (salaryAmount.value === '') {
    document.querySelector('.income_period-value').value = '';
    startB.setAttribute('disabled', 'true');
    }

    startB.style.display = 'none';
    cancel.style.display = 'block';
    
    let dataInputText = data.querySelectorAll('input[type=text]');

    for (let i = 0; i < dataInputText.length; i++) {
      inputs[i].setAttribute('disabled', 'disabled');      
    } 

    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome(); 
    this.getExpensesMonth();
    this.getBudget();
    this.getAddExpenses();
    this.getAddIncome();

    this.showResult();

  };

AppData.prototype.showResult = function () {
    const _this = this;
    valBudMonth.value = this.budgetMonth;
    valBudDay.value = this.budgetDay;
    valExpMonth.value = this.expensesMonth;
    valAddExpenses.value = this.addExpenses.join(', ');
    valAddIncome.value = this.addIncome.join(', ');
       
    valTargMonth.value = Math.ceil(this.getTargetMonth());
    valIncPeriod.value = this.calcSavedMoney();
    periodSelect.addEventListener('change', function () {

      valIncPeriod.value = _this.calcSavedMoney();      
    });
  };
AppData.prototype.addExpensesBlock = function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);    
    cloneExpensesItem.children[0].value = '';    
    cloneExpensesItem.children[1].value = '';    

    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);    
    expensesItems = document.querySelectorAll('.expenses-items');


    if (expensesItems.length === 3){
      expensesPlus.style.display = 'none';
    }
  };
AppData.prototype.addIncomeBlock = function () {    
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.children[0].value = '';    
    cloneIncomeItem.children[1].value = '';  
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  };
AppData.prototype.getExpenses = function () {
    const _this = this;
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== ''){
        _this.expenses[itemExpenses] = cashExpenses;
      }
    });
  };
AppData.prototype.getIncome = function () {
    const _this = this;
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        _this.income[itemIncome] = cashIncome;
      }      
    });
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  };
AppData.prototype.getAddExpenses = function () {
    const _this = this;
    let addExpenses = addExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if (item !== ''){
        _this.addExpenses.push(item);
      }
    });
  };
AppData.prototype.getAddIncome = function () {
    const _this = this;
    addIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (item.value !== ''){
        _this.addIncome.push(itemValue);
      }
    });


  };  
AppData.prototype.getExpensesMonth = function () {
    for ( let prop in this.expenses)  {
      this.expensesMonth += +this.expenses[prop];
    } 

    return this.expensesMonth;

  };
AppData.prototype.getBudget = function () {

    this.budgetMonth = (+this.budget + this.incomeMonth) - this.expensesMonth;

    this.budgetDay = Math.floor(this.budgetMonth / 30);

    return this.budgetMonth, this.budgetDay;

  };
AppData.prototype.getTargetMonth = function () {
    
      return targetAmount.value / this.budgetMonth;
    
  };
AppData.prototype.getRange = function () {    
    periodAmount.textContent = document.querySelector('.period-select').value;
  };  
AppData.prototype.calcSavedMoney = function () {    
    return this.budgetMonth * periodSelect.value;  
  };

AppData.prototype.reset = function () {
  
  let inputs = data.querySelectorAll('input[type=text]');

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
  
  startB.style.display = 'block';
  cancel.style.display = 'none'; 

  
  };

const appData = new AppData();

AppData.prototype.eventListeners = function () {
  
  startB.addEventListener('click', this.start.bind(appData));  
  cancel.addEventListener('click', this.reset);  
  
  expensesPlus.addEventListener('click', this.addExpensesBlock);
  incomePlus.addEventListener('click', this.addIncomeBlock);
  periodSelect.addEventListener('input', this.getRange);
  
  
  };

  
appData.eventListeners();
