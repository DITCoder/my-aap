import {React,Route} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'; 
import reportWebVitals from './reportWebVitals';
import {createRoot} from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider
import App from './App'; // Your main app component
import store from './store'; // Your Redux store
import {StrictMode} from 'react'; 
import { ApolloProvider, ApolloClient, InMemoryCache  } from "@apollo/client";
 

const rootElement = document.getElementById('root');
const root = 
createRoot(rootElement);

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql/", // Replace with your GraphQL endpoint
   cache: new InMemoryCache() 
})
client.refetchQueries({ include: ["ExampleQuery"] });



root.render(
  <StrictMode>
     <ApolloProvider client={client}>
    <Provider store={store}>
    <App />
    </Provider>
    </ApolloProvider>
  </StrictMode>,
);

// const root = ReactDOM.createRoot(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );
// root.render();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
