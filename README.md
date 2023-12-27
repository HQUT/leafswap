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
## File Structure
```
.
├── .firebase
├── dist/                               # for firebase deployment
│   ├── 404.html
│   └── index.html
├── src/
│   ├── js/
│   │   ├── bookSource.js
│   │   ├── Model.js
│   │   ├── promiseNoData.js
│   │   ├── Sidebar.js
│   │   ├── useModelProperty.js
│   │   └── usePromise.js
│   ├── Presenter/                      # all presenters
│   │   ├── detailsPresenter.js             # for book details (TBD)
│   │   ├── homePresenter.js                # landing page
│   │   ├── loginPresenter.js               # login screen (TBD)
│   │   └── searchPresenter.js              # search (TBD)
│   ├── views/                          # all views
│   │   ├── About.js                        # about the developers (TBD)
│   │   ├── detailsView.js                  # for book details (TBD)
│   │   ├── homeView.js                     # landing page
│   │   ├── loginView.js                    # login screen (TBD)
│   │   └── searchView.js                   # search (TBD)
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── data.js
│   ├── firebaseModel.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.jss
│   ├── setupTests.js
│   ├── slick-theme.css
│   └── slick.css
└── README.md
```
