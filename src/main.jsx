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
import { Provider } from 'react-redux';
import store from "./redux/store";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 2500,
          }}
        />
      </Provider>
    </BrowserRouter>
  </HelmetProvider>
);