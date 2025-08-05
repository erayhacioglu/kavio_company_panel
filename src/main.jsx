import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import "./i18n.js";
//styles
import "./styles/main.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'sweetalert2/src/sweetalert2.scss'
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration:2500
        }}
      />
    </BrowserRouter>
  </HelmetProvider>,
)