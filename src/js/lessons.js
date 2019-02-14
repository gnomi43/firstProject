let startBtn = document.querySelector('#start'),
    budgetValue = document.querySelector('.budget-value'),
    dayBudgetValue = document.querySelector('.daybudget-value'),
    levelValue = document.querySelector('.level-value'),
    expensesValue = document.querySelector('.expenses-value'),
    optionalExpensesValue = document.querySelector('.optionalexpenses-value'),
    income = document.querySelector('.income-value'),
    monthSavingsValue = document.querySelector('.monthsavings-value'),
    yearSavingsValue = document.querySelector('.yearsavings-value'),

    expensesItem = document.querySelectorAll('.expenses-item'),
    expensesItemBtn = document.getElementsByTagName('button')[0],
    optionalExpensesItemBtn = document.getElementsByTagName('button')[1],
    countBudgetBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('#income'),
    chooseSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('#sum'),
    percentValue = document.querySelector('#percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money,
    time;

startBtn.addEventListener('click', function (event) {
    time = prompt('Введите дату в формате YYYY-MM-DD', ''),
    money = +prompt('Ваш бюджет на месяц?', '');

    while(isNaN(money) || money =='' || money == null){
        money = +prompt('Ваш бюджет на месяц?', '');
    }
    appData.haveMoney = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
    if (event.type == 'click') {
        expensesItemBtn.addEventListener('click', function () {
            let sum = 0;
            for (let i=0; i<expensesItem.length; i++){
                let a =expensesItem[i].value,
                    b =+expensesItem[++i].value;
        
               if((typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null && a != "" 
               && b != "" && a.length <50){
                   console.log('done');
                   appData.expenses[a]=b;
                   sum += +b;
               }else{
                   i--
               }
            }
        expensesValue.textContent = sum;
    });
    
    optionalExpensesItemBtn.addEventListener('click', function () {
        for(let i=0; i<optionalExpensesItem.length; i++){
            let a = optionalExpensesItem[i].value;
                    appData.optionalExpenses[i]=a;
                    optionalExpensesValue.textContent +=appData.optionalExpenses[i] + ' ';
        }
    });
    
    countBudgetBtn.addEventListener('click', function () {
        if (appData.haveMoney != undefined){
            appData.moneyInDay = ((appData.haveMoney - Number(expensesItem[1].value) - Number(expensesItem[3].value)) /30).toFixed(0);
                dayBudgetValue.textContent = appData.moneyInDay;
    
                if(appData.moneyInDay<=100){
                    levelValue.textContent = 'Низкий уровень дохода';
                }       else if (appData.moneyInDay>100 && appData.moneyInDay<=2000){
                    levelValue.textContent = 'Средний уровень дохода';
                }       else if (appData.moneyInDay>2000){
                levelValue.textContent = 'Высокий уровень дохода';
                }       else { 
                    levelValue.textContent = 'Ошибка при вводе информации';
                }
    
        } else{
        dayBudgetValue.textContent = 'Нажмите начать расчёт для ввода вашего дохода';
        }
    });
    }
});

chooseIncome.addEventListener('input', function () {
	let items = chooseIncome.value;
	    appData.income = items.split(', ');
	    income.textContent = appData.income;

});

chooseSavings.addEventListener('click', function () {
	if ( appData.savings == true){
		appData.savings = false;
	}else {
		appData.savings = true;
	}
});

sumValue.addEventListener('input', function(){
	if (appData.savings == true){
		let sum = +sumValue.value,
		    percent = +percentValue.value;

	appData.monthIncome = sum/100/12*percent;
	appData.yaerIncome = sum/100*percent;

	monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
	yearSavingsValue.textContent = appData.yaerIncome.toFixed(1);
	}
});

percentValue.addEventListener('input', function(){
	if (appData.savings == true){
		let sum = +sumValue.value,
		    percent = +percentValue.value;

	appData.monthIncome = sum/100/12*percent;
	appData.yaerIncome = sum/100*percent;

	monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
	yearSavingsValue.textContent = appData.yaerIncome.toFixed(1);
	}
});

let appData = {
    haveMoney: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
};

