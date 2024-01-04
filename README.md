# Leafswap
Leafswap is the pinterest of books. This app aims to let users search for books and create mini collections of them.

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
