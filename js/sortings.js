// Реализация алгоритмов сортировки;

// Сортировка "пузырьком";
// Возвращает последовательность перестановок для сортировки, впоследствии используемую для анимации;
function bubbleSort(na){
   var lc = 0;
   var swaps = 0;
   var swapTh = null;
   do {
      swaps = 0;
      for (lc = 0; lc < na.length; lc++){
         if ((lc + 1) < na.length) {
            if (na[lc].needSwap(na[lc + 1].value)){
               visualSwap(na, lc);
               swapTh = na[lc];
               na[lc] = na[lc + 1];
               na[lc + 1] = swapTh;
               swaps++;
            }
         }
      }
   }
   while (swaps != 0);
}

// Выполняет последовательность перестановок в массиве
function performSwaps(na, sa){
   var lc = 0;
   var st = null;
   for (lc = 0; lc < sa.length; lc++){
      st = na[sa[lc]];
      na[sa[lc]] = na[sa[lc] + 1];
      na[sa[lc] + 1] = st;
   }
}

// Сортировка бинарным деревом - часть 1;
// Снабжает элементы массива указателями, организуя их в дерево;
// Первый элемент всегда - корень;
function organizeSortingTree(na){
   var seekPointer = null;
   var rootPointer = null;
   var lc = 0;
   var seekStop = false;
   if (na.length != 0) {
      rootPointer = na[0];
      for (lc = 1; lc < na.length; lc++){
         seekPointer = rootPointer;
         seekStop = false;
         do {
            if (na[lc].needSwap(seekPointer.value)){
               if (seekPointer.rightBranch != null) {
                  seekPointer = seekPointer.rightBranch;
               } 
               else {
                  seekPointer.rightBranch = na[lc];
                  seekStop = true;
               }   
            }
            else {
               if (seekPointer.leftBranch != null) {
                  seekPointer = seekPointer.leftBranch;
               } 
               else {
                  seekPointer.leftBranch = na[lc];
                  seekStop = true;
               }               
            }
         }
         while (!seekStop);
      }
   }
}

// Перестраивает последовательность элементов в массиве в соответствии с организованным в них деревом;
// Первый элемент массива - корень;
// Выстраивает элементы в искомом порядке с конца массива, а исходную последовательность - удаляет;
function swapAccordingToTree(na){
   var kSt = new Array();
   var thePointer = null;
   var aL = 0;
   var lc = 0;
   if (na.length != 0){
      aL = na.length;
      thePointer = na[0];
      thePointer.cstate = 0;
      do {
         switch(thePointer.cstate) {
            case 0:
               thePointer.cstate++;
               if (thePointer.leftBranch != null){
                  kSt.push(thePointer);
                  thePointer = thePointer.leftBranch;
                  thePointer.cstate = 0;
               }
               break;
            case 1:
               thePointer.cstate++;
               na.push(thePointer);
               if (thePointer.rightBranch != null){
                  kSt.push(thePointer);
                  thePointer = thePointer.rightBranch;
                  thePointer.cstate = 0;
               }
               break;
            case 2:
               if (kSt.length != 0) {
                  thePointer = kSt.pop();
               }
         }
      }   
      while ((kSt.length != 0) || (thePointer.cstate < 2));
      for (lc = 0;lc < aL; lc++){
         na.shift();
      }
   }   
}