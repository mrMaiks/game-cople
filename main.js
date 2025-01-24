(function() {
  // Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
  function createNumbersArray(count) {
    let array = [];
    for(let i = 1; i <= count; ++i){
        array.push(i)
        array.push(i)
    }
    return array;
  }

  // Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

  function shuffle(arr) {
    let newArr = [...arr];

    for (let i = newArr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }  

  // Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

  function startGame(count) {
    let gameNumberArr = createNumbersArray(count);
    let gameNumberShuffling = shuffle(gameNumberArr);
    return gameNumberShuffling;
  }

  // создаю функцию поиска формы из html в js

  function checkFormGame() {
    let formGameForm = document.querySelector('.game-form');
    let formGameButton = document.querySelector('.form__game-btn');
    let formGameInput = document.querySelector('.form__game-input');

    return {
      formGameForm, 
      formGameButton,
      formGameInput
    };
  }

  // Функция создания списка в html

  function createListCard() {
    const list = document.createElement('ul');
    list.classList.add('list-card');
    return list;
  }

  function clearGameField() {
    const cardList = document.querySelector('.list-card');
    if (cardList) {
      cardList.innerHTML = '';
    }
    cards = [];
    openCards = [];
    blockedCards = [];
  }

  // Функция создания карточек

  let openCards = [];
  let blockedCards = [];

  function createItemCard(number) {
    const item = document.createElement('li');
    item.id = `card-${number}`;
    item.classList.add('card-item', `card-${number}`);
    item.style.backgroundImage = 'url("img/card_body.jpg")';
    item.textContent = '';

    item.addEventListener('click', function() {
    if (openCards.length < 2 && !openCards.includes(item) && !blockedCards.includes(item)) {
      item.textContent = number;
      item.style.backgroundImage = 'url("img/open_card_body.jpg")';
      openCards.push(item);

      if (openCards.length === 2){
        const [card1, card2] = openCards;

        if (card1.textContent === card2.textContent) {
          blockedCards.push(card1);
          blockedCards.push(card2);
          openCards = [];
          console.log(blockedCards)
          if (blockedCards.length === cards.length) {
            if (confirm("Поздрваляем вы победили! Начать новую игру?")) {
              clearGameField()
              clearInterval(timerId);
            }
            else {
              clearGameField()
              clearInterval(timerId);
            }
          }
          
          // if (openCards.length == cards.length) { //<====ВОТ ТУТ
          // }
        }
        else {
          setTimeout(() => {
            card1.style.backgroundImage = 'url("img/card_body.jpg")';
            card2.style.backgroundImage = 'url("img/card_body.jpg")';
            card1.textContent = '';
            card2.textContent = '';
            openCards = [];
          }, 1000);
        }
      }
     }
    });

    return item;
  }

  //функция создания всего в html файл
  let cards = [];

  let timeLeft = 60; // Начальное значение таймера в секундах
  let timerId;
  
  const countdown = () => {
    if (timeLeft <= 0) {
      clearInterval(timerId);
      if (confirm("Вы проиграли. Начать новую игру?")) {
        clearGameField()
      }
      else {
        clearGameField()
      }
      document.querySelector('.timer').textContent = 'Время вышло!';
      // Здесь можно добавить логику завершения игры
      return;
    }
  
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    // Форматирование времени в формат MM:SS
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    document.querySelector('.timer').textContent = formattedTime;
    timeLeft--;
  };

  function startTimer() {
    timeLeft = 60; // Сброс таймера на 60 секунд
    clearInterval(timerId); // Очистка предыдущего интервала, если он был
    countdown(); // Немедленный вызов для отображения начального времени
    timerId = setInterval(countdown, 1000);
  }

  function createCardGame(container) {
    const cardList = createListCard();
    const formElements = checkFormGame();


    container.append(cardList)
    //ивент на проверку поля ввода

    formElements.formGameForm.addEventListener('submit', function(e) {
      e.preventDefault();

      if (!formElements.formGameInput.value){
        return;
      }

      cardList.innerHTML = '';


      cards = startGame(formElements.formGameInput.value)

      //цикл для каждого элемента массива

      cards.forEach((number) => {
        const card = createItemCard(number);
        cardList.append(card);
      })
      console.log(cards)

      startTimer()
    })
    container.append(cardList);
    formElements.formGameInput.value = '';
  }

  window.createCardApp = createCardGame;
})();