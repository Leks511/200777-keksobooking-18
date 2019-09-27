'use strict';

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArray(array) {
  var newArray = [];
  var randomQuantityOfElements = getRandomValue(0, array.length);

  for (var i = 0; i < randomQuantityOfElements; i++) {
    newArray[i] = array[getRandomValue(0, randomQuantityOfElements-1)];
  }

  return newArray;
}

function createPinElement(pin) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style = "left: " + pin.location.x + "px; top: " + pin.location.y + "px;";
  pinElement.src = pin.author.avatar;
  pinElement.alt = pin.offer.title;

  return pinElement;
}

function createPins(array) {
  var fragmentForPins = new DocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragmentForPins.appendChild(createPinElement(array[i]));
  }

  mapPins.appendChild(fragmentForPins);
}

var typesList = ["palace", "flat", "house", "bungalo"];
var checkinsList = ["12:00", "13:00", "14:00"];
var checkoutsList = ["12:00", "13:00", "14:00"];
var photosList = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
];
var featuresList = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner"
];

function createAdsList() {
  var adsList = [];

  for (var i = 0; i < 8; i++) {
    adsList[i] = {
      "author": {
        "avatar": "img/avatars/user0" + (i + 1) +".png"
      },
      "offer": {
        "title": "Заголовок " + (i + 1),
        "address": "600, 350",
        "price": getRandomValue(100, 500),
        "type": typesList[getRandomValue(0, typesList.length-1)],
        "rooms": getRandomValue(1, 7),
        "guests": getRandomValue(1, 12),
        "checkin": checkinsList[getRandomValue(0, checkinsList.length-1)],
        "checkout": checkoutsList[getRandomValue(0, checkoutsList.length - 1)],
        "features": getRandomArray(featuresList),
        "description": "Здесь будет описание",
        "photos": getRandomArray(photosList)
      },
      "location": {
        "x": getRandomValue(0, 1200),
        "y": getRandomValue(130, 630)
      }
    }
  }
  return adsList;
}

var adsList = createAdsList();

var mainMap = document.querySelector('.map');
mainMap.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var mapPins = document.querySelector('.map__pins');
createPins(adsList);
