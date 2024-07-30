import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import {FirebaseContext} from './store/Context'
import Context from './store/Context'
import {firestore, auth, storage} from './firebase/config';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
<React.StrictMode>
    <FirebaseContext.Provider value={{ firestore, auth, storage}}>
    <Context>
    <App />
    </Context>
    </FirebaseContext.Provider>
</React.StrictMode>);




































// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App';
// import {FirebaseContext} from './store/FirebaseContext'
// import {auth, firestore, storage} from './firebase/config';


// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(
// <React.StrictMode>
//     <FirebaseContext.Provider value={{auth, firestore, storage}}>
//     <App />
//     </FirebaseContext.Provider>
    
// </React.StrictMode>);