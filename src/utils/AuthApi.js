const handleResponse = (res) => {
	if (res.ok) {
		return res.json();
	}

	// если ошибка, отклоняем промис
	return Promise.reject(new Error('Произошла ошибка'));
};

const token = localStorage.getItem('jwt');

class AuthApi {
	constructor(options) {
		this.url = options.baseUrl;
	}

	tokenValidity() {
		return fetch(`${this.url}/users/me/`, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${token}`,
			},
		}).then(handleResponse);
	}

	signUp(password, email) {
		return fetch(`${this.url}/auth/regist/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				password,
				email,
			}),
		}).then(handleResponse);
	}

	registerConfirm(email, code) {
		return fetch(`${this.url}/auth/confirm/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				code,
			}),
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
		}).then(handleResponse);
	}

	// ПОЛУЧАЕМ ВСЕ ШАБЛОНЫ
	getAllSamples() {
		return fetch(`${this.url}/documents/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${token}`,
			},
		}).then(handleResponse);
	}

	// СТАВИМ ЛАЙК
	addLike(id) {
		return fetch(`${this.url}/documents/${id}/`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${token}`,
			},
		}).then(handleResponse);
	}

	// УДАЛЯЕМ ЛАЙК
	removeLike(id) {
		return fetch(`${this.url}/documents/${id}/`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${token}`,
			},
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
				'Authorization': `Token ${token}`,
			},
		}).then(handleResponse);
	}
}

const authApi = new AuthApi({
	baseUrl: 'http://185.93.111.238/api',
});

export default authApi;
