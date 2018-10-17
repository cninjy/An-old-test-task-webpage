// Модуль анимаций - реализация CSS-анимации элементов на странице через JQuery

// Указатель на DIV для рисования
var drawZone = null;

// Уничтожает визуальные ипостаси сортируемых элементов
function deleteNumberVisuals(na){
   var lc = 0;
   for (lc = 0; lc < na.length; lc++) {
      $(na[lc].visualElement).remove();
   }
}

// Средствами JQuery создает визуальные составляющие сортируемых объектов для последующей их анимации;
// Вновь созданные элементы помещают в набор потомков зоны рисования
function createNumberVisuals(na){
   var lc = 0;
   var newVisual = null;
   for (lc = 0; lc < na.length; lc++) {
      newVisual = $('<DIV class="digitobject">' + na[lc].value + "</DIV>")[0];
      drawZone.appendChild(newVisual);
      na[lc].visualElement = newVisual;
   }
}

// Получение визуальной позиции элемента для основного построения в зависимости от позиции в последовательности
function getInLineX(pO){
   return (40 + (pO - Math.floor(pO / 10) * 10) * 40);
}

function getInLineY(pO){
   return (40 + Math.floor(pO / 10) * 40);
}

// Заставляет визуальные элементы выстроиться по порядку следования в массиве, горизонтальными шеренгами по 10 штук
function visualsArrangeInLine(na){
   var lc = 0;
   var targetX = 0;
   var targetY = 0;
   var vE = null;
   animationsEnabled = false;
   for (lc = 0; lc < na.length; lc++) {
      vE = na[lc].visualElement;
      targetX = getInLineX(lc);
      targetY = getInLineY(lc);
      addToAnimQueue(vE, {"left" : targetX, "top" : targetY}, {"duration" : 20});
   }
   animationsEnabled = true;
}

// Визуально проигрывает перестановки, произведенные в ходе сортировки "пузырьком"
function visualSwap(na, fI){
   var lc = 0;
   var targetX = 0;
   var targetY = 0;
   var targetX2 = 0;
   var targetY2 = 0;
   var vE = null;
   var vE2 = null;
   vE = na[fI].visualElement;
   vE2 = na[fI + 1].visualElement;
   targetX = getInLineX(fI);
   targetY = getInLineY(fI);
   targetX2 = getInLineX(fI + 1);
   targetY2 = getInLineY(fI + 1);
   addToAnimQueue(vE, {"left" : (targetX + 20), "top" : (targetY - 30)},{"duration" : "fast"});
   addToAnimQueue(vE2, {"left" : (targetX2 - 20), "top" : (targetY + 30)},{"duration" : "fast"});
   addToAnimQueue(vE2, {"left" : targetX, "top" : targetY},{"duration" : "fast"});
   addToAnimQueue(vE, {"left" : targetX2, "top" : targetY2},{"duration" : "fast"});
}



// Визуальные элементы разлетаются, группируясь в порядке своего положения в дереве;
// Дерево рисуется слева-направо, корень сверху, листья - снизу, первым взлетает самый левый элемент;
function visualsArrangeInTree(rootEl){
   var targetX = 10;
   var targetY = 40;
   var xShift = 40;
   var yShift = 40;
   var vE = null;
   sP = null;
   sT = new Array();
   if (rootEl != null){
      sP = rootEl;
      sP.cstate = 0;
      animationsEnabled = false;
      do
         switch(sP.cstate) {
            case 0:
               sP.cstate++;
               if (sP.leftBranch != null){
                  sT.push(sP);
                  sP = sP.leftBranch;
                  sP.cstate = 0;
                  targetY += xShift;
               }
               break;
            case 1:
               sP.cstate++;
               vE = sP.visualElement;
               addToAnimQueue(vE, {"left" : targetX, "top" : targetY},{"duration" : "fast"});;
               if (sP.rightBranch != null){
                  sT.push(sP);
                  sP = sP.rightBranch;
                  sP.cstate = 0;
                  targetY += xShift;
                  targetX += yShift;
               }
               break;
            case 2:
               if (sT.length != 0) {
                  sP = sT.pop();
               }
               targetY -= xShift;
               targetX += yShift;
         }
      while ((sT.length != 0) || (sP.cstate < 2));
      addToAnimQueuePause(3000);
      animationsEnabled = true;
   }
   
}