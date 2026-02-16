let a = ''; //first number
let b = ''; //second number
let sign = ''; // operation
let finish = false;

const digital = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ','];

const action = ['-', '+', 'x', '/'];

//screen

const out = document.querySelector('.calc__screen p');

//clearALL

function clearAll() {
  a = ''; //first number
  b = ''; //second number
  sign = ''; // operation
  finish = false;
  out.textContent = 0;
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.calc__btn').onclick = event => {
  // a non-button element was pressed
  if (!event.target.classList.contains('btn')) return;
  //the AC (Clean All) button was clicked
  if (event.target.classList.contains('ac')) return;
  out.textContent = '';

  //getting the clicked button
  const key = event.target.textContent;

  //  +/-

  if (key === '+/-') {
    if (b === '' && sign === '') {
      a = (a * -1).toString();
      out.textContent = a;
    } else {
      b = (b * -1).toString();
      out.textContent = b;
    }
    return;
  }

  //  %

  if (key === '%') {
    if (b === '' && sign === '') {
      a = (a / 100).toString();
      out.textContent = a;
    } else {
      b = (b / 100).toString();
      out.textContent = b;
    }

    return;
  }

  // C <-
  if (key === 'C') {
    // або та назва, яка у тебе на кнопці
    if (b === '' && sign === '') {
      a = a.slice(0, -1);
      if (a === '') a = '0';
      out.textContent = a;
    } else {
      b = b.slice(0, -1);
      if (b === '') b = '0';
      out.textContent = b;
    }
    return;
  }

  //0-9 ,

  if (digital.includes(key)) {
    if (b === '' && sign === '') {
      a += key;
      console.log(a, b, sign);
      out.textContent = a;
    } else if (a !== '' && b !== '' && finish) {
      b = key;
      finish = false;
      out.textContent = b;
    } else {
      b += key;
      out.textContent = b;
    }
    console.log(a, b, sign);
    return;
  }

  // + - * /

  if (action.includes(key)) {
    sign = key;
    out.textContent = sign;
    console.log(a, b, sign);
    return;
  }

  // =

  if (key === '=') {
    if (b === '') b = a;
    switch (sign) {
      case '+':
        a = +a + +b;
        break;
      case '-':
        a = a - b;
        break;
      case 'x':
        a = a * b;
        break;
      case '/':
        if (b === '0') {
          out.textContent = 'Error';
          a = '';
          b = '';
          sign = '';
          return;
        }

        a = a / b;
        break;
    }
    finish = true;
    out.textContent = a;
    console.log(a, b, sign);
  }
};
