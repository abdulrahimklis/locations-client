
const BASE_URL = "http://localhost:3000/api";

const formatBody = (method, body) => {
	if (method === 'get') return {};
	else {
		return { body: JSON.stringify(body) }
	}
};

const request = async (method, url, body) => fetch(url, {
	method: method,
	headers:
	{
		// We would add an auth token here if needed, maybe something like this
		// "Authorization": "Bearer " + await localStorage.getItem("token"),
		"Content-Type": "application/json"
	},
	...formatBody(method, body)
}).then(async (res) => {
	if (res.ok) {
		return res.json();
	}
	else {
		console.log(res.status);
		throw { code: res.status, message: (await res.json()) };
	}
});

const get = (url, body = {}) => request('get', url, body);
const post = (url, body = {}) => request('post', url, body);
const put = (url, body = {}) => request('put', url, body);
const del = (url, body = {}) => request('delete', url, body);

const crud = (path) => ({
	create: (data) => post(`${BASE_URL}${path}`, data),
	update: (id, data) => put(`${BASE_URL}${path}/${id}`, data),
	delete: (id) => del(`${BASE_URL}${path}/${id}`),
	list: () => get(`${BASE_URL}${path}`),
});

export const markers = {
	...crud("/locations")
}

