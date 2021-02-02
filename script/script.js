let money = +prompt('Ваш месячный доход?');
let income = 'Фриланс';
let addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 300000;
let period = 12;


const expenses1 = prompt('Введите обязательную статью расходов?');
const amount1 = prompt('Во сколько это обойдется?');
const expenses2 = prompt('Введите обязательную статью расходов?');
const amount2 = prompt('Во сколько это обойдется?');

console.log(typeof (money));
console.log(typeof (income));
console.log(typeof (deposit));

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');


addExpenses = addExpenses.toLowerCase();
console.log(addExpenses.split(', '));




if (money > 0) {
  let budgetMonth = money - amount1 - amount2;

  console.log('Бюджет на месяц: ' + budgetMonth);

  console.log(`Цель будет достигнута за ${Math.ceil(mission / budgetMonth)} месяцев(-а)`);

  let budgetDay = Math.floor(budgetMonth / 30);

  console.log('Бюджет на день: ' + budgetDay);

  console.log(typeof (budgetDay));

  // if (budgetDay >= 1200) {
  //   console.log('У вас высокий уровень дохода');
  // } else if (budgetDay < 1200) {
  //   console.log('У вас средний уровень дохода');
  // } else if (budgetDay < 600) {
  //   console.log('К сожалению, у вас уровень дохода ниже среднего');
  // } else {
  //  console.log('Что-то пошло не так!');
  // }

  if (budgetDay <= 600) {
    console.log('К сожалению, у вас уровень дохода ниже среднего');
  } else if (budgetDay <= 1200) {
    console.log('У вас средний уровень дохода');
  } else if (budgetDay > 1200) {
    console.log('У вас высокий уровень дохода');
  } else {
    console.log('Что-то пошло не так!');
  }

} else {
  console.log('Доход не может быть равен 0');
}


