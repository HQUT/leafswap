# Leafswap
Leafswap is the pinterest of books. This app aims to let users search for books and create mini collections of them.

- Link to the deployed app:
https://leafswap.web.app

## What's been done
- Home Page
- Sidebar and routing (partially)
- Search (partially)
- Aesthetic of login/sign up page
- Profile component 
- Authentication
- Search Function working properly
- BookDetails
- Proper routing of the whole sidebar
- Collections
- Persistence of data to Firebase small fix


## What's left to do
EVERYTHING SEEMS TO BE DONE !!

## User Feedback
During the evaluation phase, we presented the application to some users. We received some feedback on the app, and we have tried to implement and update the application according to this feedback. 

User Feedback:
- Make the logo clickable to navigate to the home page.
- The collection should not be visible in the sidebar if the user is not logged in.
- Add a background detail in the book description to make it easier to read, otherwise the page's background and text color can make it difficult.
- Add a slogan that briefly describes the purpose of the application.

This was the feedback we received from some users. We have tried to update the application to meet these requirements.

Otherwise, users liked the idea of the application and found it useful. They thought having a profile made it more personal and appreciated being able to create a named collection with their own names. 

## Prerequisites
- Node.js (version 14.x or higher)
- npm (version 6.x or higher) or Yarn (version 1.x or higher)

## Installation
1. Clone the repository with Git:
```javascript
git clone [repository URL]
```
2. Navigatw to the project directory:
```javascript
cd [leafswap]
```
3. Install dependencies using: 
```javascript
npm install
```

## Configuration
This application interacts with external API wich is: https://developers.google.com/books/docs/v1/getting_started?csw=1

1. API Key: 
You have to obtain an API key from google Books

2. Create Config file:
Under the folder js, create a file and call inte apiConfig.js

- In the Config file add the following line:
```javascript
export const API_KEY=your-external-api-key;
export const BASE_URL = "https://www.googleapis.com/books/v1";
```
This applikation use firebase for the backend services. To configure Firebase:

1. Create a firebase Project: 
Create a Firebase project at Firebase Console.

2. Get Firebase Configuration: 
n your Firebase project, navigate to the project settings, and find your Firebase configuration object, which should looks like this:

```javascript
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project-auth-domain",
    databaseURL: "your-database-url",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id",
    measurementId: "your-measurement-id"
};
```
3. Create firebaseConfig file:
Under the 'src' folder create a new file and call inte 'firebaseConfig.js' and add you firebase Configuration, which should look like this:

```javascript 
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // ...other keys
};

const app = initializeApp(firebaseConfig);
export { app };
```
## Running the Aplication

To start the application in development mode, run:
```javascript
npm start
```
## Deployment

This application is configured to be deployed using Firebase Hosting, which provides fast and secure hosting for your web app. Follow these steps to deploy your application: 

# Prerequisites
- Ensure you have Firebase CLI installed. If not, install it globally via npm:
```javascript
npm install -g firebase-tools
```
- You should already have a Firebase project set up as described in the Configuration section.

# Initial Setup
1. gin to Firebase: Run the following command and follow the prompts to log in to Firebase:
```javascript
firebase login
```
2. Initialize Firebase in Your Project: In your project directory, run:
```javascript
firebase init
```
- Choose Hosting when prompted for which Firebase services you want to set up.
- Select the Firebase project you created for this app.
- Specify build as your public directory (this is where create-react-app builds your project).
- Configure as a single-page app by responding yes when asked.
- Choose not to overwrite your existing index.html

# Building the Application
Before deploying, you need to create a production build of your app. Use this command which compiles your application into static files in the 'build' folder:
```javascript
npm run build
```
# Deploying to Firebase Hosting
After building your application, deploy it to Firebase Hosting using:
```javascript
firebase deploy
```
# Update and Redeploy
Whenever you make changes to your app:

- Rebuild your application using 'npm run build'.

- Deploy the updated build using 'firebase deploy'.


## File Structure
```
.
├── .firebase
├── dist/                               # for firebase deployment
│   ├── 404.html
│   └── index.html
├── src/
│   ├── js/
│   │   ├── komponenter/
│   │   │   ├── Sidebar.js
│   │   │   ├── picture.js 
│   │   │   ├── profile.js 
│   │   │   ├── ProfileContext.js 
│   │   │   └── profilePicture.css
│   │   ├── bookSource.js
│   │   ├── Model.js
│   │   ├── useModelProperty.js
│   │   └── Promise.js
│   ├── Presenter/                      # all presenters
│   │   ├── bookCollectionPresenter.js      # Collection page 
│   │   ├── detailsPresenter.js             # for book details 
│   │   ├── homePresenter.js                # landing page
│   │   ├── loginPresenter.js               # login screen 
│   │   └── searchPresenter.js              # search 
│   ├── views/                          # all views
│   │   ├── About.js                        # about the developers (TBD)
│   │   ├── bookCollectionView.js           # for Collection
│   │   ├── detailsView.js                  # for book details 
│   │   ├── homeView.js                     # landing page
│   │   ├── loginView.js                    # login screen 
│   │   └── searchView.js                   # search 
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── data.js
│   ├── firebaseModel.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.jss
│   ├── slick-theme.css
│   └── slick.css
└── README.md
```
