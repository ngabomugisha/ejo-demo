import axios from "axios";

const https = axios.create({
	//baseURL: "http://192.168.0.102:9000/api",
	baseURL: process.env.REACT_APP_API_BASE_URL,
});

//

https.interceptors.request.use((requestConfig) => {
	const token = localStorage.getItem("token");
	requestConfig.headers.Authorization = `Bearer ${token}`;
	return requestConfig;
});

https.interceptors.response.use(
	(res) => res.data,
	(err) => {
		throw err.response?.data || err.response || err.message;
	}
);
export default https;
