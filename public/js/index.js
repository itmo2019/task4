/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/blocks/actions/__checkbox/__checkbox.js":
/*!*****************************************************!*\
  !*** ./src/blocks/actions/__checkbox/__checkbox.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("document.querySelector('.actions__checkbox').addEventListener('change', function (event) {\n  Array.from(document.querySelectorAll('.letter__checkbox')).forEach(function (checkbox) {\n    if (checkbox.checked !== event.target.checked) {\n      checkbox.checked = event.target.checked;\n      checkbox.dispatchEvent(new Event('change'));\n    }\n  });\n});\n\n//# sourceURL=webpack:///./src/blocks/actions/__checkbox/__checkbox.js?");

/***/ }),

/***/ "./src/blocks/delete-letters-button/delete-letters-button.js":
/*!*******************************************************************!*\
  !*** ./src/blocks/delete-letters-button/delete-letters-button.js ***!
  \*******************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _letters_add_new_letter_add_new_letter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../letters/__add-new-letter/__add-new-letter */ \"./src/blocks/letters/__add-new-letter/__add-new-letter.js\");\n/* harmony import */ var _lib_latch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/latch */ \"./src/lib/latch.js\");\n/* harmony import */ var _lib_server_api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/server-api.js */ \"./src/lib/server-api.js\");\n\n\n\n\ndocument.querySelector('.delete-letters-button').onclick = function () {\n  sendDeleteRequest();\n};\n\nfunction deleteLocal(_ref) {\n  var markedIds = _ref.markedIds,\n      unmarkedIds = _ref.unmarkedIds;\n  var markedLetters = lettersByIds(markedIds);\n  var latch = new _lib_latch__WEBPACK_IMPORTED_MODULE_1__[\"default\"](markedLetters.length, function () {\n    if (unmarkedIds.length == 0) document.querySelector('.actions__checkbox').disabled = true;\n    loadOldMessages(unmarkedIds.length);\n  });\n  return function (responseText) {\n    markedLetters.forEach(function (letter) {\n      letter.addEventListener(\"animationstart\", function () {\n        var checkbox = letter.querySelector('.letter__checkbox');\n\n        if (checkbox.checked) {\n          checkbox.checked = false;\n          checkbox.dispatchEvent(new Event('change'));\n        }\n      });\n      letter.addEventListener(\"animationend\", function () {\n        letter.remove();\n        latch.countDown();\n      });\n      letter.classList.add('letter_deleted');\n    });\n  };\n}\n\nfunction sendDeleteRequest() {\n  var _idsPartition = idsPartition(),\n      markedIds = _idsPartition.markedIds,\n      unmarkedIds = _idsPartition.unmarkedIds;\n\n  Object(_lib_server_api_js__WEBPACK_IMPORTED_MODULE_2__[\"deleteMessages\"])(markedIds, deleteLocal({\n    markedIds: markedIds,\n    unmarkedIds: unmarkedIds\n  }));\n}\n\nfunction loadOldMessages(remainingCnt) {\n  Object(_lib_server_api_js__WEBPACK_IMPORTED_MODULE_2__[\"loadMessages\"])(function (responseText) {\n    var letters = JSON.parse(responseText);\n    letters.splice(0, letters.length - remainingCnt).forEach(function (letter) {\n      return Object(_letters_add_new_letter_add_new_letter__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(letter, false, 'beforeend');\n    });\n  });\n}\n\nfunction allLetters() {\n  return Array.from(document.querySelectorAll('.letter'));\n}\n\nfunction lettersBy(pred) {\n  return allLetters().filter(pred);\n}\n\nfunction lettersByIds(ids) {\n  return lettersBy(function (letter) {\n    return ids.includes(letter.dataset.id);\n  });\n}\n\nfunction idsPartition() {\n  var res = {\n    markedIds: [],\n    unmarkedIds: []\n  };\n  allLetters().forEach(function (letter) {\n    if (letter.querySelector('.checkbox__real-checkbox').checked) {\n      res.markedIds.push(letter.dataset.id);\n    } else {\n      res.unmarkedIds.push(letter.dataset.id);\n    }\n  });\n  return res;\n}\n\n//# sourceURL=webpack:///./src/blocks/delete-letters-button/delete-letters-button.js?");

/***/ }),

/***/ "./src/blocks/letters/__add-new-letter/__add-new-letter.js":
/*!*****************************************************************!*\
  !*** ./src/blocks/letters/__add-new-letter/__add-new-letter.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return addNewLetter; });\n/* harmony import */ var _lib_server_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/server-api */ \"./src/lib/server-api.js\");\n\nfunction addNewLetter(letter, withAnimation, position) {\n  document.querySelector('.letters__list').insertAdjacentElement(position, createNewLetterElement(letter, withAnimation));\n  document.querySelector('.actions__checkbox').disabled = false;\n  var letters = Array.from(document.querySelectorAll('.letter'));\n\n  for (var i = 30; i < letters.length; i++) {\n    letters[i].remove();\n  }\n}\n;\n\nfunction createNewLetterElement(letterContent, withAnimation) {\n  var letter = createLetterFromTemplate(letterContent);\n  if (withAnimation) triggerAnimation(letter);\n  return letter;\n}\n\nfunction createLetterFromTemplate(letter) {\n  var template = document.getElementById('new-letter-template');\n  var letterElement = document.importNode(template.content, true).firstElementChild;\n  letterElement.dataset.id = letter.id;\n  letterElement.querySelector('.profile-name').textContent = letter.user.name;\n  letterElement.querySelector('.content-preview').textContent = letter.content.subject;\n  var profileImageStyle = generateProfileImageStyle(letter.user);\n  var profileImageElement = letterElement.querySelector('.profile-image');\n  profileImageElement.textContent = profileImageStyle.text;\n  profileImageElement.setAttribute(\"style\", profileImageStyle.style);\n  var date = new Date(letter.date);\n  var dateElement = letterElement.querySelector('.date');\n  dateElement.textContent = getRuDate(date);\n  dateElement.setAttribute(\"datetime\", getDatetime(date));\n  if (letter.read === false) letterElement.classList.add('letter_unread');\n  addListeners(letterElement);\n  return letterElement;\n}\n\nfunction addListeners(letter) {\n  addCheckboxListener(letter);\n  addLinkListener(letter);\n}\n\nfunction addCheckboxListener(letter) {\n  letter.querySelector('.letter__checkbox').addEventListener('click', function (event) {\n    return event.stopPropagation();\n  });\n  letter.querySelector('.checkbox__checkbox-view').addEventListener('click', function (event) {\n    return event.stopPropagation();\n  });\n  letter.querySelector('.letter__checkbox').addEventListener('change', function (event) {\n    Array.from(document.querySelectorAll('.actions__button')).forEach(function (button) {\n      var atLeastOneChecked = Array.from(document.querySelectorAll('.letter__checkbox')).some(function (checkbox) {\n        return checkbox.checked;\n      });\n\n      if (atLeastOneChecked) {\n        button.disabled = false;\n      } else {\n        button.disabled = true;\n      }\n\n      if (!event.target.checked) {\n        document.querySelector('.actions__checkbox').checked = false;\n      }\n    });\n    letter.classList.toggle('letter_active');\n  });\n}\n\nfunction addLinkListener(letter) {\n  var link = letter.querySelector('.letter__link');\n\n  link.onclick = function () {\n    Object(_lib_server_api__WEBPACK_IMPORTED_MODULE_0__[\"getMessage\"])(letter.dataset.id, function (responseText) {\n      showContent(JSON.parse(responseText));\n    });\n  };\n}\n\nfunction showContent(content) {\n  console.log(content);\n  var messageContent = createMessageContent(content);\n  var lettersList = document.querySelector('.letters__list');\n  disableCheckboxes();\n  lettersList.style.display = 'none';\n  lettersList.insertAdjacentElement('afterend', messageContent);\n}\n\nfunction disableCheckboxes() {\n  Array.from(document.querySelectorAll('.letter__checkbox')).forEach(function (checkbox) {\n    if (checkbox.checked) {\n      checkbox.checked = false;\n      checkbox.dispatchEvent(new Event('change'));\n    }\n  });\n  document.querySelector('.actions__checkbox').disabled = true;\n}\n\nfunction createMessageContent(content) {\n  var template = document.getElementById('message-content-template');\n  var contentElement = document.importNode(template.content, true).firstElementChild;\n  contentElement.querySelector('.message-content__subject').textContent = content.content.subject;\n  contentElement.querySelector('.message-content__profile-name').textContent = content.user.name;\n  contentElement.querySelector('.message-content__content').textContent = content.content.message;\n  var profileImageStyle = generateProfileImageStyle(content.user);\n  var profileImageElement = contentElement.querySelector('.message-content__profile-image');\n  profileImageElement.textContent = profileImageStyle.text;\n  profileImageElement.setAttribute(\"style\", profileImageStyle.style);\n  var date = new Date(content.date);\n  var dateElement = contentElement.querySelector('.message-content__date');\n  dateElement.textContent = getRuDate(date);\n  dateElement.setAttribute(\"datetime\", getDatetime(date));\n  return contentElement;\n}\n\nfunction triggerAnimation(letter) {\n  letter.addEventListener(\"animationend\", function () {\n    letter.classList.remove('letter_new');\n    letter.removeEventListener(\"animationend\", this);\n  });\n  letter.classList.add('letter_new');\n}\n\nfunction generateProfileImageStyle(user) {\n  if (user.imageUrl) {\n    return {\n      style: \"background-image: url('\".concat(user.imageUrl, \"');\"),\n      text: ''\n    };\n  } else {\n    var nameParts = user.name.split(/\\s+/).filter(function (s) {\n      return s.length > 0;\n    });\n    var text = (nameParts.length == 0 ? \"\" : nameParts.length == 1 ? nameParts[0][0] : nameParts[0][0] + nameParts[1][0]).toUpperCase();\n    return {\n      style: \"background-color: rgb(\".concat(randomColor().join(', '), \");\"),\n      text: text\n    };\n  }\n}\n\nfunction randomColor() {\n  var hsvToRGB = function hsvToRGB(h, s, v) {\n    var h1 = Math.floor(h * 6),\n        f = h * 6 - h1,\n        p = v * (1 - s),\n        q = v * (1 - f * s),\n        t = v * (1 - (1 - f) * s);\n    var rgb = h1 < 1 ? [v, t, p] : h1 < 2 ? [q, v, p] : h1 < 3 ? [p, v, t] : h1 < 4 ? [p, q, v] : h1 < 5 ? [t, p, v] :\n    /*else*/\n    [v, p, q];\n    return rgb.map(function (c) {\n      return Math.floor(c * 256);\n    });\n  };\n\n  return hsvToRGB(Math.random(), 0.4, 0.85);\n}\n\nfunction getDatetime(date) {\n  return \"\".concat(date.getUTCFullYear(), \"-\").concat(date.getUTCMonth(), \"-\").concat(date.getUTCDate());\n}\n\nfunction getRuDate(date) {\n  return new Intl.DateTimeFormat('ru', {\n    day: 'numeric',\n    month: 'short'\n  }).format(date);\n}\n\n//# sourceURL=webpack:///./src/blocks/letters/__add-new-letter/__add-new-letter.js?");

/***/ }),

/***/ "./src/blocks/letters/letters.js":
/*!***************************************!*\
  !*** ./src/blocks/letters/letters.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _add_new_letter_add_new_letter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./__add-new-letter/__add-new-letter */ \"./src/blocks/letters/__add-new-letter/__add-new-letter.js\");\n/* harmony import */ var _delete_letters_button_delete_letters_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../delete-letters-button/delete-letters-button */ \"./src/blocks/delete-letters-button/delete-letters-button.js\");\n\n\nvar newMsgSock = io.connect('/new-message');\nnewMsgSock.on('connect', function () {\n  newMsgSock.on('new-message', function (msg) {\n    Object(_add_new_letter_add_new_letter__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(msg, true, 'afterbegin');\n  });\n});\n\n//# sourceURL=webpack:///./src/blocks/letters/letters.js?");

/***/ }),

/***/ "./src/blocks/send-letter/__letter-generator/__letter-generator.js":
/*!*************************************************************************!*\
  !*** ./src/blocks/send-letter/__letter-generator/__letter-generator.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return generateLetter; });\n/* harmony import */ var _text_generator_text_generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../__text-generator/__text-generator */ \"./src/blocks/send-letter/__text-generator/__text-generator.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n\n\nvar Letter = function Letter(user, content, date) {\n  _classCallCheck(this, Letter);\n\n  this.user = user;\n  this.content = content;\n  this.date = date;\n};\n\nvar Content = function Content(subject, message) {\n  _classCallCheck(this, Content);\n\n  this.subject = subject;\n  this.message = message;\n};\n\nvar User = function User(name, imageUrl) {\n  _classCallCheck(this, User);\n\n  this.name = name;\n  this.imageUrl = imageUrl;\n};\n\nfunction generateLetter() {\n  return new Letter(randomUser(), new Content(Object(_text_generator_text_generator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(1, 1), Object(_text_generator_text_generator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(randomInt(4, 5), randomInt(5, 10))), new Date());\n}\n\nfunction randomUser() {\n  return defaultUsers[randomInt(0, defaultUsers.length)];\n}\n\nfunction randomInt(min, max) {\n  return Math.floor(Math.random() * (max - min)) + min;\n}\n\nvar defaultUsers = [new User('Яндекс.Паспорт', '/img/ya.svg'), new User('Команда Яндекс.Почты', '/img/ya.svg'), new User('Ivan Ivanov', '/img/profile-image_ivan-ivanov.png'), new User('Вася Петров', null), new User('verycoolusername777', null)];\n\n//# sourceURL=webpack:///./src/blocks/send-letter/__letter-generator/__letter-generator.js?");

/***/ }),

/***/ "./src/blocks/send-letter/__text-generator/__text-generator.js":
/*!*********************************************************************!*\
  !*** ./src/blocks/send-letter/__text-generator/__text-generator.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return generateText; });\nfunction generateText(paragraphsInText, sentencesInParagraph) {\n  var paragraphs = [];\n\n  for (var p = 0; p < paragraphsInText; p++) {\n    var sentences = [];\n\n    for (var s = 0; s < sentencesInParagraph; s++) {\n      var sentence = markov.generateSequence().join(' ');\n      sentences[s] = sentence[0].toUpperCase() + sentence.substr(1) + \".\";\n    }\n\n    paragraphs[p] = sentences.join(' ');\n  }\n\n  return paragraphs.join(' ');\n}\nvar sampleText = \"\\u0421\\u043E\\u0433\\u043B\\u0430\\u0441\\u043D\\u043E \\u0435\\u0436\\u0435\\u0433\\u043E\\u0434\\u043D\\u043E\\u043C\\u0443 \\u0438\\u0441\\u0441\\u043B\\u0435\\u0434\\u043E\\u0432\\u0430\\u043D\\u0438\\u044E StackOverflow, \\u0441\\u0430\\u043C\\u0430\\u044F \\u043F\\u043E\\u043F\\u0443\\u043B\\u044F\\u0440\\u043D\\u0430\\u044F \\u043F\\u0440\\u043E\\u0444\\u0435\\u0441\\u0441\\u0438\\u044F \\u0441\\u0440\\u0435\\u0434\\u0438 \\u043F\\u043E\\u043B\\u044C\\u0437\\u043E\\u0432\\u0430\\u0442\\u0435\\u043B\\u0435\\u0439 \\u0441\\u0435\\u0440\\u0432\\u0438\\u0441\\u0430 \\u0432 2017 \\u0433\\u043E\\u0434\\u0443 \\u2014 \\u044D\\u0442\\u043E Web developer. \\u0418\\u043C\\u0435\\u043D\\u043D\\u043E \\u0432 \\u044D\\u0442\\u0443 \\u043A\\u0430\\u0442\\u0435\\u0433\\u043E\\u0440\\u0438\\u044E \\u0432\\u0445\\u043E\\u0434\\u044F\\u0442 \\u0432\\u0441\\u0435 \\u0444\\u0440\\u043E\\u043D\\u0442\\u0435\\u043D\\u0434-\\u0440\\u0430\\u0437\\u0440\\u0430\\u0431\\u043E\\u0442\\u0447\\u0438\\u043A\\u0438. \\n\\u0415\\u0441\\u043B\\u0438 \\u0437\\u0430\\u0439\\u0442\\u0438 \\u043D\\u0430 \\u043F\\u0435\\u0440\\u0432\\u044B\\u0439 \\u043F\\u043E\\u043F\\u0430\\u0432\\u0448\\u0438\\u0439\\u0441\\u044F \\u0441\\u0430\\u0439\\u0442 \\u043F\\u043E \\u043F\\u043E\\u0438\\u0441\\u043A\\u0443 \\u0440\\u0430\\u0431\\u043E\\u0442\\u044B, \\u043D\\u0430\\u043F\\u0440\\u0438\\u043C\\u0435\\u0440, \\u043D\\u0430 hh.ru, \\u0441\\u043E\\u0437\\u0434\\u0430\\u0441\\u0442\\u0441\\u044F \\u0432\\u043F\\u0435\\u0447\\u0430\\u0442\\u043B\\u0435\\u043D\\u0438\\u0435, \\u0447\\u0442\\u043E \\u0444\\u0440\\u043E\\u043D\\u0442\\u0435\\u043D\\u0434-\\u0440\\u0430\\u0437\\u0440\\u0430\\u0431\\u043E\\u0442\\u0447\\u0438\\u043A \\u2014 \\u044D\\u0442\\u043E \\u0441\\u043F\\u0435\\u0446\\u0438\\u0430\\u043B\\u0438\\u0441\\u0442-\\u0445\\u0430\\u043C\\u0435\\u043B\\u0435\\u043E\\u043D. \\n\\u041D\\u0430\\u0447\\u0438\\u043D\\u0430\\u0435\\u0442\\u0441\\u044F \\u0432\\u0441\\u0435 \\u0441 \\u043F\\u0443\\u0442\\u0430\\u043D\\u0438\\u0446\\u044B \\u0432 \\u043D\\u0430\\u0437\\u0432\\u0430\\u043D\\u0438\\u044F\\u0445 \\u0432\\u0430\\u043A\\u0430\\u043D\\u0441\\u0438\\u0439: \\u043C\\u043E\\u0436\\u043D\\u043E \\u0432\\u0441\\u0442\\u0440\\u0435\\u0442\\u0438\\u0442\\u044C \\u0438 \\xABfront-end developer\\xBB, \\u0438 \\xABfront end \\u0440\\u0430\\u0437\\u0440\\u0430\\u0431\\u043E\\u0442\\u0447\\u0438\\u043A\\xBB, \\u0438 \\xAB\\u0444\\u0440\\u043E\\u043D\\u0442\\u0435\\u043D\\u0434\\u0449\\u0438\\u043A\\xBB, \\u0438 \\xAB\\u0444\\u0440\\u043E\\u043D\\u0442\\u0435\\u043D\\u0434 \\u0434\\u0435\\u0432\\u0435\\u043B\\u043E\\u043F\\u0435\\u0440\\xBB, \\u0438 \\xABweb developer\\xBB, \\u0438 \\xAB\\u0444\\u0440\\u043E\\u043D\\u0442\\u0435\\u043D\\u0434-\\u0440\\u0430\\u0437\\u0440\\u0430\\u0431\\u043E\\u0442\\u0447\\u0438\\u043A\\xBB. \\u0418\\u043D\\u043E\\u0433\\u0434\\u0430 \\u0434\\u0430\\u0436\\u0435 \\u043C\\u043E\\u0436\\u043D\\u043E \\u0443\\u0432\\u0438\\u0434\\u0435\\u0442\\u044C \\u043A\\u0430\\u043A\\u043E\\u0433\\u043E-\\u043D\\u0438\\u0431\\u0443\\u0434\\u044C \\xAB\\u0432\\u0435\\u0431-\\u0432\\u0435\\u0440\\u0441\\u0442\\u0430\\u043B\\u044C\\u0449\\u0438\\u043A\\u0430\\xBB \\u0441 \\u0442\\u0440\\u0435\\u0431\\u043E\\u0432\\u0430\\u043D\\u0438\\u044F\\u043C\\u0438 \\u043F\\u043E\\u0434 \\u0444\\u0443\\u043B\\u0441\\u0442\\u0430\\u043A-\\u0440\\u0430\\u0437\\u0440\\u0430\\u0431\\u043E\\u0442\\u0447\\u0438\\u043A\\u0430. \\u0420\\u0435\\u0430\\u043A\\u0446\\u0438\\u044F \\u043D\\u0430 \\u044D\\u0442\\u043E \\u043E\\u0434\\u043D\\u0430: WTF?!\\n\\u0411\\u0435\\u0434\\u0430 \\u0432 \\u0442\\u043E\\u043C, \\u0447\\u0442\\u043E \\u0447\\u0430\\u0441\\u0442\\u044C \\u0440\\u0430\\u0431\\u043E\\u0442\\u043E\\u0434\\u0430\\u0442\\u0435\\u043B\\u0435\\u0439 \\u043D\\u0435 \\u043E\\u0442\\u043B\\u0438\\u0447\\u0430\\u044E\\u0442 (\\u0438\\u043B\\u0438 \\u043D\\u0435 \\u0445\\u043E\\u0442\\u044F\\u0442 \\u043E\\u0442\\u043B\\u0438\\u0447\\u0430\\u0442\\u044C) \\u0432\\u0435\\u0440\\u0441\\u0442\\u0430\\u043B\\u044C\\u0449\\u0438\\u043A\\u0430 \\u043E\\u0442 \\u0444\\u0440\\u043E\\u043D\\u0442\\u0435\\u043D\\u0434-\\u0440\\u0430\\u0437\\u0440\\u0430\\u0431\\u043E\\u0442\\u0447\\u0438\\u043A\\u0430, \\u2014 \\u044D\\u0442\\u043E \\u043F\\u043E\\u043D\\u044F\\u0442\\u043D\\u043E \\u043F\\u043E \\u043E\\u043F\\u0438\\u0441\\u0430\\u043D\\u0438\\u044E \\u0432\\u0430\\u043A\\u0430\\u043D\\u0441\\u0438\\u0439. \\u0420\\u0430\\u0437\\u0431\\u0435\\u0440\\u0435\\u043C\\u0441\\u044F, \\u043A\\u0430\\u043A\\u0438\\u0435 \\u0443\\u043C\\u0435\\u043D\\u0438\\u044F \\u043E\\u0442\\u0434\\u0435\\u043B\\u044F\\u044E\\u0442 \\u0444\\u0440\\u043E\\u043D\\u0442\\u0435\\u043D\\u0434-\\u0440\\u0430\\u0437\\u0440\\u0430\\u0431\\u043E\\u0442\\u0447\\u0438\\u043A\\u0430 \\u043E\\u0442 \\xAB\\u0432\\u0435\\u0440\\u0441\\u0442\\u0430\\u043A\\u0430\\xBB (\\u0432\\u0435\\u0440\\u0441\\u0442\\u0430\\u043B\\u044C\\u0449\\u0438\\u043A\\u0438, \\u043D\\u0435 \\u043E\\u0431\\u0438\\u0436\\u0430\\u0439\\u0442\\u0435\\u0441\\u044C, \\u0432\\u044B \\u0442\\u043E\\u0436\\u0435 \\u0445\\u043E\\u0440\\u043E\\u0448\\u0438\\u0435).\\n\\u0412\\u0435\\u0440\\u0441\\u0442\\u0430\\u043B\\u044C\\u0449\\u0438\\u043A \\u2014 \\u0431\\u043E\\u0435\\u0446 \\u0443\\u0437\\u043A\\u043E\\u0433\\u043E \\u0444\\u0440\\u043E\\u043D\\u0442\\u0430. \\u0415\\u0433\\u043E \\u0437\\u0430\\u0434\\u0430\\u0447\\u0430 \\u2014 \\u0441\\u0432\\u0435\\u0440\\u0441\\u0442\\u0430\\u0442\\u044C \\u043F\\u043E\\u043B\\u0443\\u0447\\u0435\\u043D\\u043D\\u044B\\u0439 \\u043E\\u0442 \\u0434\\u0438\\u0437\\u0430\\u0439\\u043D\\u0435\\u0440\\u0430 \\u043C\\u0430\\u043A\\u0435\\u0442, \\u0438\\u0441\\u043F\\u043E\\u043B\\u044C\\u0437\\u0443\\u044F HTML+CSS. \\u041E\\u043D, \\u0432\\u043E\\u0437\\u043C\\u043E\\u0436\\u043D\\u043E, \\u043D\\u0435\\u043C\\u043D\\u043E\\u0433\\u043E \\u0443\\u043C\\u0435\\u0435\\u0442 \\u0432 JavaScript, \\u043D\\u043E \\u0447\\u0430\\u0449\\u0435 \\u043E\\u0433\\u0440\\u0430\\u043D\\u0438\\u0447\\u0438\\u0432\\u0430\\u0435\\u0442\\u0441\\u044F \\u0443\\u043C\\u0435\\u043D\\u0438\\u0435\\u043C \\u043F\\u0440\\u0438\\u043A\\u0440\\u0443\\u0442\\u0438\\u0442\\u044C \\u043A\\u0430\\u043A\\u043E\\u0439-\\u043D\\u0438\\u0431\\u0443\\u0434\\u044C \\u043F\\u043B\\u0430\\u0433\\u0438\\u043D jQuery.\\n\\u0424\\u0440\\u043E\\u043D\\u0442\\u0435\\u043D\\u0434-\\u0440\\u0430\\u0437\\u0440\\u0430\\u0431\\u043E\\u0442\\u0447\\u0438\\u043A \\u043D\\u0435 \\u043F\\u0440\\u043E\\u0441\\u0442\\u043E \\u0432\\u0435\\u0440\\u0441\\u0442\\u0430\\u0435\\u0442 \\u043C\\u0430\\u043A\\u0435\\u0442\\u044B. \\u041E\\u043D \\u0445\\u043E\\u0440\\u043E\\u0448\\u043E \\u0437\\u043D\\u0430\\u0435\\u0442 JavaScript, \\u0440\\u0430\\u0437\\u0431\\u0438\\u0440\\u0430\\u0435\\u0442\\u0441\\u044F \\u0432\\u043E \\u0444\\u0440\\u0435\\u0439\\u043C\\u0432\\u043E\\u0440\\u043A\\u0430\\u0445 \\u0438 \\u0431\\u0438\\u0431\\u043B\\u0438\\u043E\\u0442\\u0435\\u043A\\u0430\\u0445 (\\u0438 \\u0430\\u043A\\u0442\\u0438\\u0432\\u043D\\u043E \\u044E\\u0437\\u0430\\u0435\\u0442 \\u0447\\u0430\\u0441\\u0442\\u044C \\u0438\\u0437 \\u043D\\u0438\\u0445), \\u043F\\u043E\\u043D\\u0438\\u043C\\u0430\\u0435\\u0442, \\u0447\\u0442\\u043E \\u043D\\u0430\\u0445\\u043E\\u0434\\u0438\\u0442\\u0441\\u044F \\xAB\\u043F\\u043E\\u0434 \\u043A\\u0430\\u043F\\u043E\\u0442\\u043E\\u043C\\xBB \\u043D\\u0430 \\u0441\\u0435\\u0440\\u0432\\u0435\\u0440\\u043D\\u043E\\u0439 \\u0441\\u0442\\u043E\\u0440\\u043E\\u043D\\u0435. \\u0415\\u0433\\u043E \\u043D\\u0435 \\u043F\\u0443\\u0433\\u0430\\u044E\\u0442 \\u043F\\u0440\\u0435\\u043F\\u0440\\u043E\\u0446\\u0435\\u0441\\u0441\\u043E\\u0440\\u044B \\u0438 \\u0441\\u0431\\u043E\\u0440\\u0449\\u0438\\u043A\\u0438 LESS, SASS, GRUNT, GULP, \\u043E\\u043D \\u0443\\u043C\\u0435\\u0435\\u0442 \\u0440\\u0430\\u0431\\u043E\\u0442\\u0430\\u0442\\u044C \\u0441 DOM, API, SVG-\\u043E\\u0431\\u044A\\u0435\\u043A\\u0442\\u0430\\u043C\\u0438, AJAX \\u0438 CORS, \\u043C\\u043E\\u0436\\u0435\\u0442 \\u0441\\u043E\\u0441\\u0442\\u0430\\u0432\\u043B\\u044F\\u0442\\u044C SQL-\\u0437\\u0430\\u043F\\u0440\\u043E\\u0441\\u044B \\u0438 \\u043A\\u043E\\u043F\\u0430\\u0442\\u044C\\u0441\\u044F \\u0432 \\u0434\\u0430\\u043D\\u043D\\u044B\\u0445. \\u041F\\u043E\\u043B\\u0443\\u0447\\u0430\\u0435\\u0442\\u0441\\u044F \\u0441\\u0431\\u043E\\u0440\\u043D\\u0430\\u044F \\u0441\\u043E\\u043B\\u044F\\u043D\\u043A\\u0430 \\u043D\\u0430\\u0432\\u044B\\u043A\\u043E\\u0432, \\u043A \\u043A\\u043E\\u0442\\u043E\\u0440\\u044B\\u043C \\u0434\\u043E\\u0431\\u0430\\u0432\\u043B\\u044F\\u0435\\u0442\\u0441\\u044F \\u043F\\u043E\\u043D\\u0438\\u043C\\u0430\\u043D\\u0438\\u0435 \\u043F\\u0440\\u0438\\u043D\\u0446\\u0438\\u043F\\u043E\\u0432 UI/UX-\\u043F\\u0440\\u043E\\u0435\\u043A\\u0442\\u0438\\u0440\\u043E\\u0432\\u0430\\u043D\\u0438\\u044F, \\u0430\\u0434\\u0430\\u043F\\u0442\\u0438\\u0432\\u043D\\u043E\\u0439 \\u0438 \\u043E\\u0442\\u0437\\u044B\\u0432\\u0447\\u0438\\u0432\\u043E\\u0439 \\u0432\\u0435\\u0440\\u0441\\u0442\\u043A\\u0438, \\u043A\\u0440\\u043E\\u0441\\u0441-\\u0431\\u0440\\u0430\\u0443\\u0437\\u0435\\u0440\\u043D\\u043E\\u0441\\u0442\\u0438 \\u0438 \\u043A\\u0440\\u043E\\u0441\\u0441-\\u043F\\u043B\\u0430\\u0442\\u0444\\u043E\\u0440\\u043C\\u0435\\u043D\\u043D\\u043E\\u0441\\u0442\\u0438, \\u0430 \\u0438\\u043D\\u043E\\u0433\\u0434\\u0430 \\u0438 \\u043D\\u0430\\u0432\\u044B\\u043A\\u043E\\u0432 \\u043C\\u043E\\u0431\\u0438\\u043B\\u044C\\u043D\\u043E\\u0439 \\u0440\\u0430\\u0437\\u0440\\u0430\\u0431\\u043E\\u0442\\u043A\\u0438. \\n\\u0424\\u0440\\u043E\\u043D\\u0442\\u0435\\u043D\\u0434\\u0449\\u0438\\u043A \\u0432 \\u043E\\u0431\\u044F\\u0437\\u0430\\u0442\\u0435\\u043B\\u044C\\u043D\\u043E\\u043C \\u043F\\u043E\\u0440\\u044F\\u0434\\u043A\\u0435 \\u0443\\u043C\\u0435\\u0435\\u0442 \\u0440\\u0430\\u0431\\u043E\\u0442\\u0430\\u0442\\u044C \\u0441 \\u043A\\u043E\\u043D\\u0442\\u0440\\u043E\\u043B\\u0435\\u043C \\u0432\\u0435\\u0440\\u0441\\u0438\\u0439 (Git, GitHub, CVS \\u0438 \\u0442. \\u0434.), \\u0438\\u0441\\u043F\\u043E\\u043B\\u044C\\u0437\\u043E\\u0432\\u0430\\u0442\\u044C \\u0433\\u0440\\u0430\\u0444\\u0438\\u0447\\u0435\\u0441\\u043A\\u0438\\u0435 \\u0440\\u0435\\u0434\\u0430\\u043A\\u0442\\u043E\\u0440\\u044B, \\xAB\\u0438\\u0433\\u0440\\u0430\\u0442\\u044C\\xBB \\u0441 \\u0448\\u0430\\u0431\\u043B\\u043E\\u043D\\u0430\\u043C\\u0438 \\u0440\\u0430\\u0437\\u043B\\u0438\\u0447\\u043D\\u044B\\u0445 CMS.\\n\\u0415\\u0449\\u0435 \\u043A\\u0440\\u0430\\u0439\\u043D\\u0435 \\u0436\\u0435\\u043B\\u0430\\u0442\\u0435\\u043B\\u044C\\u043D\\u043E \\u0437\\u043D\\u0430\\u0442\\u044C \\u0430\\u043D\\u0433\\u043B\\u0438\\u0439\\u0441\\u043A\\u0438\\u0439 \\u044F\\u0437\\u044B\\u043A, \\u0447\\u0442\\u043E\\u0431\\u044B \\u043D\\u0435 \\u043F\\u0435\\u0440\\u0435\\u0432\\u043E\\u0434\\u0438\\u0442\\u044C \\u0441\\u043F\\u0435\\u0446\\u0438\\u0444\\u0438\\u043A\\u0430\\u0446\\u0438\\u044E \\u0432 \\u0413\\u0443\\u0433\\u043B-\\u043F\\u0435\\u0440\\u0435\\u0432\\u043E\\u0434\\u0447\\u0438\\u043A\\u0435, \\u0443\\u043C\\u0435\\u0442\\u044C \\u0440\\u0430\\u0431\\u043E\\u0442\\u0430\\u0442\\u044C \\u0432 \\u043A\\u043E\\u043C\\u0430\\u043D\\u0434\\u0435, \\u0438\\u043D\\u043E\\u0433\\u0434\\u0430 \\u043C\\u0443\\u043B\\u044C\\u0442\\u0438\\u044F\\u0437\\u044B\\u0447\\u043D\\u043E\\u0439, \\u0440\\u0430\\u0437\\u0431\\u0438\\u0440\\u0430\\u0442\\u044C\\u0441\\u044F \\u0432 \\u0432\\u0435\\u0431-\\u0448\\u0440\\u0438\\u0444\\u0442\\u0430\\u0445, \\u043D\\u0443 \\u0438 \\u043F\\u043E\\u043D\\u0438\\u043C\\u0430\\u0442\\u044C \\u0442\\u0435\\u0441\\u0442\\u0438\\u0440\\u043E\\u0432\\u0449\\u0438\\u043A\\u043E\\u0432 \\u0438 \\u0441\\u0430\\u043C \\u043F\\u0440\\u043E\\u0446\\u0435\\u0441\\u0441 \\u0442\\u0435\\u0441\\u0442\\u0438\\u0440\\u043E\\u0432\\u0430\\u043D\\u0438\\u044F. \";\nvar markov = {\n  chain: generateChain(sampleText),\n  generateSequence: function generateSequence() {\n    var choose = function choose(probs) {\n      var prob = Math.random();\n      var sum = 0;\n\n      for (var to in probs) {\n        if (prob < sum + probs[to]) return to;\n        sum += probs[to];\n      }\n\n      return \"markov-end\";\n    };\n\n    var seq = [];\n    var curSymbol = \"markov-start\";\n\n    while (true) {\n      curSymbol = choose(this.chain[curSymbol]);\n      if (curSymbol === \"markov-end\") break;else seq.push(curSymbol);\n    }\n\n    return seq;\n  }\n};\n\nfunction generateChain(text) {\n  var sentences = text.split(/(\\.+)/).filter(function (s) {\n    return s.length > 0 && s !== \".\";\n  });\n  var graph = [];\n\n  for (var sentenceEntry in sentences) {\n    var sentence = sentences[sentenceEntry];\n\n    var addSymbol = function addSymbol(from, to) {\n      if (graph[from] == null) graph[from] = [];\n      if (graph[from][to] == null) graph[from][to] = 1;else graph[from][to]++;\n    };\n\n    var symbols = sentence.split(/\\s+/).filter(function (s) {\n      return s.length > 0;\n    });\n    if (symbols.length === 0) continue;\n    addSymbol(\"markov-start\", symbols[0]);\n\n    for (var cur = 0, next = 1; next < symbols.length; cur++, next++) {\n      addSymbol(symbols[cur], symbols[next]);\n    }\n\n    addSymbol(symbols.slice(-1), \"markov-end\");\n  }\n\n  for (var from in graph) {\n    var sum = 0;\n\n    for (var to in graph[from]) {\n      sum += graph[from][to];\n    }\n\n    for (var to in graph[from]) {\n      graph[from][to] /= sum;\n    }\n  }\n\n  return graph;\n}\n\n//# sourceURL=webpack:///./src/blocks/send-letter/__text-generator/__text-generator.js?");

/***/ }),

/***/ "./src/blocks/send-letter/send-letter.js":
/*!***********************************************!*\
  !*** ./src/blocks/send-letter/send-letter.js ***!
  \***********************************************/
/*! exports provided: newMail, newMailAuto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"newMail\", function() { return newMail; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"newMailAuto\", function() { return newMailAuto; });\n/* harmony import */ var _letter_generator_letter_generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./__letter-generator/__letter-generator */ \"./src/blocks/send-letter/__letter-generator/__letter-generator.js\");\n/* harmony import */ var _lib_server_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/server-api */ \"./src/lib/server-api.js\");\n\n\nfunction newMail() {\n  console.log(new Date());\n  Object(_lib_server_api__WEBPACK_IMPORTED_MODULE_1__[\"sendMessage\"])(Object(_letter_generator_letter_generator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])());\n}\nfunction newMailAuto() {\n  var interval = 5 * 60 * 1000;\n\n  var doStep = function doStep() {\n    var timePoint = Math.floor(Math.random() * interval);\n    setTimeout(newMail, timePoint);\n  };\n\n  setInterval(doStep, interval);\n}\n\n//# sourceURL=webpack:///./src/blocks/send-letter/send-letter.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _blocks_send_letter_send_letter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blocks/send-letter/send-letter */ \"./src/blocks/send-letter/send-letter.js\");\n/* harmony import */ var _blocks_letters_letters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blocks/letters/letters */ \"./src/blocks/letters/letters.js\");\n/* harmony import */ var _blocks_actions_checkbox_checkbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blocks/actions/__checkbox/__checkbox */ \"./src/blocks/actions/__checkbox/__checkbox.js\");\n/* harmony import */ var _blocks_actions_checkbox_checkbox__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_blocks_actions_checkbox_checkbox__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _blocks_letters_add_new_letter_add_new_letter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./blocks/letters/__add-new-letter/__add-new-letter */ \"./src/blocks/letters/__add-new-letter/__add-new-letter.js\");\n/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/http */ \"./src/lib/http.js\");\n/* harmony import */ var _lib_server_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/server-api */ \"./src/lib/server-api.js\");\n\n\n\n\n\n\nwindow.newMail = _blocks_send_letter_send_letter__WEBPACK_IMPORTED_MODULE_0__[\"newMail\"];\nwindow.newMailAuto = _blocks_send_letter_send_letter__WEBPACK_IMPORTED_MODULE_0__[\"newMailAuto\"];\nObject(_blocks_send_letter_send_letter__WEBPACK_IMPORTED_MODULE_0__[\"newMailAuto\"])();\nObject(_lib_server_api__WEBPACK_IMPORTED_MODULE_5__[\"loadMessages\"])(function (responseText) {\n  JSON.parse(responseText).forEach(function (letter) {\n    return Object(_blocks_letters_add_new_letter_add_new_letter__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(letter, false, 'afterbegin');\n  });\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/lib/http.js":
/*!*************************!*\
  !*** ./src/lib/http.js ***!
  \*************************/
/*! exports provided: request */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"request\", function() { return request; });\nfunction request(method, path, headers, async, onResponse) {\n  var xhr = new XMLHttpRequest();\n  xhr.open(method, path, async);\n  headers.forEach(function (header) {\n    return xhr.setRequestHeader(header.name, header.value);\n  });\n\n  if (async) {\n    xhr.onreadystatechange = function () {\n      if (xhr.readyState !== 4) return;\n\n      if (xhr.status !== 200) {\n        console.log(\"Error occurred during getting messages: \".concat(request.status, \", \").concat(request.statusText, \".\"));\n      } else {\n        if (onResponse) onResponse(xhr.responseText);\n      }\n    };\n  }\n\n  return xhr;\n}\n\n//# sourceURL=webpack:///./src/lib/http.js?");

/***/ }),

/***/ "./src/lib/latch.js":
/*!**************************!*\
  !*** ./src/lib/latch.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Latch; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Latch =\n/*#__PURE__*/\nfunction () {\n  function Latch(count, callback) {\n    _classCallCheck(this, Latch);\n\n    this.curCount = count;\n    this.callback = callback;\n  }\n\n  _createClass(Latch, [{\n    key: \"countDown\",\n    value: function countDown() {\n      this.curCount--;\n\n      if (this.curCount === 0) {\n        this.callback();\n      }\n    }\n  }]);\n\n  return Latch;\n}();\n\n\n\n//# sourceURL=webpack:///./src/lib/latch.js?");

/***/ }),

/***/ "./src/lib/server-api.js":
/*!*******************************!*\
  !*** ./src/lib/server-api.js ***!
  \*******************************/
/*! exports provided: sendMessage, deleteMessages, loadMessages, getMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sendMessage\", function() { return sendMessage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deleteMessages\", function() { return deleteMessages; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadMessages\", function() { return loadMessages; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getMessage\", function() { return getMessage; });\n/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./http */ \"./src/lib/http.js\");\n\nvar host = 'http://localhost';\nvar port = 8080;\nvar Method = {\n  GET: 'GET',\n  POST: 'POST'\n};\n\nfunction resolve(path) {\n  return \"\".concat(host, \":\").concat(port).concat(path);\n}\n\nfunction header(name, value) {\n  return {\n    name: name,\n    value: value\n  };\n}\n\nvar Headers = {\n  AppJson: header('Content-Type', 'application/json')\n};\nfunction sendMessage(msg, callback) {\n  _http__WEBPACK_IMPORTED_MODULE_0__[\"request\"](Method.POST, resolve('/send'), [Headers.AppJson], true, callback).send(JSON.stringify(msg));\n}\nfunction deleteMessages(ids, callback) {\n  _http__WEBPACK_IMPORTED_MODULE_0__[\"request\"](Method.POST, resolve('/delete'), [Headers.AppJson], true, callback).send(JSON.stringify(ids));\n}\nfunction loadMessages(callback) {\n  _http__WEBPACK_IMPORTED_MODULE_0__[\"request\"](Method.GET, resolve('/messages'), [Headers.AppJson], true, callback).send();\n}\nfunction getMessage(id, callback) {\n  _http__WEBPACK_IMPORTED_MODULE_0__[\"request\"](Method.GET, resolve(\"/messages/\".concat(id)), [Headers.AppJson], true, callback).send();\n}\n\n//# sourceURL=webpack:///./src/lib/server-api.js?");

/***/ })

/******/ });