// Create variables targetting the relevant DOM elements here 👇
var randButton = document.querySelector('.random-cover-button');
var imageCover = document.querySelector('.cover-image');
var bookTitle = document.querySelector('.cover-title');
var tagline1 = document.querySelector('.tagline-1');
var tagline2 = document.querySelector('.tagline-2');

// We've provided a few variables below
var savedCovers = [
  createCover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];
var currentCover;

// Add your event listeners here 👇
randButton.addEventListener('click', generateNewCover);

// Create your event handlers and other functions here 👇
function generateNewTitle() {
  var index = getRandomIndex(titles);
  
  bookTitle.innerText = titles[index];
}

function generateNewTagline() {
  var index1 = getRandomIndex(titles);
  var index2 = getRandomIndex(titles);
  
  if (index2 === index1) {
    if (index1 === descriptors.length - 1) {
      index2 = 0;
    } else {
      index2 = index1 + 1;
    }
  }
  
  tagline1.innerText = descriptors[index1];
  tagline2.innerText = descriptors[index2];
}

function generateNewCover() {
  var index = getRandomIndex(covers);

  imageCover.src = covers[index];
  generateNewTitle();
  generateNewTagline();
}

// Starting conditions 
generateNewCover();
generateNewTitle();
generateNewTagline();

// We've provided two functions to get you started
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function createCover(imgSrc, title, descriptor1, descriptor2) {
  var cover = {
    id: Date.now(),
    coverImg: imgSrc,
    title: title,
    tagline1: descriptor1,
    tagline2: descriptor2
  }
  return cover
}
