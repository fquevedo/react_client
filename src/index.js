
import React from "react";
import ReactDOM from 'react-dom';
import { store } from "./app/store";
import { Provider } from "react-redux";
import App from './App';
import './styles/main.css';
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
