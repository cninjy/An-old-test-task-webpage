// Модуль чейнинга анимации - служит дя организации последовательного проигрывания анимации средствами JQuery

// Очередь последовательно выполняемых анимационных эффектов
var myAnimQueue = new Array();
// Флаг проигрывания анимации; 
// Когда проигрывание завершено - сбрасывается;
var animationInProgress = false;
// Флаг отсрочки анимации;
// Если сброшен - очередь заполняется, но анимаций не играет;
var animationsEnabled = false;

var dummyAnimationEndCallBack = function(){
   return true;
}

// Присвоимая функция для запуска после опустошения очереди анимации
var animationQueueEndSingleCallBack = function(){
   return true;
}

// Цикл передачи в JQuery следующей анимации для проигрывания
function animationLookOut(){
   if ((animationInProgress == false) && (animationsEnabled == true) && (myAnimQueue.length != 0)){
      var cA = null;
      animationInProgress = true;
      cA = myAnimQueue.shift();
      $(cA.dE).animate(cA.aP, cA.aO);
      if (myAnimQueue.length == 0) {
         animationQueueEndSingleCallBack();
         animationQueueEndSingleCallBack = dummyAnimationEndCallBack;
      }
   }
}

// Добавляет анимационный эффект в очередь;
// На вход подаются анимируемый элемент (нативный DOM), параметры для $.Animate
function addToAnimQueue(domElement, animProperties, animOptions){
   var qUnit = {};
   qUnit.dE = domElement;
   qUnit.aP = animProperties;
   qUnit.aO = animOptions;
   qUnit.aO.complete = animFinishedCallBack;
   myAnimQueue.push(qUnit);
}

// Создает в очереди анимации задержку в миллисекундах
function addToAnimQueuePause(timeToDelay){
   var slowDummy = $('<DIV class="dummy"></DIV>');
   document.body.appendChild(slowDummy[0]);
   addToAnimQueue(slowDummy, {"left" : 0}, {"duration" : timeToDelay});
}

// Досрочно завершить очередь анимаций
function haltAnimation(){
   if (myAnimQueue.length > 0) {
      myAnimQueue.length = 1;   
   }
}

// Функция-колбэк, сбрасывает флаг анимации, разрешая двигаться следующему элементу в очереди
function animFinishedCallBack(){
   animationInProgress = false;
}

// Инициализация - запускает цикл мониторинга очереди
function initAnim() {
   setInterval(animationLookOut, 5);
}