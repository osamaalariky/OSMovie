import React from "react"; 

import { create, ApisauceInstance } from "apisauce";
import { getToken } from "../utility/storage";


export const apiClient: ApisauceInstance = create({
    baseURL: "https://api.themoviedb.org/3/",
    timeout: 10000,
  });
  

  

  apiClient.addAsyncRequestTransform(async (request) => {
    const authToken = await getToken();
    if (!authToken) return;
    request.headers = request.headers || {} 
    request.headers["Authorization"] = `Bearer ${authToken}`;
  });
  apiClient.addRequestTransform(request => {
    request.params = request.params || {};
    request.params['api_key'] = process.env.API_KEY;  // Append API key to every request
  });



export const IMAGE_URL = "https://image.tmdb.org/t/p/original"

export const HomeTabContext = React.createContext({})