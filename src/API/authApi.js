import axios from "axios";
const domain = process.env.REACT_APP_DOMAIN;

const getHeaders = (type) => {
  const token = localStorage.getItem("admin_acess_token");
  let headers = {};
  if (type === "form") headers["Content-Type"] = "multipart/form-data";
  else headers["Content-Type"] = "application/json";

  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

export const verifyToken = (cb) => {
  const headers = getHeaders();
  axios
    .get(`${domain}/verifyadmin`, { headers })
    .then((res) => cb(null, res))
    .catch((err) => cb(err, null));
};
export const logoutadmin = (cb) => {
  const headers = getHeaders();
  axios
    .get(`${domain}/logout`, { headers })
    .then((res) => cb(null, res))
    .catch((err) => cb(err, null));
};
export const postlogin = (data, cb) => {
  const headers = getHeaders();
  axios
    .post(`${domain}/adminlogin`, data, headers)
    .then((res) => cb(null, res))
    .catch((err) => cb(err, null));
};
