const dataBase = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
  "furniture",
  "tops",
  "womens-dresses",
  "womens-shoes",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "womens-watches",
  "womens-bags",
  "womens-jewellery",
  "sunglasses",
  "automotive",
  "motorcycle",
  "lighting",
];
var wordList = [];
var wordList2 = [];
var loadPage2 = false;
var originalIndex = [];
const headingButton1 = document.getElementById("heading-button-1");
const headingButton2 = document.getElementById("heading-button-2");
var indexTaken = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

window.onload = function () {
  console.log(window.location.href);
  window.location.href === "http://127.0.0.1:5500/page2.html"
    ? page2Setup()
    : indexSetup();
};

function indexSetup() {
  headingButton1.classList.add("border-b-2", "border-b-[#cdcece]");
  let i = 1;
  while (i < 13) {
    let index = Math.floor(Math.random() * 20);
    if (!indexTaken[index]) {
      wordList.push(dataBase[index]);
      indexTaken[index] = true;
      i++;
    }
  }
//   console.log(wordList);

  const gridContainer = document.getElementById("gridContainer");
  wordList.forEach((word, index) => {
    const button = document.createElement("button");
    button.className =
      "bg-[#222426] px-2 py-1 md:py-5 md:px-8 rounded-lg text-[#cdcece] text-xs md:text-lg ring-1 ring-[#cdcece] shadow-sm shadow-white";
    button.textContent = `${index + 1}. ${word}`;
    gridContainer.appendChild(button);
  });
}

function toggleActive(button) {
  if (button == headingButton1) {
    button.classList.add("border-b-2", "border-b-[#cdcece]");
    headingButton2.classList.remove("border-b-2", "border-b-[#cdcece]");
  } else {
    button.classList.add("border-b-2", "border-b-[#cdcece]");
    headingButton1.classList.remove("border-b-2", "border-b-[#cdcece]");
  }
}

function page2Setup() {
  let i = 1;
  indexTaken = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  wordList = JSON.parse(localStorage.getItem("wordList"));
  while (i < 13) {
    let index = Math.floor(Math.random() * 12);
    if (!indexTaken[index]) {
      wordList2.push(wordList[index]);
      originalIndex.push(index);
      indexTaken[index] = true;
      i++;
    }
  }
  localStorage.setItem('wordList2',JSON.stringify(wordList2))
  localStorage.setItem('originalIndex',JSON.stringify(originalIndex))

  const gridContainer = document.getElementById("gridContainer");
  wordList2.forEach((word, index) => {
    const button = document.createElement("button");
    button.className =
      "relative bg-[#222426] px-1 py-1 md:py-5 md:px-8 rounded-lg text-[#cdcece] text-xs md:text-lg ring-1 ring-[#cdcece] shadow-sm shadow-white";
    button.value = word
    button.id = `button-${index+1}`
    button.onclick = function(event) {handleClick(event)}
    button.innerHTML = `${word}<span id=${index+1} class="absolute flex justify-center items-center top-[-4px] right-[-4px] md:top-[4px] md:right-[4px] bg-[#6e6c6c] w-[10px] h-[10px] md:w-[20px] md:h-[20px] rounded-full shadow-sm shadow-white" style="visibility: hidden;" onclick="handleCancel(event)">x</span>`
    gridContainer.appendChild(button);
  });
}

function changePage() {
  const wl = JSON.stringify(wordList);
  localStorage.setItem("wordList", wl);
  window.location.href = "page2.html";
}
