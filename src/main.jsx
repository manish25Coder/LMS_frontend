//Components imports 
import App from './App.jsx'
//importing css
import './index.css'
//Library imports 
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
