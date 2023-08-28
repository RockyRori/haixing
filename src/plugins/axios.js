import Vue from 'vue'
import Axios from 'axios'

let config = {
	baseURL: process.env.baseURL,
	timeout: 120 * 1000,
	withCredentials: true,
}
const instance = Axios.create(config)
export default instance
