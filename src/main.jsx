import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { SurveyProvider } from './context/SurveyContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SurveyProvider>
      <App />
    </SurveyProvider>
  </React.StrictMode>
);
