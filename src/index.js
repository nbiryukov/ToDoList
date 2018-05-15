import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';

ReactDOM.render(
  // вместо JSX элемента мы теперь рендерим App компонент
  <App />,
  document.getElementById('root')
);