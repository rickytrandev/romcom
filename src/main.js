// Create variables targetting the relevant DOM elements here 👇
// BUTTONS
var randBtn = document.querySelector(".random-cover-button");
var saveBtn = document.querySelector(".save-cover-button");
var makeYourOwnBtn = document.querySelector(".make-new-button");
var viewCoversBtn = document.querySelector(".view-saved-button");
var saveCoverBtn = document.querySelector(".save-cover-button");
var homeBtn = document.querySelector(".home-button");
var newBookBtn = document.querySelector(".create-new-book-button");
// PAGES
var savedCoversView = document.querySelector(".saved-view");
var formView = document.querySelector(".form-view");
var homePage = document.querySelector(".home-view");
var savedCoversSection = document.querySelector(".saved-covers-section");
// BOOK PROPERTIES
var imageCover = document.querySelector(".cover-image");
var bookTitle = document.querySelector(".cover-title");
var tagline1 = document.querySelector(".tagline-1");
var tagline2 = document.querySelector(".tagline-2");
// FORM PROPERTIES
var formImg = document.querySelector(".user-cover");
var formTitle = document.querySelector(".user-title");
var formDescriptor1 = document.querySelector(".user-desc1");
var formDescriptor2 = document.querySelector(".user-desc2");

// We've provided a few variables below
var savedCovers = [];
var currentCover;

// Add your event listeners here 👇
randBtn.addEventListener("click", generateNewCover);
viewCoversBtn.addEventListener("click", viewSavedCovers);
homeBtn.addEventListener("click", returnToHome);
makeYourOwnBtn.addEventListener("click", showFormView);
newBookBtn.addEventListener("click", pushUserInput);
saveBtn.addEventListener("click", saveCover);
savedCoversSection.addEventListener("dblclick", deleteCover);

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
    tagline2: descriptor2,
  };
  return cover;
}

// Create your event handlers and other functions here 👇
function generateNewTitle() {
  return titles[getRandomIndex(titles)];
}

function generateNewTagline1() {
  return descriptors[getRandomIndex(descriptors)];
}

function generateNewTagline2() {
  var tagline2 = descriptors[getRandomIndex(descriptors)];
  while (tagline2 === generateNewTagline1())
    return descriptors[getRandomIndex(descriptors)];
  return tagline2;
}

function generateNewCover() {
  var index = getRandomIndex(covers);
  var currentCover = createCover(
    covers[index],
    generateNewTitle(),
    generateNewTagline1(),
    generateNewTagline2()
  );

  imageCover.src = currentCover.coverImg;
  bookTitle.innerText = currentCover.title;
  tagline1.innerText = currentCover.tagline1;
  tagline2.innerText = currentCover.tagline2;
}

function saveCover() {
  var isDuplicate = false;

  for (var i = 0; i < savedCovers.length; i++) {
    var cover = savedCovers[i];

    if (
      cover.coverImg === imageCover.src &&
      cover.title === bookTitle.innerText &&
      cover.tagline1 === tagline1.innerText &&
      cover.tagline2 === tagline2.innerText
    ) {
      isDuplicate = true;
    }
  }

  if (!isDuplicate) {
    savedCovers.push(
      createCover(
        imageCover.src,
        bookTitle.innerText,
        tagline1.innerText,
        tagline2.innerText
      )
    );
  }
}

function generateSavedCovers() {
  // clear out previous covers
  savedCoversSection.innerHTML = "";

  for (var i = 0; i < savedCovers.length; i++) {
    // create elements
    var div = document.createElement("div");
    var img = document.createElement("img");
    var h2 = document.createElement("h2");
    var h3 = document.createElement("h3");

    // give values to elements
    img.src = `${savedCovers[i].coverImg}`;
    h2.innerText = `${savedCovers[i].title}`;
    h3.innerText = `A tale of ${savedCovers[i].tagline1} and ${savedCovers[i].tagline2}`;

    // populate page
    savedCoversSection.appendChild(div);
    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(h3);

    // style elements
    div.classList.add("mini-cover");
    img.classList.add("mini-cover");
    h2.classList.add("cover-title");
    h3.classList.add("tagline");
  }
}

function deleteCover(event) {

  var imageSrc = event.target.parentElement.children[0].currentSrc;
  var title = event.target.parentElement.children[1].innerText;
  var subtitle = event.target.parentElement.children[2].innerText;
  var taglineArr = subtitle.split(" ");
  var tagline1 = taglineArr[3];
  var tagline2 = taglineArr[5];
  
  for (i = 0; i < savedCovers.length; i++) {
    if (imageSrc === savedCovers[i].coverImg && title === savedCovers[i].title && tagline1 === savedCovers[i].tagline1 && tagline2 === savedCovers[i].tagline2) {
      var indexOf = i
    }
  }
  savedCovers.splice(indexOf, 1);
  generateSavedCovers();
}

function pushUserInput() {
  event.preventDefault();
  covers.push(formImg.value);
  titles.push(formTitle.value);
  descriptors.push(formDescriptor1.value);
  descriptors.push(formDescriptor2.value);
  returnToHome();
  generateUserCover();
}

function generateUserCover() {
  imageCover.src = covers.slice(-1);
  bookTitle.innerText = titles.slice(-1);
  tagline2.innerText = descriptors.slice(-1);
  tagline1.innerText = descriptors.slice(-2, -1);
}

// SWITCH PAGES FUNCTIONS
function show(element) {
  element.classList.remove('hidden');
}
  
function hide(element) {
  element.classList.add('hidden');
}

function viewSavedCovers() {
  hide(homePage);
  hide(randBtn);
  hide(saveCoverBtn);
  hide(formView);
  show(savedCoversView);
  show(homeBtn);
  generateSavedCovers();
}

function returnToHome() {
  hide(savedCoversView);
  hide(formView);
  hide(homeBtn);
  show(homePage);
  show(randBtn);
  show(saveCoverBtn);
}

function showFormView() {
  hide(homePage);
  hide(randBtn);
  hide(saveBtn);
  hide(savedCoversView);
  show(formView);
  show(homeBtn);
}

// Starting conditions
generateNewCover();
