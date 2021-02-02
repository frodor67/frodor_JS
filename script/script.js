let money = +prompt('Ваш месячный доход?');
let income = 'Фриланс';
let addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 300000;
let period = 12;



const expenses1 = prompt('Введите обязательную статью расходов?');
const amount1 = +prompt('Во сколько это обойдется?');
const expenses2 = prompt('Введите обязательную статью расходов?');
const amount2 = +prompt('Во сколько это обойдется?');


let showTypeOf = function (data) {
  console.log(typeof (data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');


addExpenses = addExpenses.toLowerCase();
console.log(addExpenses.split(', '));




if (money > 0) {

  function getExpensesMonth(amount1, amount2) {
    return amount1 + amount2;
  };

  function getAccumulatedMonth(money) {
    return money - getExpensesMonth(amount1, amount2);
  };

  let accumulatedMonth = +getAccumulatedMonth(money);


  function getTargetMonth(mission) {
    if (accumulatedMonth == 0) {
      return console.log('При нулевом дневном бюджете цель не будет достигнута');      
    } else {
      return console.log(`Цель будет достигнута за ${Math.ceil(mission / accumulatedMonth)} месяцев(-а)`);
    }
  }

  getTargetMonth(mission);

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
  };

  console.log(getStatusIncome());

} else {
  console.log('Доход не может быть равен 0');
}