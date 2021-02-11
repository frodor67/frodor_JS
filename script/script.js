'use strict';

let   start           = document.getElementById('start'),
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
      incomeItems     = document.querySelectorAll('.additional_income-item'),
      expensesItems   = document.querySelectorAll('.expenses-items'),
      addExpensesItem = document.querySelector('.additional_expenses-item'),
      chkDep          = document.querySelector('#deposit-check'),
      cashDep         = document.querySelector('.deposit-amount'),
      percentDep      = document.querySelector('.deposit-percent'),
      targetAmount    = document.querySelector('.target-amount'),
      periodSelect    = document.querySelector('.period-select'),
      incomeItem      = document.querySelectorAll('.income-items');

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function (s) {
  return isNaN(s);
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
    if (salaryAmount.value === ''){
      alert('Ошибка, поле "месячный доход" должно быть заполнено!');
      return;
    }
    
    appData.budget = salaryAmount.value;
    appData.getExpenses(); 
    appData.getExpensesMonth();
    appData.getBudget();
    appData.getAddExpenses();
    appData.getAddIncome();

    appData.showResult();


  },
  showResult: function () {
    valBudMonth.value = appData.budgetMonth;
    valBudDay.value = appData.budgetDay;
    valExpMonth.value = appData.expensesMonth;
    valAddExpenses.value = appData.addExpenses.join(', ');
    valAddIncome.value = appData.addIncome.join(', ');
    valTargMonth.value = Math.ceil(appData.getTargetMonth());
    valIncPeriod.value = appData.calcSavedMoney();
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3){
      expensesPlus.style.display = 'none';
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
    if(confirm('Есть ли у вас дополнительный источник заработка?')){
      do {
        let itemIncome = prompt('Какой у ваc есть дополнительный заработок?', 'Таксую');
      } while (!isNaN(+itemIncome) && false);

      do {
        let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', '10000');
      } while (!isNumber(cashIncome) && false);

      appData.income[itemIncome] = cashIncome;
    }

    

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
    incomeItems.forEach(function (item) {
      let itemValue = item.value.trim();
      if (item.value !== ''){
        appData.addIncome.push(itemValue);
      }
    });


  },  
  getExpensesMonth: function () {  
    for ( let prop in appData.expenses)  {
      appData.expensesMonth += +appData.expenses[prop];
    } 

    console.log('Ваши расходы в месяц составляют: ' + appData.expensesMonth);

    return appData.expensesMonth;

  },
  getBudget: function () {

    appData.budgetMonth = appData.budget - appData.expensesMonth;

    appData.budgetDay = Math.floor(appData.budgetMonth / 30);

    return appData.budgetMonth, appData.budgetDay;

  },
  getTargetMonth: function () {        
    
      return targetAmount.value / appData.budgetMonth;
    
  },
  getStatusIncome: function () {  
    if (appData.budgetDay <= 600) {
      return ('К сожалению, у вас уровень дохода ниже среднего');
    } else if (appData.budgetDay <= 1200) {
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay > 1200) {
      return ('У вас высокий уровень дохода');
    } else {
      return ('Что-то пошло не так!');
    }
  },

  getInfoDeposit: function () {
    if (appData.deposit){
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', '10');
      } while (!isNumber(appData.percentDeposit));

      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', '10000');
      } while (!isNumber(appData.moneyDeposit));
    }
  
  },
  
  calcSavedMoney: function () {
    return appData.budgetMonth * periodSelect.value;
  }
};



start.addEventListener('click', appData.start);

expensesPlus.addEventListener('click', appData.addExpensesBlock);


// let getProp = function () {
//   console.log('Наша программа включает в себя данные:');
//   for (let prop in appData) {
//     console.log(prop + ':' + appData[prop]);
//   }

// };

// let arrToString = function (){

//   function upper (item){
//     return item.trim().charAt(0).toUpperCase() + item.trim().substring(1);    
//   }
  
//   let expUpper = appData.addExpenses.map(upper);
//   console.log(expUpper.join(', '));

// };

  



// appData.asking();
// appData.getExpensesMonth();
// appData.getBudget();
// appData.getTargetMonth();
// appData.getInfoDeposit();
// appData.calcSavedMoney();
// console.log(appData.getStatusIncome());
// getProp();
// arrToString();


