import React from "react"; 

import { create, ApisauceInstance } from "apisauce";
import { getToken } from "../utility/storage";

export const apiClient: ApisauceInstance = create({
    baseURL: "https://api.themoviedb.org/3/",
    timeout: 10000,
  });
  

  const api_key = '8e50b73b695ccb38792dd13f74e50b4d';
  

  apiClient.addAsyncRequestTransform(async (request) => {
    const authToken = await getToken();
    if (!authToken) return;
    request.headers = request.headers || {} 
    request.headers["Authorization"] = `Bearer ${authToken}`;
  });

  apiClient.addRequestTransform(request => {
    request.params = request.params || {};
    request.params['api_key'] = api_key; 
  });



export const IMAGE_URL = "https://image.tmdb.org/t/p/original"

export const HomeTabContext = React.createContext({})