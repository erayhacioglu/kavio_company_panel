import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: API_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getToken = () => {
  return localStorage.getItem("accessToken");
};

instance.interceptors.request.use(async function (config) {
  let token = getToken();

  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }

//   instance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response) {
//         if (error.response.status === 401) {
//           OAuth.logout();
//         }
//       } else {
//         console.log("Ağ hatası veya başka bir hata:", error);
//       }

//       return Promise.reject(error);
//     }
//   );

  return config;
});

export default instance;
