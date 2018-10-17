// В силу наличия в JavaScript возможности переопределять состояние и поведение объектов почти в любой момент, нижеследующий набор конструкторов по сути
// "довешивает" нужные свойства и методы

// Функция-конструктор - создает для массива элемент с заданным числом и полем для ссылки на визуальный элемент
function digitElement(val){
   this.value = val;
   this.visualElement = null;
}

// Метод сравнения  - по убыванию
function swapLesser(withWhat){
   return (this.value < withWhat);
}

// Метод сравнения - по возрастанию
function swapBigger(withWhat){
   return (this.value > withWhat);
}

// Дополнительный конструктор - снабжает элементы массива полями с указателями и счетчиком обхода для организации и дальнейшего обхода дерева
function equipTreeGear(digElement){
   digElement.leftBranch = null;
   digElement.rightBranch = null;
   digElement.cstate = 0;
}

// Снабжает каждый объект массива методом сравнения в зависимости от направления сортировки;
// Впоследствии необходимость перестановки будет определяться путем опроса самого элемента;
function setupSwapOrder(na, sOrder){
   var compareMethod = null;
   var lc = 0;
   if (sOrder == 0){
      compareMethod = swapBigger;
   }
   else {
      compareMethod = swapLesser;
   }
   for (lc = 0; lc < na.length; lc++){
      na[lc].needSwap = compareMethod;
      na[lc].needSwap.bind(na[lc]);
   }
}

// Общая функция докомплектации объектов в зависимости от алгоритма сортировки;
function setupSortingGear(na, sAlg){
   if (sAlg == 1){
      var lc = 0;
      for (lc = 0; lc < na.length; lc++){
         equipTreeGear(na[lc]);
      }
   }
}