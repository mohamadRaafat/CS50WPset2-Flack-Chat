import * as Views from "./views/views"
import * as Models from "./models/models"


document.addEventListener("DOMContentLoaded", () => {
    // redner any already created channel
    Models.fetch_channels(Views.render_channel, username, socket)

    // lw el user afal w rege3, raga3o ll channel el kan feeha
    if (localStorage.getItem('channel')) {
        var channel = localStorage.getItem('channel');
        // get the div of that channel and open it
        if (document.querySelector(`#${channel}`)) {
            setTimeout(function open_previous_channel() { document.querySelector(`#${channel}`).click() }, 2000);
        }
    }

    document.querySelector("#chat-tab").classList.add('remove-from-flow');

    
})


let username;

// if no username stored, prompt the user
while (!localStorage.getItem("username")) {
    username = prompt(`Welcome!
            Please type in your display name: `);
    if (username.length > 0) {
        localStorage.setItem("username", username);
    }
}
// store the username in localstorage, to prevent re-entering everytime
username = localStorage.getItem("username");

// load the user into the server to be registered into session['username']
Models.load_user(username);


// connect to websocket
let socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

// keep track of all channels
let channels = [];


socket.on('channel deleted', data => {
    console.log(`Deleted: ${data.channel_name}`);
    document.querySelector('#channels').innerHTML = "";
    // remove the chat tab
    document.querySelector("#chat-tab").classList.add('remove-from-flow');
    Models.fetch_channels(Views.render_channel, username, socket);
})

// add the new channel after receivSing the response from the server
socket.on('render new channel', data => {
    // store all the created channels from all the users that i just got from the server ...
    // this ensures that channel names are unique across all users :D
    channels = data.channels
    Views.render_channel(data.channel_name, data.username, data.creation_date);
    Models.delete_button(username, socket);
})

// add the message after receiving the response from the sever ===========================================================
socket.on('render the sent message', data => {
    // if this is the channel the user is currently on, render the message immediately
    if (document.querySelector('.channel_info').childNodes[1].innerHTML == data.channel_name) {
        let message = data.message;
        if (data.username == username) {
            Views.render_message('end', message, data.username, 'right', data.time);
        }
        else {
            Views.render_message('start', message, data.username, 'left', data.time)
        }   
    }
})



// when a certain channel is clicked...
document.querySelector('#channels').addEventListener('click', event => {
    document.querySelector("#chat-tab").classList.remove('remove-from-flow');
    // select the li using even delegation
    let element = event.target.closest(".channel-item");
    // highlight only the li that was clicked on, and remove the active class from any other channel
    document.querySelectorAll(".channel-item").forEach(item => {
        item.classList.remove("active");
    })
    let channel_name = element.childNodes[1].childNodes[1].childNodes[1].innerHTML;
    element.classList.add('active');
    // function to display the name of the channel in the second part
    Views.display_channel_messages_header(channel_name, 1235);

    // when a channel is clicked on, clear the channl div, to remove all the displayed messages from the UI
    //========================================================================
    // GAMMMMMEEEEEDDDDDDDDDDDDDDDDD YAAAAAAAAAAAAAAAAAAAA BROOOOOOOOOOOOOOO
    //=========================================================================
    document.querySelector('.msg_card_body').innerHTML = "";
    // then fetch and render the messages of this specific channel :D
    Models.fetch_messages(channel_name, username, Views.render_message)
    // remove spaces between words if more than one word
    channel_name = channel_name.replace(/\s/g, '')
    // store that the user is in this channel
    localStorage.setItem('channel', channel_name);

    // activate the delete button
    Models.delete_button(username, socket);
})


socket.on('connect', () => {

    // emit the channel data to the server
    Models.add_channel(channels, username, socket);

    // emit the sent message to the server
    Models.send_message(socket);

})

















