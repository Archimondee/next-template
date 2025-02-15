import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import qs from "query-string"

export const getAccessToken = (): string | null => {
	return localStorage.getItem("accessToken")
}

const parseQueryParams = (url: string): any => {
	const queryString = url.split("?")[1]
	if (!queryString) return null

	return queryString.split("&").reduce(
		(acc, param) => {
			const [key, value] = param.split("=")
			//@ts-ignore
			acc[key] = value
			return acc
		},
		{} as Record<string, string>,
	)
}

// const refreshToken = async (): Promise<string | null> => {
// 	try {
// 		const refreshToken = localStorage.getItem("refreshToken");
// 		// const response = await axios.post(
// 		// 	`${Config.API_URL}/${Config.API_VERSION}/refresh-token`,
// 		// 	{
// 		// 		refreshToken,
// 		// 	}
// 		// );

// 		const newAccessToken = response.data.accessToken;
// 		localStorage.setItem("accessToken", newAccessToken);

// 		return newAccessToken;
// 	} catch (error) {
// 		throw error;
// 	}
// };

// Create Axios instance
const axiosInstance = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
	timeout: 310000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
	paramsSerializer: (params) =>
		qs.stringify(params, {
			arrayFormat: "comma",
			skipNull: true,
			skipEmptyString: true,
		}),
})

// Map to keep track of ongoing requests
const pendingRequests = new Map()

axiosInstance.interceptors.request.use(
	//@ts-ignore
	async (config: AxiosRequestConfig) => {
		const token = getAccessToken()
		if (token) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${token}`,
			}
		}

		// // Create an AbortController for the current request
		// const controller = new AbortController();
		// config.signal = controller.signal;

		// // Check if the request is already pending
		// const requestKey = `[${config.method}]-[${config.url}]-[${JSON.stringify(
		// 	config.params
		// )}]`;
		// if (pendingRequests.has(requestKey)) {
		// 	// Cancel the previous request
		// 	const previousRequest = pendingRequests.get(requestKey);
		// 	previousRequest.abort();
		// 	console.log("[Canceled]", requestKey);
		// }

		// // Store the current request in the map
		// pendingRequests.set(requestKey, controller);

		return config
	},
	(error) => Promise.reject(error),
)

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => {
		// Remove the request from the pending requests map
		const requestKey = `[${response.config.method}]-[${
			response.config.url
		}]-[${JSON.stringify(response.config.params)}]`
		pendingRequests.delete(requestKey)
		return response
	},
	async (error) => {
		const originalRequest = error.config

		// Remove the request from the pending requests map
		const requestKey = `[${originalRequest.method}]-[${
			originalRequest.url
		}]-[${JSON.stringify(originalRequest.params)}]`
		pendingRequests.delete(requestKey)

		if (
			error.response?.status === 401 &&
			!error.request?.responseURL.includes("/login") &&
			!originalRequest._retry
		) {
			localStorage.clear()

			// try {
			//   const newToken = await refreshToken();
			//   if (newToken) {
			//     originalRequest.headers.Authorization = `Bearer ${newToken}`;
			//     return axiosInstance(originalRequest);
			//   }
			// } catch (refreshError) {
			//   return Promise.reject(refreshError);
			// }
		}

		return Promise.reject(error)
	},
)

// API request functions with centralized error handling

export const apiGet = async <T>(
	endpoint: string,
	params: object = {},
): Promise<T> => {
	try {
		const response = await axiosInstance.get<T>(endpoint, { params })
		return response.data
	} catch (error) {
		handleError(error as AxiosError)
		throw error
	}
}

export const apiPost = async <T>(
	endpoint: string,
	data: object,
): Promise<T> => {
	try {
		const response = await axiosInstance.post<T>(endpoint, data)
		return response.data
	} catch (error) {
		handleError(error as AxiosError)
		throw error
	}
}

export const apiPatch = async <T>(
	endpoint: string,
	data: object,
): Promise<T> => {
	try {
		const response = await axiosInstance.patch<T>(endpoint, data)
		return response.data
	} catch (error) {
		handleError(error as AxiosError)
		throw error
	}
}

export const apiPut = async <T>(endpoint: string, data: object): Promise<T> => {
	try {
		const response = await axiosInstance.put<T>(endpoint, data)
		return response.data
	} catch (error) {
		handleError(error as AxiosError)
		throw error
	}
}

export const apiDeleteWithData = async <T>(
	endpoint: string,
	data: object,
): Promise<T> => {
	try {
		const response = await axiosInstance.delete<T>(endpoint, { data })
		return response.data
	} catch (error) {
		handleError(error as AxiosError)
		throw error
	}
}

export const apiDelete = async <T>(endpoint: string): Promise<T> => {
	try {
		const response = await axiosInstance.delete<T>(endpoint)
		return response.data
	} catch (error) {
		handleError(error as AxiosError)
		throw error
	}
}

// Centralized error handler
const handleError = (error: AxiosError) => {
	console.info("Error", error)
	// You can handle different types of errors here, such as showing notifications
	// or redirecting to login if the token is invalid.
}
