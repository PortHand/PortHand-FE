import axios from "axios";

const domain = "http://localhost:8000/api";

const getHeaders = (type) => {
  // const token = localStorage.getItem('access_token')
  let headers = {};
  if (type === "form") headers["Content-Type"] = "multipart/form-data";
  else headers["Content-Type"] = "application/json";

  // if (token) headers['Authorization'] = `Bearer ${token}`
  return headers;
};

export const postcontactData = async (data, cb) => {
  const headers = getHeaders();
  await axios
    .post(`${domain}/postcontact/`, data, { headers })
    .then((res) => cb(null, res))
    .catch((err) => cb(err, null));
};
export const postWorkData = async (data, cb) => {
  const headers = getHeaders("form");
  await axios
    .post(`${domain}/postwork/`, data, { headers })
    .then((res) => cb(null, res))
    .catch((err) => cb(err, null));
};
export const updateWorkData = async (id, data, cb) => {
  const headers = getHeaders("form");
  await axios
    .patch(`${domain}/updatework/${id}`, data, { headers })
    .then((res) => cb(null, res))
    .catch((err) => cb(err, null));
};
export const getworkethic = async (cb) => {
  const headers = getHeaders();
  await axios
    .get(`${domain}/getworks/`, { headers })
    .then((res) => cb(null, res))
    .catch((err) => cb(err, null));
};
export const deletework = async (id, cb) => {
  const headers = getHeaders();
  await axios
    .delete(`${domain}/deleteWork/${id}`, { headers })
    .then((res) => cb(null, res))
    .catch((err) => cb(err, null));
};
export const getworkasperid = async (id, cb) => {
  const headers = getHeaders();
  await axios
    .get(`${domain}/getwork/${id}`, { headers })
    .then((res) => cb(null, res))
    .catch((err) => cb(err, null));
};
export const getaboutMe = async (cb) => {
  const headers = getHeaders();
  await axios
    .get(`${domain}/aboutme/`, { headers })
    .then((res) => cb(null, res))
    .catch((err) => cb(err, null));
};
export const updateaboutme = async (id, data, cb) => {
  const headers = getHeaders("form");
  await axios
    .patch(`${domain}/aboutme/${id}`, data, { headers })
    .then((res) => cb(null, res))
    .catch((err) => cb(err, null));
};
