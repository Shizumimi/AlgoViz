/* function getValues(){
  let text = document.getElementById('values').value;
  
  var values = text.split(' ');
  values = values.map(Number);
  console.log(values);
} */

let values = [5,7,6,8,3,1];
let i = 0;
let j = 0;
let sorted = false;
let paused = true;

function setup() {
  let canvas = createCanvas(600, 200).parent('sketch');
  frameRate(1);
  /* for test */
  /* canvas.parent('sketch'); */
  /* noloop(); */
  /* for test */
}

/* deleted */
/* function getValues(){
  let text = document.getElementById('values').value;
  let text_array = text.split(' ');
  values = text_array.map(Number);
} */
/* deleted */

function draw() {
  background(220);
  displayCircles(); 
  if (!sorted && !paused) {
    if (i < values.length) {
      if (j < values.length - i - 1) {
        highlightCircle(j+1);
        if (values[j] > values[j + 1]) {
          let temp = values[j];
          values[j] = values[j + 1];
          values[j + 1] = temp;
          highlightCircles(j, j+1);
        }
        j++;
      } else {
        j = 0;
        i++;
      }
    } else {
      sorted = true;
    }
    /* if(paused){
      noLoop();
    } */
  }
}



function startSort(){
  paused = false;
  loop();
}

function pauseSort(){
  paused = true;
  noLoop();
}

function resetSort() {
  sorting = false;
  pauseSort();
  i = 0;
  j = 0;
}

function displayCircles() {
  for (let k = 0; k < values.length; k++) {
    let x = map(k, 0, values.length, 50, width - 50);
    let y = height / 2;
    fill(100, 150, 250);
    ellipse(x, y, 40, 40);
    fill(0);
    textAlign(CENTER, CENTER);
    text(values[k], x, y);
    if(j == 0){

    }else{
      if (j < values.length - i - 1) {
        highlightCircle(j+1);
        if (values[j] > values[j + 1]) {
          highlightCircles(j, j+1);
        }
      }
    }
  }
} 

function highlightCircle(index) {
  let x = map(index, 0, values.length, 50, width - 50);
  let y = height / 2;
  
  fill(255, 0, 0);
  ellipse(x, y, 40, 40);
  fill(0);
  text(values[index], x, y);
}

function highlightCircles(index1, index2) {
  let x1 = map(index1, 0, values.length, 50, width - 50);
  let x2 = map(index2, 0, values.length, 50, width - 50);
  let y = height / 2;
  
  fill(255, 0, 0);
  ellipse(x1, y, 40, 40);
  fill(0);
  text(values[index1], x1, y);
  
  fill(255, 0, 255);
  ellipse(x2, y, 40, 40);
  fill(0);
  text(values[index2], x2, y);
}

function getArray() {
  let code = document.getElementById('codeInput').value;
  let arrayMatch = code.match(/int arr\[\] = {([^}]+)}/);
  if (arrayMatch) {
      values = arrayMatch[1].split(',').map(Number);
  }

  let sortMatch = code.match(/for \(i = 0; i < n-1; i\+\+\) {([\s\S]+?)}\s*}/);
  if (sortMatch) {
      let steps = sortMatch[1].split('\n').map(line => line.trim());
      steps.forEach(step => {
          if (step.includes('arr[j] > arr[j+1]')) {
              let temp = values[j];
              values[j] = values[j + 1];
              values[j + 1] = temp;
          }
      });
  }
}
