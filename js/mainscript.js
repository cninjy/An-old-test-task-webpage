// Основной скрипт. Здесь у нас будет основная процедура и то, что по теме пока не вошло в прочие модули

// Банальная функция получения случайного числа
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Функция колл-бэка на завершение всех анимаций
function enableByCallBack(){
   switchControls(true);
}

// Формирование последовательности случайных чисел заданной длины;
// Обращается к крипто-функциям браузера, если их нет - использует Math.Random;
// На вход подается ссылка на целевой массив и количество чисел;
function generateNumbers(na, qua){
// генератор случайных чисел браузера требует для работы типизированный массив;
// типизированные массивы лишены ряда методов массивов обычных, а потому делаем числа по одному
   var sourceNumbers = new Int8Array(1); 
   var localcounter = 0;
   for (localcounter = 0; localcounter < qua; localcounter++) {
      // Эта плохочитабельная строка получает случайное число одним из 2 способов
      cryptoRandomAvailable ? window.crypto.getRandomValues(sourceNumbers) : sourceNumbers[0] = getRandomInt(-125, 125);
      na.push(new digitElement(sourceNumbers[0]));
   }
}

// Обработчик для веб-формы, по идее не дающий ей перезагрузить страницу при submit
function doNotSubmit(){
   return false;
}

// Активация/деактивация элементов управления.
// Свойства children и childNodes могли быть использованы, но ведут себя не совсем предсказуемо
function switchControls(onOffSwitch){
   $("[name='quantity']")[0].disabled = !(onOffSwitch);
   $("[name='bgendigits']")[0].disabled = !(onOffSwitch);
   $("[name='engage']")[0].disabled = !(onOffSwitch);
   $("[name='sortmethod']")[0].disabled = !(onOffSwitch);
   $("[name='sortorder']")[0].disabled = !(onOffSwitch);
   $("[name='haste']")[0].disabled = (onOffSwitch);
}

// Обработчик для элементов управления, запускающих перегенерацию чисел;
function setActionGenerate(){
   if ($("[name='setupform']")[0].checkValidity()) {
      currentformAction = 0;
      executeAction();
   }
}

//Обработчик для элементов управления, запускающих сортировку;
function setActionSort(){
   currentformAction = 1;
   executeAction();
}

//Обработчик для элементов управления, прерывающих анимацию;
function setActionHaste(){
   currentformAction = 2;
   executeAction();
}

// Блок запуска сортировок и анимаций к ним;
// Кроме того, производит донастройку сортируемых элементов
function performAnimatedSorting(){
   
   setupSwapOrder(numbersArray, sortingOrderVariable);
   setupSortingGear(numbersArray, sortingAlgorithm);
   switch (sortingAlgorithm) {
      case "0":
         animationsEnabled = false;
         bubbleSort(numbersArray);
         animationsEnabled = true;
         break;
      case "1":
         organizeSortingTree(numbersArray);
         visualsArrangeInTree(numbersArray[0]);
         swapAccordingToTree(numbersArray);
         visualsArrangeInLine(numbersArray);
   }
}

// Блок запуска основных функций;
// Включает доп. подготовку;
function executeAction(){
   // Отключить элементы управления
   switchControls(false);
   switch (currentformAction) {
      case 0:
         // Удалить визуальные объекты с числами из веб-страницы
         deleteNumberVisuals(numbersArray);
         // Очистить рабочий массив с числами
         numbersArray.length = 0;
         // Заполнить массив случайными числами
         generateNumbers(numbersArray, $("[name='quantity']")[0].value);
         // Добавить в зону рисования визуальные элементы
         createNumberVisuals(numbersArray);
         // Построить визуальные элементы по порядку следования в рабочем массиве
         $("[name='haste']")[0].disabled = true;
         visualsArrangeInLine(numbersArray);
         break;
      case 1:
         // Выбор алгоритма и направления сортировки
         sortingAlgorithm = $("[name='sortmethod']")[0].value;
         sortingOrderVariable = $("[name='sortorder']")[0].value;
         // Проделать сортировку
         performAnimatedSorting();
         // Построить визуальные элементы по порядку следования в рабочем массиве
         //visualsArrangeInLine(numbersArray);
         break;
      case 2:
         haltAnimation();
         $("[name='haste']")[0].disabled = true;
         visualsArrangeInLine(numbersArray);
   }
   // Вернуть элементы управления
   animationQueueEndSingleCallBack = enableByCallBack;
}

// Инициализация - подключение обработчиков
function connectEvents(){
   $("[name='bgendigits']")[0].onclick = setActionGenerate;
   $("[name='engage']")[0].onclick = setActionSort;
   $("[name='haste']")[0].onclick = setActionHaste;
   $("[name='setupform']")[0].onsubmit = doNotSubmit;
}

// Обработчик инициализации - срабатывает при загрузке страницы
function initRoutine(){
   // Подключение обработчиков событий
   connectEvents();
   // Получение ссылки на DIV, где мы будем анимировать
   drawZone = $("#drawingzone")[0];
   // Инициализация подсистемы чейнинга анимации
   initAnim();
   cryptoRandomAvailable = ((typeof window.crypto.getRandomValues) === 'function');
}

// Рабочий массив объектов с числами, который мы заполняем и сортируем;
// Хотя лежит в глобале, во многие функции передается;
// Некритично - все составные типы и объекты в JavaScript передаются по ссылке;
var numbersArray = new Array();
// Выбранный вариант сортировки
var sortingAlgorithm = null;
// Выбранный порядок сортировки
var sortingOrderVariable = null;
// Выбранный для выполнения элемент функционала
var currentformAction = null;
var cryptoRandomAvailable = false;

// Установка процендуры запуска
window.onload = initRoutine;