'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};





let money;
let income = 'Фриланс';
let addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 300000;
let period = 12;



let start = function () {
  
  
  do {
    money = prompt('Ваш месячный доход?');
  }

  while (!isNumber(money));
};

start();


let showTypeOf = function (data) {
  console.log(typeof (data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

console.log(addExpenses.toLowerCase().split(','));

let expenses = [];

function getExpensesMonth() {  
  let sum = 0;
  let sumAsk;
  for (let i = 0; i < 2; i++) {
    
    expenses[i] = prompt('Введите обязательную статью расходов?');

    console.log(expenses);
      
    do {
    sumAsk = prompt('Во сколько это обойдется?');
    } while (!isNumber(sumAsk));
    sum += +sumAsk;

    console.log(sum);
      
       
  }
  console.log('Ваши расходы в месяц составляют: ' + sum);
  return sum;
}

let expensesMonth = getExpensesMonth();


function getAccumulatedMonth(money) {
  return money - expensesMonth;
}

let accumulatedMonth = +getAccumulatedMonth(money);

function getTargetMonth(mission) {
  if (accumulatedMonth <= 0) {
    return console.log('При нулевом дневном бюджете цель не будет достигнута');      
  } else {
    return console.log(`Цель будет достигнута за ${Math.ceil(mission / accumulatedMonth)} месяцев(-а)`);
  }
}

let budgetDay = Math.floor(accumulatedMonth / 30);

console.log('Бюджет на день: ' + budgetDay);

function getStatusIncome() {
  
  if (budgetDay <= 600) {
    return ('К сожалению, у вас уровень дохода ниже среднего');
  } else if (budgetDay <= 1200) {
    return ('У вас средний уровень дохода');
  } else if (budgetDay > 1200) {
    return ('У вас высокий уровень дохода');
  } else {
    return ('Что-то пошло не так!');
  }
}

if (money > 0) {
  getTargetMonth(mission);
  console.log(getStatusIncome());
} else {
  console.log('Доход не может быть равен 0');
}