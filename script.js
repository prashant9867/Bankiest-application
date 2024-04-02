'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2024-04-02T21:31:17.178Z',
    '2024-04-01T07:42:02.383Z',
    '2024-03-29T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'hi-IN',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


/////////////////////////////////////////////////
/////////////////////////////////////////////////
//WOrk

// const currentDate = new Date();
// const day = `${currentDate.getDate()}`.padStart(2, 0);
// const month = `${currentDate.getMonth() + 1}`.padStart(2, 0);
// const year = currentDate.getFullYear();
// const hour = currentDate.getHours();
// const minute = currentDate.getMinutes();

//labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minute}`;

// labelDate.textContent = new Intl.DateTimeFormat('en-US').format(currentDate);


const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));
  const curDateNow = new Date();
  const dayPassed = calcDaysPassed(curDateNow, date);
  if (dayPassed === 0) return "Today";
  if (dayPassed === 1) return "Yesterday";
  if (dayPassed <= 7) return `${dayPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // const hour = `${date.getHours()}`.padStart(2, 0);
    // const minute = `${date.getMinutes()}`.padStart(2, 0);
    // return `${day}/${month}/${year}, ${hour}:${minute}`;
    const optionsDisplay = {
      day: '2-digit',
      minute: '2-digit',
      hour: '2-digit',
      month: '2-digit',
      year: 'numeric',
      weekday: 'short'
    }
    return new Intl.DateTimeFormat(locale, optionsDisplay).format(curDateNow);
  }

}



const displayMovements = function (acc, sort = false) {
  const newMov = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;
  containerMovements.innerHTML = '';
  newMov.forEach(function (mov, idx) {

    const date = new Date(acc.movementsDates[idx]);

    const displayDate = formatMovementDate(date, acc.locale);

    const type = mov > 0 ? 'Deposit' : 'Withdrawal';

    const formattedMov = new Intl.NumberFormat(
      acc.locale, {
      style: 'currency',
      currency: acc.currency,
    }
    ).format(mov);

    const htmlContent = `<div class="movements__row">
                            <div class="movements__type movements__type--deposit">${idx + 1} ${type}</div>
                            <div class="movements__date">${displayDate}</div>
                            <div class="movements__value">${formattedMov}</div>
                        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', htmlContent);

  });

};

const createUserName = function (accs) {
  accs.forEach(function (account) {
    account.username = account.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  });
}
const calcAndDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  const formattedbBal = new Intl.NumberFormat(
    curentAccount.locale, {
    style: 'currency',
    currency: curentAccount.currency,
  }
  ).format(balance);
  labelBalance.textContent = `${formattedbBal}`;
}

const calcDisplaySummery = function (acc) {
  const formattedMovToDisplay = new Intl.NumberFormat(
    acc.locale, {
    style: 'currency',
    currency: acc.currency,
  }
  );
  const income = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  const spend = Math.abs(acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0));
  const interest = acc.movements.filter(mov => mov > 0).map(mov => mov * acc.interestRate / 100).filter(mov => {
    return mov > 1;
  }).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${formattedMovToDisplay.format(income)}`;
  labelSumOut.textContent = `${formattedMovToDisplay.format(spend)}`;
  labelSumInterest.textContent = `${formattedMovToDisplay.format(interest)}`;


}

const account = accounts.find(acc => acc.owner === 'Jessica Davis');

// GLOBAL VARIABLE................................

let curentAccount, timer;

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;


    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started"
      containerApp.style.opacity = 0;
    }

    time--;
  }
  let time = 300;
  // labelTimer.value = '';
  tick();

  const timer = setInterval(tick, 1000);
  console.log(timer);
  return timer;
}
// console.log(account);

// displayMovements(account1.movements);
createUserName(accounts);
// calcAndDisplayBalance(account1.movements);
//calcDisplaySummery(account1.movements);

//LOGIN Section



btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); //prevent form for subitting;
  curentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  // console.log(curentAccount);
  if (curentAccount?.pin === Number(inputLoginPin.value)) {
    inputLoginUsername.value = inputLoginPin.value = ''
    inputLoginPin.blur();

    Swal.fire({
      title: 'Login Success',
      text: `Click OK to Proceeed`,
      icon: 'success',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('OK button clicked');
        //display UI and Messeges
        containerApp.style.opacity = '1';
        labelWelcome.textContent = `Welcome Back, ${curentAccount.owner.split(' ')[0]}`;

        //Date format now;
        const now = new Date();
        const options = {
          hour: '2-digit',
          minute: '2-digit',
          day: "2-digit",
          month: 'long',
          year: 'numeric',
          weekday: 'short'
        }
        // const locale = navigator.language;
        const locale = curentAccount.locale;
        // console.log(new Intl.DateTimeFormat('hi-IN', options).format(now))
        labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);


        //display balance
        calcAndDisplayBalance(curentAccount.movements);

        //display summery
        calcDisplaySummery(curentAccount);

        //display movements
        displayMovements(curentAccount);

        //if timer exist then first delete it and then start it 

        if (timer) clearInterval(timer);
        timer = startLogOutTimer();
      }
    });
  } else {
    Swal.fire({
      title: 'Login Failed😥',
      text: `Either Your Account Closed !
      OR You Have Entered Wrong Credentials!
      Please Try Again!😀`,
      icon: 'error',
      confirmButtonText: 'OK'

    })
  }
});

//Transfer Section

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const transferAccount = accounts.find(acc => acc.username === inputTransferTo.value);
  const transferAmount = Number(inputTransferAmount.value);
  const currentTotalMoney = curentAccount.movements.reduce((acc, mov) => acc + mov, 0);
  console.log(transferAmount)
  console.log(`TOT:  ${currentTotalMoney} ${labelBalance.textContent}`);
  if (transferAccount?.username && transferAccount?.username != curentAccount.username && transferAmount && transferAmount <= currentTotalMoney) {

    //console.log(transferAmount)

    //add negative movement to current acount  update the all 3 parts

    curentAccount.movements.push(transferAmount * (-1));

    //push the date for now;
    const currDate = new Date();
    const currDateString = currDate.toISOString();
    curentAccount.movementsDates.push(currDateString);

    // console.log(curentAccount);

    //display balance
    calcAndDisplayBalance(curentAccount.movements);
    //display summery
    calcDisplaySummery(curentAccount);
    //display movements
    displayMovements(curentAccount);

    //update the timer.......
    clearInterval(timer);
    timer = startLogOutTimer();


    //add postive movement to the recipient 
    transferAccount.movements.push(transferAmount);
    transferAccount.movementsDates.push(currDateString);
    console.log(transferAccount);
    inputTransferAmount.value = inputTransferTo.value = '';
    Swal.fire({
      title: 'Success',
      text: `Money Sent Successfully !`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
  else {
    Swal.fire({
      title: 'Failed',
      text: `Wrong Username Entered !
      Please try again`,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
});

//LOGIN Delete section

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (inputCloseUsername.value == curentAccount.username && Number(inputClosePin.value) == curentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === curentAccount.username);
    // console.log(index);
    inputClosePin.value = inputCloseUsername.value = '';

    //Delete the user 
    accounts.splice(index, 1);
    // console.log(accounts);

    //Logout 
    containerApp.style.opacity = '';
    Swal.fire({
      title: 'Success',
      text: `Account Closed Successfully`,
      icon: 'success',
      confirmButtonText: 'OK'
    });

  } else {
    Swal.fire({
      title: 'Failed !',
      text: `Wrong username of password Entered !
      please try again !`,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

})

///Loan section

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const requestedLoanAmmount = Number(inputLoanAmount.value);
  if (requestedLoanAmmount > 0 && curentAccount.movements.some(mov => mov > requestedLoanAmmount * 0.1)) {
    curentAccount.movements.push(requestedLoanAmmount);
    const curDate = new Date();
    const curDateString = curDate.toISOString();
    setTimeout(function () {
      curentAccount.movementsDates.push(curDateString);
      //display balance
      calcAndDisplayBalance(curentAccount.movements);
      //display summery
      calcDisplaySummery(curentAccount);
      //display movements
      displayMovements(curentAccount);


    }, 3000);

    //update the timer.......
    clearInterval(timer);
    timer = startLogOutTimer();

    Swal.fire({
      title: 'Success!',
      text: `Loan of ${requestedLoanAmmount} Credited Successfully !`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  } else {
    Swal.fire({
      title: 'Failed!',
      text: `Loan of amount ${requestedLoanAmmount}€ is Not allowed !`,
      icon: 'error',
      confirmButtonText: 'OK'
    });

  }
  inputLoanAmount.value = '';
})

//implementing sorting 
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(curentAccount, !sorted);
  sorted = !sorted;
  console.log(sorted);
})


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES


const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// currencies.forEach(function (val, key, map) {
//   console.log(`${key} : ${val}`);
// })

// const Setcurr = new Set(['USD', 'EUR', 'GBP']);

// Setcurr.forEach(function (val, key, set) {
//   console.log(`${key} : ${val}`);
//   set.add('AUD');
//   console.log(set);
// })


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];


const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(firstWithdrawal);


const balance = movements.reduce(function (acc, val, idx, arr) {
  return acc + val;
}, 0);

const maxMovements = movements.reduce(function (acc, mov) {
  // console.log(`acc : ${acc} , curr ${mov}`);
  return acc < mov ? mov : acc;
}, movements[0])



const deposits = movements.filter(mov => mov > 0);

const euroToUsd = 1.1;

const movementsUSD = movements.map(function (mov, idx, movs) {
  // console.log(movs);
  // console.log(idx, Math.round(mov * euroToUsd));
  return Math.round(mov * euroToUsd);


})
// movements.forEach(function (data, idx) {
//   if (data > 0) {
//     console.log(`index : ${idx}:  you have deposited ${data}`);
//   } else {
//     console.log(`index : ${idx} :you have withdraw ${Math.abs(data)}`);
//   }
//   // console.log(arr);
// })

// for (const [i, val] of movements.entries()) {
//   console.log(` Index : ${i + 1} : ${val}`);
// }

/////////////////////////////////////////////////

const arr = [[[1, 2,], 3], [4, 5], [6, 7], 8]

const newArr = arr.flat(2);
// console.log(newArr);

const overAllBalance = accounts.map(acc => acc.movements).flat().reduce((acc, mov) => acc + mov, 0);

// console.log(overAllBalance);

const overAllBalance2 = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0);

// console.log(overAllBalance2);

//return<0 , (a,b)  --> keep the order
//return >0 ,(b,a)  --> switch the order 
// movements.sort((a, b) => {
//   if (a > b) { //switch the order
//     return 1;
//   }
//   if (a < b) { //keep the order
//     return -1;
//   }
// })

// movements.sort((a, b) => b - a);

// console.log(movements);


// const arrr = new Array(7);


// arrr.fill(2, 3, 7);

// console.log(arrr);


labelBalance.addEventListener('click', function () {
  const movementUI = Array.from(document.querySelectorAll('.movements__value'), el => Number(el.textContent.replace('€', '')));

  console.log(movementUI);
  const movementUI2 = [...document.querySelectorAll('.movements__value')];
  // console.log(movementUI2[2].textContent);
});

const totalDepositOverAll = accounts.map(acc => acc.movements).flat().filter(movs => movs > 0).reduce((acc, movs) => acc + movs, 0);

// console.log(totalDepositOverAll);


// const DepositNum1000 = accounts.map(acc => acc.movements).flat().filter(movs => movs >= 1000).length;

// With Reduce

const DepositNum1000 = accounts.map(acc => acc.movements).flat().reduce((count, cur) => cur >= 1000 ? ++count : count, 0);


// console.log(DepositNum1000);

const sums = accounts.map(acc => acc.movements).flat().reduce((sums, cur) => {
  cur > 0 ? sums.deposits += cur : sums.withdrawal += Math.abs(cur);
  return sums;

}, { deposits: 0, withdrawal: 0 });

// console.log(sums);


//Titlecase

const convertTitleCase = function (title) {
  const exceptions = ['a', 'am', 'the', 'with', 'but', 'or', 'on', 'in'];

  const titleCase = title.toLowerCase().split(' ').map(cur => {
    // console.log(cur.replace(cur[0], cur[0].toUpperCase()));
    return exceptions.includes(cur) ? cur : cur.replace(cur[0], cur[0].toUpperCase());
    // console.log(cur[0].toUpperCase());
    // console.log(exceptions.includes(cur));
  }).join(' ');


  return titleCase.replace(titleCase[0], titleCase[0].toUpperCase());

}

// console.log(convertTitleCase('this is with police officer'));

// console.log(convertTitleCase("i am with an officer in my choice"));

// console.log(convertTitleCase("am with an officer of my choice but he is rude on my decison or my behaviour"));


// const randomInt = (min, max) => Math.trunc(Math.random() * ((max - min) + 1) + min);

// console.log(randomInt(1, 10));


labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach((row, idx) => {
    if (idx % 2 == 0) {
      row.style.background = 'linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)';
    }
    // if (idx % 3 == 0) {
    //   row.style.background = 'linear-gradient(to right top, #87d16b, #87d573, #86da7c, #86de84, #86e28c, #84e58c, #82e98c, #80ec8c, #7cf082, #78f478, #76f76c, #74fb5f)';
    // } else {
    //   row.style.background = 'linear-gradient(to right top, #6ba5d1, #86a0d6, #a499d3, #c091c8, #d78ab5, #ea8ba0, #f29389, #ef9f75, #e1b86b, #c4d177, #9be89c, #5ffbd3)';
    // }
  })
})


// console.log(2 ** 53 - 1)
// console.log(Number.MAX_SAFE_INTEGER);
// console.log(2 ** 53 + 4);


const now = new Date();
console.log(now);

const future = new Date(2037, 10, 19, 15, 23, 59);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.toISOString());
console.log(future.toDateString());

const strdate = future.toDateString();

// console.log(future.now());

// const timestamp = Date.now();

// console.log(Date(timestamp));

// console.log(+now);

// console.log(new Date(now));


const calcDaysPassed = (date1, date2) => Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14, 23, 32));

console.log(days1);

// const options = {
//   hour: '2-digit',
//   minute: '2-digit',
//   day: "2-digit",
//   month: 'long',
//   year: 'numeric',
//   weekday: 'short'
// }

// console.log(new Intl.DateTimeFormat('hi-IN', options).format(now))

// const locale = navigator.language;

// console.log(locale);

const nums = 223223232.32;

const optionsCur = {
  style: 'currency',
  unit: 'mile-per-hour',
  currency: 'INR',
  // useGrouping: false
}

console.log(new Intl.NumberFormat('hi-IN', optionsCur).format(nums));


// console.log(setTimeout(() => console.log("your pizza is hare 🍕"), 3000));


// const ingredients = ['olives', 's'];

// const pizzaTimer = setTimeout((ing1, ing2) =>
//   console.log(`your pizza is here with ${ing1} and ${ing2}`), 3000, ...ingredients
// );

// if (ingredients.includes('spinach')) {
//   clearTimeout(pizzaTimer);
// }


// setInterval(function () {
//   const now = new Date();
//   const curHours = now.getHours();
//   const curSeconds = `${now.getSeconds()}`.padStart(2, 0);
//   const curMinutes = `${now.getMinutes()}`.padStart(2, 0);
//   console.log(`Time is : ${curHours}:${curMinutes}:${curSeconds}`);
// }, 1000);


console.log(timer);