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
		return fetch(`${this.url}/users/me`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}).then(handleResponse);
	}

	signUp(password, email) {
		return fetch(`${this.url}/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				password,
				email,
				username: 'kza',
				first_name: 'hello',
				last_name: 'ggadad',
			}),
			// Здесь захардкожены username, firstname, lastname - так как это пока что обязательные поля в схеме, но потом можно их уберут и тут можно эти 3 строки стереть, и всё будет работать
		}).then(handleResponse);
	}

	signIn(password, email) {
		return fetch(`${this.url}/auth/token/login`, {
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
}

const authApi = new AuthApi({
	baseUrl: 'http://127.0.0.1:8000/api',
	// НУЖНО ПОМЕНЯТЬ АДРЕС НА АДРЕС СЕРВЕРА!!!
});

export default authApi;
