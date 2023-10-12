const handleResponse = (res) => {
	if (res.ok) {
		return res.json();
	}

	// если ошибка, отклоняем промис
	return Promise.reject(new Error('Произошла ошибка'));
};

const token = localStorage.getItem('jwt');
const currentUrl = window.location.origin;

class AuthApi {
	constructor(options) {
		this.url = options.baseUrl;
	}

	tokenValidity() {
		return fetch(`${this.url}/users/me/`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
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
			},
		}).then(handleResponse);
	}

	// СТАВИМ ЛАЙК
	addLike(item) {
		console.log('Токен', localStorage.getItem('jwt'));
		if (localStorage.getItem('jwt')) {
			return fetch(`${this.url}/documents/${item.id}/favourite/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${localStorage.getItem('jwt')}`,
				},
				body: JSON.stringify({
					title: item.title,
					document: item,
				}),
			}).then(handleResponse);
		}
	}

	// УДАЛЯЕМ ЛАЙК
	removeLike(id) {
		console.log(
			'ПРИ ПОЛУЧЕНИИ ДИЗЛАЙКЕ В ЗАГАЛОВКЕ',
			`Authorization : Token ${token}`
		);
		return fetch(`${this.url}/users/favourite/${id}/`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${localStorage.getItem('jwt')}`,
			},
		}).then(handleResponse);
	}

	//  awards: false,
	// 	appreciations: false,
	// 	certificates: false,
	// 	is_horizontal: false,
	// 	is_vertical: false,

	// ОТПРАВЛЯЕМ ЗАБРОС ФИЛЬТРАЦИИ ШАБЛОНОВ
	handleFilterSamples(obj) {
		const queryParams = [];
		Object.keys(obj).forEach((key) => {
			if (key === 'is_horizontal' && obj[key]) {
				// Если ключ 'is_horizontal' равен true, добавляем его к queryParams без 'category'
				queryParams.push(`is_horizontal=true`);
			} else if (key === 'is_vertical' && obj[key]) {
				queryParams.push(`is_horizontal=false`);
			} else if (obj[key]) {
				// Если ключ не 'is_horizontal' и его значение равно true, добавляем его к queryParams с 'category'
				queryParams.push(`category=${key}`);
			}
		});

		const queryString = queryParams.join('&');
		const url = `${this.url}/documents/${
			queryString.length === 0 ? '' : `?${queryString}`
		}`;

		console.log('ПРИ ЗАПРОСЕ ФИЛЬТРАЦИИ ПУТЬ', `ТАКОЙ ${url}`);
		return fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(handleResponse);
	}

	handleFontFamily(fontUrl) {
		const formData = new FormData();
		formData.append('font_file', fontUrl);

		return fetch(`${this.url}/font/`, {
			method: 'POST',
			body: formData,
		}).then(handleResponse);
	}

	handleDeleteFontFamily(id) {
		return fetch(`${this.url}/font/${id}/`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				// Authorization: `Token ${localStorage.getItem('jwt')}`,
			},
		});
	}
}

const authApi = new AuthApi({
	baseUrl:
		currentUrl === 'http://certificates.acceleratorpracticum.ru'
			? 'http://certificates.acceleratorpracticum.ru/api'
			: 'http://185.93.111.238/api',
});

export default authApi;
