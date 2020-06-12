export const fetch_channels = async (render_channel, username, socket) => {
    // fetch all the channels and their creators' names
    try {
        var requestC = await fetch('/fetch_channels')
        var channels = await requestC.json();
    } catch (e){}
    
    try {
        var requestU = await fetch('/fetch_channels_usernames');
        var channels_usernames = await requestU.json();
    } catch (e){}

    
    try {
        var requestD = await fetch('/fetch_channels_date');
        var channels_date = await requestD.json();
    } catch (e){}
    
    // render each one in turn
    for (let i = 0; i < channels.length; i++) {
        render_channel(channels[i], channels_usernames[i], channels_date[i]);
    }
    if (!channels.length == 0) {
        delete_button(username, socket);
    }
}

// the functionality of the delete channel icon
export const delete_button = (username, socket) => {
    document.querySelectorAll(".fa-times-circle").forEach(btn => {
        btn.addEventListener('click', () => {
            let creator_name = btn.nextElementSibling.lastElementChild.innerHTML;
            if (creator_name == username) {
                let channel_name = btn.parentNode.children[0].innerHTML;
                console.log(channel_name);
                // send a request to the server to delete the channel and all its data
                socket.emit("delete a channel", {'channel_name': channel_name});
            } 
            else {
                alert(`You can't delete others' channels`)
            }
        })
    })
}



// fetch all the messages of the current channel from the server
export const fetch_messages = async (channel_name, username, render_message) => {
    try {
        let request = await fetch(`/fetch_channel_messages?channel=${channel_name}`)
        let data = await request.json(request);

        // if i am the one who sent the message, render it on the right side, otherwise...
        // render it on the left side :D
        data.forEach(msg => {
            if (msg[1] == username) {
                render_message('end', msg[0], msg[1], 'right', msg[2]);
            } else {
                render_message('start', msg[0], msg[1], 'left', msg[2])
            }
        })
    } catch (e){}
}


export const load_user = (username) => {
    const request = new XMLHttpRequest();
    request.open('POST', `/get_username`);
    const data = new FormData();
    data.append('username', username);
    request.send(data)
}


export const add_channel = (channelsList,username, socket) => {
    document.querySelector(".fa-plus").onclick = () => {
        var new_channel = prompt("Enter the name of the new Channel: ");
        while (!new_channel.length > 0) {
            alert("Channel name can't be blank!");
            new_channel = prompt("Enter the name of the new Channel: ");
        }
        for (let channel of channelsList) {
            if (new_channel == channel) {
                return alert("A channel with the same name has already been created");
            }
        }
        let unique = true;
        // one more test to make sure it's unique:
        document.querySelectorAll('.channel_name').forEach(channel => {
            if(new_channel == channel.innerHTML) {
                unique = false
            }
        });

        if (!unique) {
            return alert('A channel with the same name has already been created');
        }

        // if the channel name is unique and its length is > 0, add it to the list and emit to the...
        // server that a new channel has been created
        channelsList.push(new_channel);
        // emit the data along with the channels to store all channel names on the server to be distributed to all browsers
        // upon doing so, i can prevent any duplicate channels across any connected not users ....
        // rather than preventing duplicates from a single browser, as the server data is shared with all :D
        socket.emit("add channel", {
            "channel": new_channel,
            'username': username,
            'channels': channelsList
        })
    }
}

// add the messages (emit to the server)
export const send_message = socket => {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();

    document.querySelector('.send_btn').onclick = () => {
        let message = document.querySelector('.type_msg').value;
        if (!message.length > 0) {
            return 0
        }
        // get the name of the selected channel 
        let channel_name = document.querySelector('.channel_info').childNodes[1].innerHTML;

        // clear the input after clicking the send button
        document.querySelector('.type_msg').value = "";

        socket.emit('send message', {
            'message': message,
            'username': localStorage.getItem('username'),
            'channel_name': channel_name,
            'time': format_time_AMPM(new Date)
        });
    }
}

// a function to get the day's date when the channel is created
export const get_date = () => {

    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    return mm + '/' + dd + '/' + yyyy;
}

// a function to get the time. Used when messages are sent.
// used above when emitting ti the server, for the time of the message to be stored there
const format_time_AMPM =  date => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}




