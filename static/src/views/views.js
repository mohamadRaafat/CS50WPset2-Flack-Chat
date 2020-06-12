// function to add the channel on the UI
export const render_channel = (channel_name, username, get_date) => {
    let channelHTML = `<li class="channel-item" id="${channel_name.replace(/\s/g, '')}">
                                <div class="d-flex bd-highlight">
                                    <div class="user_info">
                                        <span class="channel_name">${channel_name}</span> <i class='far fa-times-circle'></i>
                                        <p>Created on: ${get_date} by <span id='creator-name' style='font-size:10px;color: white;'>${username}</span></p>
                                    </div>
                                </div>
                            </li>`
    document.querySelector('#channels').insertAdjacentHTML("beforeend", channelHTML);
}

// function to render the message to the UI
export const render_message = (position, message, username, alignment, time) => {
    let html = `<div class="d-flex justify-content-${position} mb-5">
                    <div class="msg_cotainer">
                        ${message}
                        <span class="msg_time w-100 text-${alignment}">${username} <br>${time}</span>
                    </div>
                </div>`
    document.querySelector('.msg_card_body').insertAdjacentHTML('beforeend', html);
}

// display the name of the channel in the header of the chat part 
export const display_channel_messages_header = (channel_name, number_of_messages) => {
    let html = `<div class="user_info channel_info">
                    <span>${channel_name}</span>
                </div>`;
    document.querySelector("#channel_info").innerHTML = html;
}