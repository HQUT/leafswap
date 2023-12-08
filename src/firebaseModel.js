// you will find 2 imports already there, add the configuration and instantiate the app and database:
import firebaseConfig from "/src/firebaseConfig.js";
const app= initializeApp(firebaseConfig)
const db= getDatabase(app)

//  PATH is the “root” Firebase path. NN is your TW2_TW3 group number
const PATH="LeafSwap";