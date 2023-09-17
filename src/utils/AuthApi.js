const handleResponse = (res) => {
	if (res.ok) {
		return res.json();
	}

	// если ошибка, отклоняем промис
	return Promise.reject(new Error('Произошла ошибка'));
};

class AuthApi {
	constructor(options) {
		this.url = options.baseUrl;
	}

	tokenValidity() {
		const token = localStorage.getItem('jwt');
		return fetch(`${this.url}/users/me/`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			},
			referrerPolicy: "unsafe-url" 
		}).then(handleResponse);
	}

	signUp(password, email) {
		return fetch(`${this.url}/users/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				password,
				email,
			}), 
			referrerPolicy: "unsafe-url" 
		}).then(handleResponse);
	}

	registerConfirm(email, code) {
		return fetch(`${this.url}/confirm/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				code,
			}),
			referrerPolicy: "unsafe-url" 
		}).then(handleResponse);
	}

	signIn(password, email) {
		return fetch(`${this.url}/auth/token/login/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				password,
				email,
			}),
			referrerPolicy: "unsafe-url" 
		}).then(handleResponse);
	}

	// ПОЛУЧАЕМ ВСЕ ШАБЛОНЫ
	getAllSamples() {
		return fetch(`${this.url}/documents`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}, 
			referrerPolicy: "unsafe-url" 
		}).then(handleResponse);
	}

	// ОТПРАВЛЯЕМ ЗАБРОС ФИЛЬТРАЦИИ ШАБЛОНОВ
	handleFilterSamples(obj) {
		const queryParams = [];
		Object.keys(obj).forEach((key) => {
			if (obj[key]) {
				queryParams.push(`category=${key}=`);
			}
		});

		const queryString = queryParams.join('&');
		const url = `${this.url}/documents/?${queryString}True`;
		return fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			referrerPolicy: "unsafe-url" 
		}).then(handleResponse);
	}
}

const authApi = new AuthApi({
	baseUrl: 'http://185.93.111.238/api',
});

export default authApi;
