import os

from flask import Flask, request, session, jsonify, render_template
from flask_session import Session
from flask_socketio import SocketIO, emit
from datetime import datetime

app = Flask(__name__)
# app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["SECRET_KEY"] = "This is very secret"
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
socketio = SocketIO(app)
Session(app)

# list to store all users
active_users = []
# list to store all created channels
channels = []
# list to store the date of the channels creation
channels_creation_date = []
# each item correspond to the username of the user who made the channel 
# in the above list
channels_usernames = []
# each item is a list of messages of a certain channel
# corresponding to the 2 lists above this 
channel_messages = []

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/get_username", methods=["POST"])
def get_username():
    session["username"] = request.form.get('username')
    active_users.append(session['username'])
    return "success"

@app.route('/fetch_channels')
def fetch_channels():
    return jsonify(channels)


@app.route('/fetch_channels_usernames')
def fetch_channels_usernames():
    return jsonify(channels_usernames)


@app.route("/fetch_channels_date")
def fetch_channels_date():
    return jsonify(channels_creation_date)


@app.route('/fetch_channel_messages')
def fetch_channel_messages():
    try:
        channel_name = request.args.get('channel')
        index = channels.index(channel_name)
        messages = channel_messages[index]
        return jsonify(messages)
    except:
        return ""
    



    
@socketio.on('add channel')
def add_channel(data):
    channel_name = data["channel"]
    #store the creation date in the list
    channels_creation_date.append(datetime.today().strftime('%Y/%m/%d'))
    channels.append(channel_name)
    # using the index of the channel_name to get its creation date
    index = channels.index(channel_name)
    creation_date = channels_creation_date[index]
    # make a corresponding empty messages item in the messages list to be filled later on
    channel_messages.append([])
    # add the creator name to the corresponding channel username index
    channels_usernames.append(data['username'])
    username = data["username"]
    emit("render new channel", {"channel_name": channel_name, "username": username, 'channels': data['channels'], 'creation_date': creation_date}, broadcast=True)


@socketio.on('send message')
def send_message(data):
    message = data['message']
    username = data['username']
    channel_name = data['channel_name']
    # get the index of the channel the user is currently on
    index = channels.index(channel_name)
    # go to the corresponding index in the messages list and append the message along with its data
    channel_messages[index].append([message, username, data['time']])
    if len(channel_messages) > 100:
        channel_messages[index] = channel_messages[-100:]
    emit('render the sent message', {'message': message, 'username': username, 'channel_name': data['channel_name'], 'time': data['time']}, broadcast=True)


@socketio.on('delete a channel')
def delete_channel(data):
    # extract the channel name
    channel_name = data['channel_name']
    # get the index of the channel with that name
    index = channels.index(channel_name)
    # pop all the channel data from all the lists storing its data
    channels.pop(index)
    channels_creation_date.pop(index)
    channels_usernames.pop(index)
    channel_messages.pop(index)

    # send the data back to be rendered
    emit('channel deleted', {'channel_name': channel_name}, broadcast=True)


if __name__ == "__main__":
    app.run(debug=True)
