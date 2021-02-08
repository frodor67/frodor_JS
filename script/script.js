'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function () {      
      do {
        money = prompt('Ваш месячный доход?');
      }
      while (!isNumber(money));
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
  },
  getExpensesMonth: function () {  
        let sum = 0;
        let sumAsk;
        for (let i = 0; i < 2; i++) {
          
          appData.expenses[i] = prompt('Введите обязательную статью расходов?');
          
          console.log(appData.expenses);
          
          do {
            sumAsk = prompt('Во сколько это обойдется?');
          } while (!isNumber(sumAsk));
          sum += +sumAsk;
          
          console.log(sum);
          
          
        }
        console.log('Ваши расходы в месяц составляют: ' + sum);
        return sum;
  },
  getAccumulatedMonth: function (money) {
                      return money - appData.expensesMonth;
  },
  getTargetMonth: function (mission) {
        if (appData.accumulatedMonth <= 0) {
          return console.log('При нулевом дневном бюджете цель не будет достигнута');      
        } else {
          return console.log(`Цель будет достигнута за ${Math.ceil(mission / appData.accumulatedMonth)} месяцев(-а)`);
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

appData.asking();


console.log('Период равен ' + appData.period + ' месяцев');
console.log('Цель заработать ' + appData.mission + ' рублей');

appData.expensesMonth = appData.getExpensesMonth();

appData.accumulatedMonth = +appData.getAccumulatedMonth(money);

appData.budgetDay = Math.floor(appData.accumulatedMonth / 30);

console.log('Бюджет на день: ' + appData.budgetDay);

if (money > 0) {
  appData.getTargetMonth(appData.mission);
  console.log(appData.getStatusIncome());
} else {
  console.log('Доход не может быть равен 0');
}