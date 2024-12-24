import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css'; // Ensure this path matches your styles file
import App from './App'; // Ensure App is properly exported

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://your-api-endpoint/graphql',
  cache: new InMemoryCache(),
});      // TODO  Replace 'https://your-api-endpoint/graphql' with your API endpoint


ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root')
  );  // Dom remeber to check this Ensure this matches the id in `public/index.html`

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Ensure this matches the id in `public/index.html`
);
