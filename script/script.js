let money = 50000;
let income = 'Фриланс';
let addExpeses = 'Интернет, такси, коммуналка';
let deposit = true;
let mission = 3000000;
let period = 12;

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));

console.log(addExpeses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' юаней');


addExpeses = addExpeses.toLowerCase();
console.log(addExpeses.split(', '));

let budgetDay = money / 30;

console.log(budgetDay);

