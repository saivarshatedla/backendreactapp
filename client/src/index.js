import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import App from './components/App';

// 1

// 2
const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

// 3
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// 4
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
