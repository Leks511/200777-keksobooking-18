'use strict';

var ENTER_KEYCODE = 13;

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

  mapPinsList.appendChild(fragmentForPins);
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

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var mapPinsList = document.querySelector('.map__pins');


function setDisabledToElements(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute('disabled', 'disabled');
  }
}

function removeDisabledFromElements(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeAttribute('disabled');
  }
}

var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');

var mapFiltersForm = document.querySelector('.map__filters');
var mapFiltersFormSelectsAndFieldset = mapFiltersForm.querySelectorAll('fieldset, select');

function inactivateForms() {
  mainMap.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');

  setDisabledToElements(adFormFieldsets);
  setDisabledToElements(mapFiltersFormSelectsAndFieldset);
}

function activateForms() {
  mainMap.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  removeDisabledFromElements(adFormFieldsets);
  removeDisabledFromElements(mapFiltersFormSelectsAndFieldset);
}

inactivateForms();

var mainMapPin = document.querySelector('.map__pin--main');

mainMapPin.addEventListener('mousedown', function() {
  activateForms();
  getMainMapPinCoordinate(true);
});

mainMapPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activateForms();
    getMainMapPinCoordinate(true);
  }
});

var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;

var MAIN_PIN_PSEUDO_AFTER_HEIGHT = 19;
var MAIN_PIN_IMG_BORDER_WIDTH = 3;

function getMainMapPinCoordinate(isActive) {
  var mapPinOffsetTop = parseInt(mainMapPin.style.top);
  var mapPinOffsetLeft = parseInt(mainMapPin.style.left);

  var mapPinX = Math.round(mapPinOffsetLeft - MAIN_PIN_WIDTH/2);
  var mapPinY = Math.round(mapPinOffsetTop + MAIN_PIN_HEIGHT/2);

  if (isActive) {
    mapPinY = mapPinOffsetTop + MAIN_PIN_HEIGHT - MAIN_PIN_IMG_BORDER_WIDTH + MAIN_PIN_PSEUDO_AFTER_HEIGHT;
  }

  var mapPinCoordinate = mapPinX + ', ' + mapPinY;

  addressInput.value = mapPinCoordinate;
}

var addressInput = adForm.querySelector('#address');

getMainMapPinCoordinate(false);



function onAdFormRoomsGuestsChecking(evt) {
  var roomsQuantityValue = roomsQuantitySelect.value;
  var guestsQuantityValue = guestsQuantitySelect.value;

  if (roomsQuantityValue !== guestsQuantityValue) {
    evt.preventDefault();

    roomsQuantitySelect.setCustomValidity('Количество гостей должно соответствовать количеству комнат');

  } else {
    roomsQuantitySelect.setCustomValidity('');
  }
}

var roomsQuantitySelect = adForm.querySelector('#room_number');
var guestsQuantitySelect = adForm.querySelector('#capacity');

adForm.addEventListener('submit', function(evt) {
  onAdFormRoomsGuestsChecking(evt);
});

roomsQuantitySelect.addEventListener('change', function() {
  roomsQuantitySelect.setCustomValidity('');
});

guestsQuantitySelect.addEventListener('change', function () {
  roomsQuantitySelect.setCustomValidity('');
});

