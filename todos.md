# when the user opens the website for the first time, they should be prompted to type in a display name. If the user closes the app and re-open it, the display name should still be remembered (garab localstorage hena) DONEE

# any user should be able to create a new channel, BUT channel names should be unique (keep track in a list masalan, ajax) DONE

# users should be able to see a list of all current channels, they can select any channel to view it. (websocket) DONE
e3ml div wahed w 8ayar el gowaah, clear it lama tdos 3ala channel gededa, fetch el messages w render :D <3 

# once the channel is selected, the user should see any messages that have already been sent in that channel. Max  of 100 messages. YOU should only store only the last 100 messages per channel in SERVER-SIDE memory (websocket) DONE
=> e3mlha zay ma 3amalt render_channel on dom content loaded keda
- e3ml array data structure, el channel w osadha kol el message b who sent and any other data
- fetch on DOM content loaded

# once entered a channel, users should be able to send messages, when a user send a message, their name and timestamp of the message should be associated with the message. then all users in the channel should see the sent message WITHOUT reloading (websocket) DOONEE

# If a user is on a channel page, closes the web browser window, and goes back to your web application, your application should remember what channel the user was on previously and take the user back to that channel. (session aw local storage) DOONNEEEE

# Personal Touch: Add at least one additional feature to your chat application of your choosing! Feel free to be creative, but if you’re looking for ideas, possibilities include: supporting deleting one’s own messages, supporting use attachments (file uploads) as messages, or supporting private messaging between two users. DONEE

# In README.md, include a short writeup describing your project, what’s contained in each file. Also, include a description of your personal touch and what you chose to add to the project. DOONEE

# If you’ve added any Python packages that need to be installed in order to run your web application, be sure to add them to requirements.txt! DOONEE