(function() {

////Темная тема//наработка
    // function switchDark(){
    //     var x = document.querySelectorAll("li");
    //     for (let i = 0; i < x.length; i++) {
    //     x[i].style.backgroundColor = "#3e3e3e";
    //     }
    //     var pp = document.querySelectorAll("p");
    //     for (let i = 0; i < x.length; i++) {
    //     pp[i].style.color = "#fff";
    //     }
    //     document.body.style.backgroundColor = '#202020';
    //     document.body.style.color = '#fff';
    // }
    // function darkThemedButton() {
    //     const body = document.querySelector('body');
    //     const buttonDiv = document.createElement('div');
    //     const darkButton = document.createElement('button');
    //     buttonDiv.classList.add('input-group-append');
    //     darkButton.classList.add('btn')
    //     darkButton.textContent = 'DT';
    //     buttonDiv.append(darkButton);
    //     return {
    //         buttonDiv,
    //         darkButton,
    //         body
    //     }
    // };

//Функии касаемые local stoarge
//функция для сохранения данных в локал сторж в виде строки
    function setItem(key, value) {
        // Преобразование объекта в строку
        const valueToStore = typeof value === 'object' ? JSON.stringify(value) : value;
        localStorage.setItem(key, valueToStore);
    }

//функция для получения данных из локал сторж
    function getItem(key) {
        const value = localStorage.getItem(key);
        // Если значение найдено, парсим его обратно в объект, иначе возвращаем null
        return value ? JSON.parse(value) : [];
    }

//функция создания айди
    function generateUniqueId() {
        return Date.now();//создает айди - дату
    }

//Функции создания самого списка:
//функция создания заголовка списка дел
    function createAppTitle(title) {
        const appTitle = document.createElement('h2');//создает элемент "заголовок 2 уровня"
        appTitle.textContent = title;//возвращает его в переменную
        return appTitle;//возвращает перменную с заголовком(вернее сам заголовок)
    }

//функция создания формы ввода и кнопок
    function createTodoItemForm() {
        const form = document.createElement('form');//создает форму
        const input = document.createElement('input');//создает строку ввода
        const buttonWrapper = document.createElement('div');//создает див
        const button = document.createElement('button');//создает кнопку

        //Стилизация
        form.classList.add('input-group', 'mb-3');//добавляем класс к форме
        input.classList.add('form-control');//добавляем класс к строке ввода
        buttonWrapper.classList.add('input-group-append');//добавляем класс к диву
        button.classList.add('btn', 'btn-primary');//добавляем класс к кнопке
        
        //Текста и прочее
        input.ariaPlaceholder = 'Введите название дела';//добавляем предписку(у меня не работает почему то xdddd)
        button.textContent = 'Добавить дело';//добавляем текст в кнопку
        
        //вложения
        buttonWrapper.append(button);//вкладываем в див кнопку
        form.append(input, buttonWrapper);//вкладываем в форму, строку ввода
        //вкладываем в форму, див внутри которого кнопка

        return {//возвращаем итоговые значение
            form,
            input,
            button,
        };
    }

//функция создания списка ul, в который будут вкладываться дела
    function createTodoList() {
        const list = document.createElement('ul');//создаем список
        list.classList.add('list-group');//добавляем класс для списка
        return list;//возвращаем список
    }

//Функция создания дел списка
    function createTodoItem(todo) {
        const item = document.createElement('li');//создает элемент списка
        const buttonGroup = document.createElement('div');//создает див
        const doneButton = document.createElement('button');//создает первую кнопку
        const deleteButton = document.createElement('button');//создает втору кнопку
        const textItem = document.createElement('p');//Название дела

        //Стилизация
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');//классы для элемента списка1
        if (todo.done) {//если тру то выполнить
            item.classList.add('list-group-item-success'); 
        }
        textItem.classList.add('p-todo')
        buttonGroup.classList.add('btn-group', 'btn-group-sm');//стили дива
        doneButton.classList.add('btn', 'btn-success');//стили первой кнопки
        deleteButton.classList.add('btn', 'btn-danger');//стили второй кнопки

        //Текста и прочее
        textItem.textContent = todo.name;//создаст в элементе списка текст заданный в значении функции
        doneButton.textContent = 'Готово';//текст первой кнопки
        deleteButton.textContent = 'Удалить';//текст второй кнопки

        //Вложения
        buttonGroup.append(doneButton, deleteButton);//добавляем первую кнопку в див
        //добавляем вторую кнопку в див
        item.append(textItem, buttonGroup);//добавляем див с кнопками в элемент

        return {//возвращаем значения
            item,
            doneButton,
            deleteButton,
        };
    }

//функция для кнопки с disabled
    function checkInput(todoItemForm) {
        todoItemForm.button.disabled = true;//Делает кнопку создания дела не кликабельной по умолчанию
        todoItemForm.form.addEventListener('input', function(){//ивент проверяющий поле ввода на символы.
            todoItemForm.button.disabled = !todoItemForm.input.value.trim();//условие присваивающее значение фэлс или тру взависимости от того, есть ли в форме символы.
        });
    }

//Функция удаления дела из массива и из html
    function removeItem(arrayTodo, itemId) {
        // Удаляем объект из массива 
        const index = arrayTodo.findIndex((item) => item.id === itemId);//записывает переменной айди которого равен заданному в функцию айди
        console.log("index", index);//пишет его
        if (index !== -1) {
            arrayTodo.splice(index, 1);//удаляет объеки из массива, по ранее найденому айди
        }
    }

//Функция переключения статуса у объекта массива
    function doneItem(arrayTodo, itemId) {
        const objToUpdate = arrayTodo.find(obj => obj.id === itemId);//записывает переменной айди которого равен заданному в функцию айди
        if (objToUpdate) {
            objToUpdate.done = !objToUpdate.done;
        }
    }

//функция создающая все описанное выше в файл html, и это все создается сразу по загрузке сайта
    function createTodoApp (container, title = 'список дел'){
        const todoAppTitle = createAppTitle(title);//возвращает заголовок данный в название функции
        const todoItemForm = createTodoItemForm();//возвращает форму ввода с кнопкой
        checkInput(todoItemForm);//вызывает сразу после создания перменной функцию по отключению кнопки
        const todolist = createTodoList();//возвращает список
        // const TodoDark = DarkThemedButton();//для темной темы
        
        //Ивент клика на кнопку.
        // TodoDark.darkButton.addEventListener('click', function() {
        //     switchDark()
        // });

        //Добавление элементов в контейнир html файла
        // container.append(TodoDark.buttonDiv);////добавляет в контейнер кнопку включения темной темы
        container.append(todoAppTitle, todoItemForm.form, todolist);//добавляет в контейнет заголовок

        const arrayTodo = getItem(title);

        //Цикл создания дел из массива с делами.
        arrayTodo.forEach((todo) => {
                const todoItem = createTodoItem(todo);
                //функция клика на первую кнопку
                todoItem.doneButton.addEventListener('click', function() {
                    todoItem.item.classList.toggle('list-group-item-success');
                    doneItem(arrayTodo, todo.id);
                    setItem(title, arrayTodo)
                });
                //функция клика на вторую кнопку
                todoItem.deleteButton.addEventListener('click', function() {
                    if (confirm("Вы уверены?")) {
                        todoItem.item.remove();
                        removeItem(arrayTodo, todo.id);
                        setItem(title, arrayTodo)
                    }
                });
                console.log('Загружено'),
                todolist.append(todoItem.item);
            }
        );

        //Ивент по нажатию кнопки создания дела или enter
        todoItemForm.form.addEventListener('submit', function(e) {
            e.preventDefault();// используется для отмены действия по умолчанию, что бы сайт не перенаправлял никуда

            if (!todoItemForm.input.value){//если пусто то не делает ничего
                return;
            }

            //объект с содержанием всего о списке дел.
            let object = {
                name: todoItemForm.input.value, //присваивает название из формы
                done: false, 
                id: generateUniqueId()
            };
            arrayTodo.push(object)

            let TodoItem = createTodoItem(object);//вызывает функцию с своим значением (из объекта)


            //функция клика на первую кнопку
            TodoItem.doneButton.addEventListener('click', function() {
                TodoItem.item.classList.toggle('list-group-item-success')//добавляет класс к элементу
                doneItem(arrayTodo, object.id)
                setItem(title, arrayTodo);
            });

            //функция клика на вторую кнопку
            TodoItem.deleteButton.addEventListener('click', function() {
                if (confirm("вы уверены?")) {//вызывает контекстное меню с надписью и если согласны то
                    //вызов функции по удалению объекта из массива
                    TodoItem.item.remove();//убирает элемент
                    removeItem(arrayTodo, object.id);
                    setItem(title, arrayTodo);
                }
            }
            );
            setItem;
            todolist.append(TodoItem.item);//присваивает элемент в список
            todoItemForm.input.value = '';//возвращает в форму пустоту
            console.log(arrayTodo);
            setItem(title, arrayTodo);
        });
    }


    window.createTodoApp = createTodoApp;//добавляем в виндовс нашу функцию
})();