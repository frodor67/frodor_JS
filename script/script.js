let money = +prompt('Ваш месячный доход?');
let income = 'Фриланс';
let addExpeses = prompt('Перечислите возмодные расходы за расчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 300000;
let period = 12;


const expenses1 = prompt('Введите обязательную статью расходов?');
const amount1 = prompt('Во сколько это обойдется?');
const expenses2 = prompt('Введите обязательную статью расходов?');
const amount2 = prompt('Во сколько это обойдется?');

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));

console.log(addExpeses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');


addExpeses = addExpeses.toLowerCase();
console.log(addExpeses.split(', '));

let budgetMonth = money - amount1 - amount2;

console.log('Бюджет на месяц: ' + budgetMonth);

console.log(`Цель будет достигнута за ${Math.ceil(mission / budgetMonth)} месяцев(-а)`);

let budgetDay = Math.floor(budgetMonth / 30);

console.log('Бюджет на день: ' + budgetDay);

if (budgetDay >= 1200) {
 console.log('У вас высокий уровень дохода');
} else if (600 <= budgetDay <= 1200) {
 console.log('У вас средний уровень дохода');
} else if (0 <= budgetDay <= 600) {
 console.log('К сожалению, у вас уровень дохода ниже среднего');
} else {
 console.log('Что-то пошло не так!');
}


