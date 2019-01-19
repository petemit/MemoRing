# MemoRing

MemoRing is the Mobile Flashcards final project for Udacity's React Nanodegree, and is a simple flashcards app that allows for creating decks with supplied questions and answers.

## Getting Started

- Install: `yarn install` or `npm install` or `expo install`
- Run: `yarn start` or `npm start` or `expo start`

## Details

This app is constructed with React Native components, and uses Styled Components (in places) for styling.  
This app has only been tested on the `Android` platform (I do not own a Mac).  The notification design has also only been designed for Android and thus will not notify the user while the user is in the app for iOS.  This is trivial since the point of the reminder is to get the user to use the app.  

The app also registers a daily notification (unless the user takes a quiz), which will remind the user to study.  
