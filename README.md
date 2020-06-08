# UDACICARDS

Udacicards is a react-native flashcards application for android and IOS.



## INSTALLATION

Clone this repo into a new folder.

Make sure you have expo-cli installed to test this in your development server. run `npm install -g expo-cli`. Then run `expo whoami` to confirm installation.

find the expo-cli documentation here:

https://docs.expo.io/workflow/expo-cli/



After expo-cli is installed, in the same directory as the cloned repo, run `npm install` in the command line to install all project depencies.


begin the development server using `expo start`.

expo-cli can run IOS or Android Simulators, or can also be run in web development mode.

Web Development mode has a known issue with notifications. See ISSUES below.


to set up an IOS simulator:

https://www.macinstruct.com/node/494#:~:text=Installing%20the%20iOS%20Simulator%20on%20Your%20Mac&text=Download%20and%20install%20Xcode%20from,Open%20the%20iPhone%20Simulator%20application.

to set up an Android Simulator:

https://citi.io/2020/01/23/simple-steps-to-get-android-emulator-on-ios/

That's it!


## ISSUES

There is known issue using notifications in web-development mode of expo-cli. Notifications as-of-yet does not support web.

You can see the issue being tracked here:

https://github.com/expo/expo/issues/6895

To run this app in web development mode, comment out all Notification handling:

App.js line: 36
components/DeckView.js line: 42

## LAYOUT

#### DECK LIST

This is a view of all your decks.

Click on a deck to begin adding cards and quizzing yourself.

Add new decks with the bottom tab router.

#### DECK VIEW

View for an individual deck

Quiz yourself, add new cards, or delete the deck.

The APP will notify you to study every day at 8pm unless you have already visited a deck that day.

Notfication for the day will clear once this page is visited.


Thats it! Enjoy UDACICARDS






Project Developed in Expo Snack

All projects created in Snack are publicly available, so you can easily share the link to this project via link, or embed it on a web page with the **Embed** button.

If you're having problems, you can tweet to us [@expo](https://twitter.com/expo) or ask in our [forums](https://forums.expo.io).

Snack is Open Source. You can find the code on the [GitHub repo](https://github.com/expo/snack-web).
