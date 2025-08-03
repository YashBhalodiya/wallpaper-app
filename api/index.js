import axios from 'axios';
import Constants from 'expo-constants';

const API_KEY = Constants.manifest.extra.apiKey;
const API_URL = `https://pixabay.com/api/?key=${API_KEY}`;

const formatUrl = (params) => {
  let url = API_URL + "&per_page=50&safeSearch=true&editors_choice=true";
  if (!params) return url;
  let paramKeys = Object.keys(params);
  paramKeys.map((key) => {
    let value = key === "q" ? encodeURIComponent(params[key]) : params[key];
    url += `&${key}=${value}`;
  });
  console.log("final url: ", url);
  return url;
};

export const apiCall = async (params) => {
  try {
    const response = await axios.get(formatUrl(params));
    const {data} = response;

    return {success: true, data};
  } catch (err) {
    console.log("got error: ", err.message);
    return { success: false, msg: err.message };
  }
};
