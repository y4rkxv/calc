let a = '';
let b = '';
let sign = '';
let finish = false;

const digital = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ','];
const action = ['-', '+', 'x', '/'];
const out = document.querySelector('.calc__screen p');

function updateScreen() {
  out.textContent = `${a}${sign}${b}`;

  if (out.textContent === '') out.textContent = '0';
}

function clearAll() {
  a = '';
  b = '';
  sign = '';
  finish = false;
  updateScreen();
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.calc__btn').onclick = event => {
  if (!event.target.classList.contains('btn')) return;
  if (event.target.classList.contains('ac')) return;

  const key = event.target.textContent;

  // Кнопка C (Backspace)
  if (key === 'C') {
    if (b === '' && sign === '') {
      a = a.toString().slice(0, -1);
    } else if (b !== '') {
      b = b.toString().slice(0, -1);
    } else {
      sign = '';
    }
    updateScreen();
    return;
  }

  // Зміна знаку +/-
  if (key === '+/-') {
    if (b === '' && sign === '') {
      a = (a.replace(',', '.') * -1).toString().replace('.', ',');
    } else {
      b = (b.replace(',', '.') * -1).toString().replace('.', ',');
    }
    updateScreen();
    return;
  }

  // Відсоток %
  if (key === '%') {
    if (b === '' && sign === '') {
      a = (a.replace(',', '.') / 100).toString().replace('.', ',');
    } else {
      b = (b.replace(',', '.') / 100).toString().replace('.', ',');
    }
    updateScreen();
    return;
  }

  // Введення цифр та коми
  if (digital.includes(key)) {
    if (sign === '') {
      if ((a === '' || a === '0') && key !== ',') {
        a = key;
      } else {
        if (key === ',' && a.includes(',')) return;
        a += key;
      }
    } else {
      if ((b === '' || b === '0') && key !== ',') {
        b = key;
      } else {
        if (key === ',' && b.includes(',')) return;
        b += key;
      }
    }
    updateScreen();
    return;
  }

  // Вибір дії
  if (action.includes(key)) {
    if (a === '') a = '0';
    sign = key;
    updateScreen();
    return;
  }

  // Обчислення (=)
  if (key === '=') {
    if (b === '') b = a;

    let numA = parseFloat(a.replace(',', '.'));
    let numB = parseFloat(b.replace(',', '.'));
    let result;

    switch (sign) {
      case '+':
        result = numA + numB;
        break;
      case '-':
        result = numA - numB;
        break;
      case 'x':
        result = numA * numB;
        break;
      case '/':
        if (numB === 0) {
          out.textContent = 'Error';
          a = '';
          b = '';
          sign = '';
          return;
        }
        result = numA / numB;
        break;
    }

    finish = true;

    a = result.toString().replace('.', ',');
    b = '';
    sign = '';
    updateScreen();
  }
};
