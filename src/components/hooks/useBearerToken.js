import { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { baseApiUrl } from "../constants/ApiStrings";

const url = baseApiUrl;


export default function useBearerToken() {
    const [auth] = useContext(AuthContext);

    const apiClient = axios.create({
        baseURL: url,
    });

    apiClient.interceptors.request.use(function (config) {
        const token = auth.token;
        config.headers.Authorization = token ? `Bearer ${token}` : "";
        return config
    });

    return apiClient
}