This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# OSMovie App

OSMovie is a mobile application developed using React Native and TypeScript, designed to interact with The Movie Database (TMDB) API. The app allows users to explore trending movies, manage personal watchlists, and interact with movie details including posting and deleting ratings.

## Features

- **Login**: Users can log in using credentials registered on www.themoviedb.org.
- **Dashboard**: Displays a list of trending movies, which updates regularly based on TMDB data.
- **Search Functionality**: Allows users to search for movies by title within TMDB's extensive database.
- **Movie Details and Ratings**:
  - View detailed information about each movie including descriptions, release dates, and user ratings.
  - Post new ratings for movies.
  - Delete existing ratings.
- **Watchlist**:
  - Add movies to a personal watchlist.
  - View a list of movies in the watchlist.
- **Profile**:
  - Display user profile information.
  - Logout functionality to securely exit the app.

## Technologies Used

- **React Native**: Used for building the mobile application, providing a native feel with cross-platform capabilities.
- **TypeScript**: Enhances development experience with static type definitions.
- **Context API**: Manages the global state of user authentication and session management.
- **React Navigation**: Handles navigation between different screens and states within the app.
- **AsyncStorage**: Used for storing user preferences and session data locally.
- **ApiSauce**: Simplifies Axios communication with TMDB API for fetching and sending data.
- **Iconsax**: Provides icons used throughout the user interface for visual enhancements.

## Setup and Running the Project

1. **Clone the repository**:
2. **Install dependencies**:
   by running `npm install` or `yarn install` in your terminal.

## Additional Notes

- Ensure you have a valid API key from TMDB to interact with the database.

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

## Developer

Developed by Osama Alariky

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
  > > > > > > > bf87b8d (Initial commit)
