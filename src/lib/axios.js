import axios from "axios";
import Cookie from "js-cookie";

const AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
	withCredentials: true
});

AxiosInstance.interceptors.request.use(
	(config) => {
		const csrftoken = Cookie.get("csrftoken");
		if (csrftoken) {
			config.headers["X-CSRFToken"] = csrftoken;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default AxiosInstance;
