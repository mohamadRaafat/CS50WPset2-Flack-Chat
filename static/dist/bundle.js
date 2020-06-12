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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _views_views__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./views/views */ \"./src/views/views.js\");\n/* harmony import */ var _models_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/models */ \"./src/models/models.js\");\n\r\n\r\n\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n    // redner any already created channel\r\n    _models_models__WEBPACK_IMPORTED_MODULE_1__[\"fetch_channels\"](_views_views__WEBPACK_IMPORTED_MODULE_0__[\"render_channel\"], username, socket)\r\n\r\n    // lw el user afal w rege3, raga3o ll channel el kan feeha\r\n    if (localStorage.getItem('channel')) {\r\n        var channel = localStorage.getItem('channel');\r\n        // get the div of that channel and open it\r\n        if (document.querySelector(`#${channel}`)) {\r\n            setTimeout(function open_previous_channel() { document.querySelector(`#${channel}`).click() }, 2000);\r\n        }\r\n    }\r\n\r\n    document.querySelector(\"#chat-tab\").classList.add('remove-from-flow');\r\n\r\n    \r\n})\r\n\r\n\r\nlet username;\r\n\r\n// if no username stored, prompt the user\r\nwhile (!localStorage.getItem(\"username\")) {\r\n    username = prompt(`Welcome!\r\n            Please type in your display name: `);\r\n    if (username.length > 0) {\r\n        localStorage.setItem(\"username\", username);\r\n    }\r\n}\r\n// store the username in localstorage, to prevent re-entering everytime\r\nusername = localStorage.getItem(\"username\");\r\n\r\n// load the user into the server to be registered into session['username']\r\n_models_models__WEBPACK_IMPORTED_MODULE_1__[\"load_user\"](username);\r\n\r\n\r\n// connect to websocket\r\nlet socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);\r\n\r\n// keep track of all channels\r\nlet channels = [];\r\n\r\n\r\nsocket.on('channel deleted', data => {\r\n    console.log(`Deleted: ${data.channel_name}`);\r\n    document.querySelector('#channels').innerHTML = \"\";\r\n    // remove the chat tab\r\n    document.querySelector(\"#chat-tab\").classList.add('remove-from-flow');\r\n    _models_models__WEBPACK_IMPORTED_MODULE_1__[\"fetch_channels\"](_views_views__WEBPACK_IMPORTED_MODULE_0__[\"render_channel\"], username, socket);\r\n})\r\n\r\n// add the new channel after receivSing the response from the server\r\nsocket.on('render new channel', data => {\r\n    // store all the created channels from all the users that i just got from the server ...\r\n    // this ensures that channel names are unique across all users :D\r\n    channels = data.channels\r\n    _views_views__WEBPACK_IMPORTED_MODULE_0__[\"render_channel\"](data.channel_name, data.username, data.creation_date);\r\n    _models_models__WEBPACK_IMPORTED_MODULE_1__[\"delete_button\"](username, socket);\r\n})\r\n\r\n// add the message after receiving the response from the sever ===========================================================\r\nsocket.on('render the sent message', data => {\r\n    // if this is the channel the user is currently on, render the message immediately\r\n    if (document.querySelector('.channel_info').childNodes[1].innerHTML == data.channel_name) {\r\n        let message = data.message;\r\n        if (data.username == username) {\r\n            _views_views__WEBPACK_IMPORTED_MODULE_0__[\"render_message\"]('end', message, data.username, 'right', data.time);\r\n        }\r\n        else {\r\n            _views_views__WEBPACK_IMPORTED_MODULE_0__[\"render_message\"]('start', message, data.username, 'left', data.time)\r\n        }   \r\n    }\r\n})\r\n\r\n\r\n\r\n// when a certain channel is clicked...\r\ndocument.querySelector('#channels').addEventListener('click', event => {\r\n    document.querySelector(\"#chat-tab\").classList.remove('remove-from-flow');\r\n    // select the li using even delegation\r\n    let element = event.target.closest(\".channel-item\");\r\n    // highlight only the li that was clicked on, and remove the active class from any other channel\r\n    document.querySelectorAll(\".channel-item\").forEach(item => {\r\n        item.classList.remove(\"active\");\r\n    })\r\n    let channel_name = element.childNodes[1].childNodes[1].childNodes[1].innerHTML;\r\n    element.classList.add('active');\r\n    // function to display the name of the channel in the second part\r\n    _views_views__WEBPACK_IMPORTED_MODULE_0__[\"display_channel_messages_header\"](channel_name, 1235);\r\n\r\n    // when a channel is clicked on, clear the channl div, to remove all the displayed messages from the UI\r\n    //========================================================================\r\n    // GAMMMMMEEEEEDDDDDDDDDDDDDDDDD YAAAAAAAAAAAAAAAAAAAA BROOOOOOOOOOOOOOO\r\n    //=========================================================================\r\n    document.querySelector('.msg_card_body').innerHTML = \"\";\r\n    // then fetch and render the messages of this specific channel :D\r\n    _models_models__WEBPACK_IMPORTED_MODULE_1__[\"fetch_messages\"](channel_name, username, _views_views__WEBPACK_IMPORTED_MODULE_0__[\"render_message\"])\r\n    // remove spaces between words if more than one word\r\n    channel_name = channel_name.replace(/\\s/g, '')\r\n    // store that the user is in this channel\r\n    localStorage.setItem('channel', channel_name);\r\n\r\n    // activate the delete button\r\n    _models_models__WEBPACK_IMPORTED_MODULE_1__[\"delete_button\"](username, socket);\r\n})\r\n\r\n\r\nsocket.on('connect', () => {\r\n\r\n    // emit the channel data to the server\r\n    _models_models__WEBPACK_IMPORTED_MODULE_1__[\"add_channel\"](channels, username, socket);\r\n\r\n    // emit the sent message to the server\r\n    _models_models__WEBPACK_IMPORTED_MODULE_1__[\"send_message\"](socket);\r\n\r\n})\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/models/models.js":
/*!******************************!*\
  !*** ./src/models/models.js ***!
  \******************************/
/*! exports provided: fetch_channels, delete_button, fetch_messages, load_user, add_channel, send_message, get_date */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetch_channels\", function() { return fetch_channels; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"delete_button\", function() { return delete_button; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetch_messages\", function() { return fetch_messages; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"load_user\", function() { return load_user; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"add_channel\", function() { return add_channel; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"send_message\", function() { return send_message; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"get_date\", function() { return get_date; });\nconst fetch_channels = async (render_channel, username, socket) => {\r\n    // fetch all the channels and their creators' names\r\n    try {\r\n        var requestC = await fetch('/fetch_channels')\r\n        var channels = await requestC.json();\r\n    } catch (e){}\r\n    \r\n    try {\r\n        var requestU = await fetch('/fetch_channels_usernames');\r\n        var channels_usernames = await requestU.json();\r\n    } catch (e){}\r\n\r\n    \r\n    try {\r\n        var requestD = await fetch('/fetch_channels_date');\r\n        var channels_date = await requestD.json();\r\n    } catch (e){}\r\n    \r\n    // render each one in turn\r\n    for (let i = 0; i < channels.length; i++) {\r\n        render_channel(channels[i], channels_usernames[i], channels_date[i]);\r\n    }\r\n    if (!channels.length == 0) {\r\n        delete_button(username, socket);\r\n    }\r\n}\r\n\r\n// the functionality of the delete channel icon\r\nconst delete_button = (username, socket) => {\r\n    document.querySelectorAll(\".fa-times-circle\").forEach(btn => {\r\n        btn.addEventListener('click', () => {\r\n            let creator_name = btn.nextElementSibling.lastElementChild.innerHTML;\r\n            if (creator_name == username) {\r\n                let channel_name = btn.parentNode.children[0].innerHTML;\r\n                console.log(channel_name);\r\n                // send a request to the server to delete the channel and all its data\r\n                socket.emit(\"delete a channel\", {'channel_name': channel_name});\r\n            } \r\n            else {\r\n                alert(`You can't delete others' channels`)\r\n            }\r\n        })\r\n    })\r\n}\r\n\r\n\r\n\r\n// fetch all the messages of the current channel from the server\r\nconst fetch_messages = async (channel_name, username, render_message) => {\r\n    try {\r\n        let request = await fetch(`/fetch_channel_messages?channel=${channel_name}`)\r\n        let data = await request.json(request);\r\n\r\n        // if i am the one who sent the message, render it on the right side, otherwise...\r\n        // render it on the left side :D\r\n        data.forEach(msg => {\r\n            if (msg[1] == username) {\r\n                render_message('end', msg[0], msg[1], 'right', msg[2]);\r\n            } else {\r\n                render_message('start', msg[0], msg[1], 'left', msg[2])\r\n            }\r\n        })\r\n    } catch (e){}\r\n}\r\n\r\n\r\nconst load_user = (username) => {\r\n    const request = new XMLHttpRequest();\r\n    request.open('POST', `/get_username`);\r\n    const data = new FormData();\r\n    data.append('username', username);\r\n    request.send(data)\r\n}\r\n\r\n\r\nconst add_channel = (channelsList,username, socket) => {\r\n    document.querySelector(\".fa-plus\").onclick = () => {\r\n        var new_channel = prompt(\"Enter the name of the new Channel: \");\r\n        while (!new_channel.length > 0) {\r\n            alert(\"Channel name can't be blank!\");\r\n            new_channel = prompt(\"Enter the name of the new Channel: \");\r\n        }\r\n        for (let channel of channelsList) {\r\n            if (new_channel == channel) {\r\n                return alert(\"A channel with the same name has already been created\");\r\n            }\r\n        }\r\n        let unique = true;\r\n        // one more test to make sure it's unique:\r\n        document.querySelectorAll('.channel_name').forEach(channel => {\r\n            if(new_channel == channel.innerHTML) {\r\n                unique = false\r\n            }\r\n        });\r\n\r\n        if (!unique) {\r\n            return alert('A channel with the same name has already been created');\r\n        }\r\n\r\n        // if the channel name is unique and its length is > 0, add it to the list and emit to the...\r\n        // server that a new channel has been created\r\n        channelsList.push(new_channel);\r\n        // emit the data along with the channels to store all channel names on the server to be distributed to all browsers\r\n        // upon doing so, i can prevent any duplicate channels across any connected not users ....\r\n        // rather than preventing duplicates from a single browser, as the server data is shared with all :D\r\n        socket.emit(\"add channel\", {\r\n            \"channel\": new_channel,\r\n            'username': username,\r\n            'channels': channelsList\r\n        })\r\n    }\r\n}\r\n\r\n// add the messages (emit to the server)\r\nconst send_message = socket => {\r\n    var today = new Date();\r\n    var time = today.getHours() + \":\" + today.getMinutes();\r\n\r\n    document.querySelector('.send_btn').onclick = () => {\r\n        let message = document.querySelector('.type_msg').value;\r\n        if (!message.length > 0) {\r\n            return 0\r\n        }\r\n        // get the name of the selected channel \r\n        let channel_name = document.querySelector('.channel_info').childNodes[1].innerHTML;\r\n\r\n        // clear the input after clicking the send button\r\n        document.querySelector('.type_msg').value = \"\";\r\n\r\n        socket.emit('send message', {\r\n            'message': message,\r\n            'username': localStorage.getItem('username'),\r\n            'channel_name': channel_name,\r\n            'time': format_time_AMPM(new Date)\r\n        });\r\n    }\r\n}\r\n\r\n// a function to get the day's date when the channel is created\r\nconst get_date = () => {\r\n\r\n    var today = new Date();\r\n    var dd = today.getDate();\r\n\r\n    var mm = today.getMonth() + 1;\r\n    var yyyy = today.getFullYear();\r\n    if (dd < 10) {\r\n        dd = '0' + dd;\r\n    }\r\n\r\n    if (mm < 10) {\r\n        mm = '0' + mm;\r\n    }\r\n\r\n    return mm + '/' + dd + '/' + yyyy;\r\n}\r\n\r\n// a function to get the time. Used when messages are sent.\r\n// used above when emitting ti the server, for the time of the message to be stored there\r\nconst format_time_AMPM =  date => {\r\n    var hours = date.getHours();\r\n    var minutes = date.getMinutes();\r\n    var ampm = hours >= 12 ? 'pm' : 'am';\r\n    hours = hours % 12;\r\n    hours = hours ? hours : 12; // the hour '0' should be '12'\r\n    minutes = minutes < 10 ? '0' + minutes : minutes;\r\n    var strTime = hours + ':' + minutes + ' ' + ampm;\r\n    return strTime;\r\n}\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/models/models.js?");

/***/ }),

/***/ "./src/views/views.js":
/*!****************************!*\
  !*** ./src/views/views.js ***!
  \****************************/
/*! exports provided: render_channel, render_message, display_channel_messages_header */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render_channel\", function() { return render_channel; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render_message\", function() { return render_message; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"display_channel_messages_header\", function() { return display_channel_messages_header; });\n// function to add the channel on the UI\r\nconst render_channel = (channel_name, username, get_date) => {\r\n    let channelHTML = `<li class=\"channel-item\" id=\"${channel_name.replace(/\\s/g, '')}\">\r\n                                <div class=\"d-flex bd-highlight\">\r\n                                    <div class=\"user_info\">\r\n                                        <span class=\"channel_name\">${channel_name}</span> <i class='far fa-times-circle'></i>\r\n                                        <p>Created on: ${get_date} by <span id='creator-name' style='font-size:10px;color: white;'>${username}</span></p>\r\n                                    </div>\r\n                                </div>\r\n                            </li>`\r\n    document.querySelector('#channels').insertAdjacentHTML(\"beforeend\", channelHTML);\r\n}\r\n\r\n// function to render the message to the UI\r\nconst render_message = (position, message, username, alignment, time) => {\r\n    let html = `<div class=\"d-flex justify-content-${position} mb-5\">\r\n                    <div class=\"msg_cotainer\">\r\n                        ${message}\r\n                        <span class=\"msg_time w-100 text-${alignment}\">${username} <br>${time}</span>\r\n                    </div>\r\n                </div>`\r\n    document.querySelector('.msg_card_body').insertAdjacentHTML('beforeend', html);\r\n}\r\n\r\n// display the name of the channel in the header of the chat part \r\nconst display_channel_messages_header = (channel_name, number_of_messages) => {\r\n    let html = `<div class=\"user_info channel_info\">\r\n                    <span>${channel_name}</span>\r\n                </div>`;\r\n    document.querySelector(\"#channel_info\").innerHTML = html;\r\n}\n\n//# sourceURL=webpack:///./src/views/views.js?");

/***/ })

/******/ });