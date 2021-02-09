'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function (s) {
  return isNaN(s);
};

let money,
    start = function () {      
      do {
        money = prompt('Ваш месячный доход?');
      }
      while (!isNumber(money) || money === 0);
};

start();

let appData = {
  income: {},
  budget: money,
  addIncome: [],
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 300000,
  period: 8,
  asking: function () {
    let itemIncome,
        cashIncome;
    if(confirm('Есть ли у вас дополнительный источник заработка?')){
      do {
        itemIncome = prompt('Какой у ваc есть дополнительный заработок?', 'Таксую');
      } while (!isNaN(+itemIncome));

      do {
         cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', '10000');
      } while (!isNumber(cashIncome));

      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    
    for (let i = 0; i < 2; i++) {

      let ask,
          sumAsk = 0;

      do { 
        ask = prompt('Введите обязательную статью расходов?');
      } while (!isNaN(ask));
      
      do {
        sumAsk = prompt('Во сколько это обойдется?');
      } while (!isNumber(sumAsk));

      appData.expenses[ask] = sumAsk;
      
    }

    console.log(appData.expenses);
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
    if (appData.budgetMonth <= 0) {
      return console.log('При нулевом дневном бюджете цель не будет достигнута');      
    } else {
      return console.log(`Цель будет достигнута за ${Math.ceil(appData.mission / appData.budgetMonth)} месяцев(-а)`);
    }
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
    return appData.budgetMonth * appData.period;
  }
};


let getProp = function () {
  console.log('Наша программа включает в себя данные:');
  for (let prop in appData) {
    console.log(prop + ':' + appData[prop]);
  }

};

let arrToString = function (){

  function upper (item){
    return item.trim().charAt(0).toUpperCase() + item.trim().substring(1);    
  }
  
  let expUpper = appData.addExpenses.map(upper);
  console.log(expUpper.join(', '));

};

  



appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getInfoDeposit();
appData.calcSavedMoney();
console.log(appData.getStatusIncome());
getProp();
arrToString();