'use strict';

const startB          = document.getElementById('start'),
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
      addExpensesItem = document.querySelector('.additional_expenses-item'),
      chkDep          = document.querySelector('#deposit-check'),
      cashDep         = document.querySelector('.deposit-amount'),
      percentDep      = document.querySelector('.deposit-percent'),
      targetAmount    = document.querySelector('.target-amount'),
      periodSelect    = document.querySelector('.period-select'),
      periodAmount    = document.querySelector('.period-amount'),
      inputs          = document.getElementsByTagName('input'),
      inputText       = document.querySelectorAll('input[type=text]'),
      data            = document.querySelector('.data'),
      result          = document.querySelector('.result'),
      resultInputText = result.querySelectorAll('.result-total'),
      depositBank     = document.querySelector('.deposit-bank'),
      depositAmount   = document.querySelector('.deposit-amount'),
      depositPercent  = document.querySelector('.deposit-percent');


      
let   incomeItems     = document.querySelectorAll('.income-items'),
      expensesItems   = document.querySelectorAll('.expenses-items');
      
const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = function (s) {
  return isNaN(s);
};

class AppData {
  constructor(){
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
  }

  start() {
    console.log(this);     
    if (salaryAmount.value === '') {
    document.querySelector('.income_period-value').value = '';
    startB.setAttribute('disabled', 'true');
    this.eventListeners();
    return;
    }

    if (depositPercent.value < 0 || depositPercent.value > 100 || depositPercent.value === '') {
    alert('Введите процент депозита, от 0 до 100');
    depositPercent.value = '';
    startB.setAttribute('disabled', 'true');
    this.eventListeners();
    return;
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
    this.getInfoDeposit();
    this.getBudget();
    this.getAddExpenses();
    this.getAddIncome();

    this.showResult();

  }

  showResult() {
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
  }

  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);    
    cloneExpensesItem.children[0].value = '';    
    cloneExpensesItem.children[1].value = '';    

    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);    
    expensesItems = document.querySelectorAll('.expenses-items');


    if (expensesItems.length === 3){
      expensesPlus.style.display = 'none';
    }
  }

  addIncomeBlock() {    
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.children[0].value = '';    
    cloneIncomeItem.children[1].value = '';  
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  }

  getExpenses() {
    const _this = this;
    expensesItems.forEach(function (item) {
      const itemExpenses = item.querySelector('.expenses-title').value,
            cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== ''){
        _this.expenses[itemExpenses] = cashExpenses;
      }
    });
  }

  getIncome() {
    const _this = this;
    incomeItems.forEach(function (item) {
      const itemIncome = item.querySelector('.income-title').value,
            cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        _this.income[itemIncome] = cashIncome;
      }      
    });
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  getAddExpenses() {
    const _this = this;
    const addExpenses = addExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if (item !== ''){
        _this.addExpenses.push(item);
      }
    });
  }

  getAddIncome() {
    const _this = this;
    addIncomeItem.forEach(function (item) {
      const itemValue = item.value.trim();
      if (item.value !== ''){
        _this.addIncome.push(itemValue);
      }
    });
  }

  getExpensesMonth() {
    for ( let prop in this.expenses)  {
      this.expensesMonth += +this.expenses[prop];
    } 

    return this.expensesMonth;

  }

  getBudget() {

    const monthdeposit = this.moneyDeposit * (this.percentDeposit / 100);

    this.budgetMonth = (+this.budget + this.incomeMonth) - this.expensesMonth + monthdeposit;

    this.budgetDay = Math.floor(this.budgetMonth / 30);

    return this.budgetMonth, this.budgetDay;

  }

  changePercent () {
    const valueSelect = this.value;

    if (valueSelect === 'other' ) {
      depositPercent.style.display = 'inline-block';
      depositPercent.value = valueSelect;
    } else {
      depositPercent.value = valueSelect;
    }

  }

  getInfoDeposit () {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }


  depositHandler() {
    if (chkDep.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);

    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none'; 
      depositBank.value = '';
      depositAmount.value = '';
      depositPercent.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
      return;
    }
  

  getTargetMonth() {
    
      return targetAmount.value / this.budgetMonth;
    
  }


  getRange() {    
    periodAmount.textContent = document.querySelector('.period-select').value;
  }

  calcSavedMoney() {    
    return this.budgetMonth * periodSelect.value;  
  }

  reset() {
  
    const inputs = data.querySelectorAll('input[type=text]');

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].removeAttribute('disabled');
        inputs[i].value = '';     
      }
    for (let i = 0; i < resultInputText.length; i++) {
        resultInputText[i].value = '';     
      }

    // const checkbox = document.querySelector('input[type=checkbox]');
    if (chkDep.checked) {
        chkDep.checked = false;
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none'; 
        depositBank.value = '';
        depositAmount.value = '';
        depositPercent.value = '';
        chkDep.removeAttribute('disabled');
        this.deposit = false;
    }
    
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
    startB.removeAttribute('disabled');
    cancel.style.display = 'none'; 

  
  }
  
  eventListeners() {
    const appData = new AppData();
    
    startB.addEventListener('click', this.start.bind(appData));  
    cancel.addEventListener('click', this.reset);  
    
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addIncomeBlock);
    periodSelect.addEventListener('input', this.getRange);
  
    chkDep.addEventListener('change', this.depositHandler.bind(appData)); 
    salaryAmount.addEventListener('change', startB.removeAttribute('disabled'));
  }
}


const appData = new AppData();

  
appData.eventListeners();
