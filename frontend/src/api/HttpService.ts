import axiosInstance from './axiosInstance';

class HttpService {
	/**
	 * Make http post request
	 * @param {*} url - string
	 * @param {*} config - object
	 */
	get(url: string, config = {}) {
		try {
			const result = axiosInstance.get(url, config);
			return result;
		} catch (error) {
			console.log(error);
		}
	}
	/**
	 * Make http post request
	 * @param {*} url - string
	 * @param {*} data - object
	 * @param {*} config - object
	 */
	post(url: string, data: object, config = {}) {
		try {
			return axiosInstance.post(url, data, config);
		} catch (error) {
			console.log(error);
		}
	}
	/**
	 * Make http post request
	 * @param {*} url - string
	 * @param {*} data - object
	 * @param {*} config - object
	 */
	put(url: string, data: {}, config = {}) {
		try {
			return axiosInstance.put(url, data, config);
		} catch (error) {
			console.log(error);
		}
	}
	/**
	 * Make http delete request
	 * @param {*} url - string
	 * @param {*} config - object
	 */
	delete(url: string, config = {}) {
		try {
			return axiosInstance.delete(url, config);
		} catch (error) {
			console.log(error);
		}
	}
}
export default new HttpService();
