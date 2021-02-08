'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function () {      
      do {
        money = prompt('Ваш месячный доход?');
      }
      while (!isNumber(money) || money == 0);
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
  mission: 300000,
  period: 8,
  accumulatedMonth: 0,
  asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        
        for (let i = 0; i < 2; i++) {

          let ask = prompt('Введите обязательную статью расходов?'),
              sumAsk = 0;
          do {
            sumAsk = prompt('Во сколько это обойдется?');
          } while (!isNumber(sumAsk));

          appData.expenses[ask] = sumAsk;
          
        }

        console.log(appData.expenses);
  },
  getExpensesMonth: function () {  
    let sum = 0;
    for ( let prop in appData.expenses)  {
      sum += +appData.expenses[prop];
    } 

    console.log('Ваши расходы в месяц составляют: ' + sum);

    return appData.expensesMonth = sum;

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
}
  
  
};


let getProp = function () {
  console.log('Наша программа включает в себя данные:');
  for (let prop in appData) {
    console.log(prop + ':' + appData[prop]);
  }

};



appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
console.log(appData.getStatusIncome());
getProp();


// console.log('Период равен ' + appData.period + ' месяцев');
// console.log('Цель заработать ' + appData.mission + ' рублей');

// appData.expensesMonth = +appData.getExpensesMonth();

// appData.accumulatedMonth = +appData.getAccumulatedMonth(money);

// appData.budgetDay = Math.floor(appData.accumulatedMonth / 30);

// console.log('Бюджет на день: ' + appData.budgetDay);


 



