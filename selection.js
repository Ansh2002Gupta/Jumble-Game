var targetIndex1 = -1
var targetIndex2 = -1
var targetIndex3 = -1
wordList2 = JSON.parse(localStorage.getItem("wordList2"));
originalIndex = JSON.parse(localStorage.getItem("originalIndex"))
var buttonWordMatch = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
var score = 0;
targetIndex1 = Math.floor(Math.random()*12)+1
do{
    targetIndex2 = Math.floor(Math.random()*12)+1
}
while(targetIndex2 === targetIndex1);
do{
    targetIndex3 = Math.floor(Math.random()*12)+1
}
while(targetIndex3 === targetIndex1 || targetIndex3 === targetIndex2);
var word1 = document.getElementById("word_1");
var word2 = document.getElementById("word_2");
var word3 = document.getElementById("word_3");
var wordSen1 = "";
var wordSen2 = "";
var wordSen3 = "";
if(targetIndex1 == 1)
    wordSen1 = "1st Word"
else if(targetIndex1 == 2)
    wordSen1 = "2nd Word"
else if(targetIndex1 == 3)
    wordSen1 = "3rd Word"
else wordSen1 = `${targetIndex1}th Word`

word1.textContent = wordSen1

if(targetIndex2 == 1)
    wordSen2 = "1st Word"
else if(targetIndex2 == 2)
    wordSen2 = "2nd Word"
else if(targetIndex2 == 3)
    wordSen2 = "3rd Word"
else wordSen2 = `${targetIndex2}th Word`

word2.textContent = wordSen2

if(targetIndex3 == 1)
    wordSen3 = "1st Word"
else if(targetIndex3 == 2)
    wordSen3= "2nd Word"
else if(targetIndex3 == 3)
    wordSen3 = "3rd Word"
else wordSen3 = `${targetIndex3}th Word`


word3.textContent = wordSen3

function handleClick(event) {
  const value = event.target.value;
  if (value !== "has been clicked!") {
    if (
      word1.value !== undefined &&
      word2.value !== undefined &&
      word3.value !== undefined
    ) {
      alert("No more selections allowed!");
      return;
    }

    event.target.classList.add("ring-[#b27322]", "ring-2");
    event.target.value = "has been clicked!";
    const id = event.target.id.substring(event.target.id.indexOf("-") + 1);
    console.log("cross id:", id);
    document.getElementById(id).style.visibility = "visible";

    if (word1.value == undefined) {
      word1.value = value;
      word1.innerHTML = value;
      buttonWordMatch[+id - 1] = 1;
      score += originalIndex[+id-1]+1 == targetIndex1
    } else if (word2.value == undefined) {
      word2.value = value;
      word2.innerHTML = value;
      buttonWordMatch[+id - 1] = 2;
      score += originalIndex[+id-1]+1 == targetIndex2
    } else {
      word3.value = value;
      word3.innerHTML = value;
      buttonWordMatch[+id - 1] = 3;
      score += originalIndex[+id-1]+1 == targetIndex3
    }
    console.log(score)
  }
}

function handleCancel(event) {
  event.stopPropagation();
  const cross = event.target;
  cross.style.visibility = "hidden";
  const button = document.getElementById(`button-${cross.id}`);
  button.classList.remove("ring-[#b27322]", "ring-2");
  button.value = wordList2[+cross.id - 1];
  console.log("reset button:", button);
  if (buttonWordMatch[+cross.id - 1] == 3) {
    word3.value = undefined;
    word3.textContent = wordSen3;
    buttonWordMatch[+cross.id - 1] = -1;
    score -= originalIndex[+cross.id-1]+1 == targetIndex3
  } else if (buttonWordMatch[+cross.id - 1] == 2) {
    word2.value = undefined;
    word2.textContent = wordSen2;
    buttonWordMatch[+cross.id - 1] = -1;
    score -= originalIndex[+cross.id-1]+1 == targetIndex2
  } else {
    word1.value = undefined;
    word1.textContent = wordSen1;
    buttonWordMatch[+cross.id - 1] = -1;
    score -= originalIndex[+cross.id-1]+1 == targetIndex1
  }
  console.log(score)
}

function verdict(){
    const msg = document.getElementById('message')
    setTimeout(()=>{
        msg.innerHTML = `Congratulations! You remembered ${score} out of 3 words`
    },1000)
    setTimeout(()=>{
        msg.innerHTML = ``
    },4000)
}
