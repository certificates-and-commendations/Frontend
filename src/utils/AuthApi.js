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

	resetPassword(newPassword, reNewPassword) {
		return fetch(`${this.url}/auth/reset_password/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				new_password: newPassword,
				re_new_password: reNewPassword,
			}),
		}).then(handleResponse);
	}

	sendResetCode(email, code) {
		return fetch(`${this.url}/auth/send_reset_code/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
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
		return fetch(`${this.url}/documents/${id}/favourite/`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${localStorage.getItem('jwt')}`,
			},
		}).then(handleResponse);
	}

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

	handleFontFamily(csvFile) {
		const formData = new FormData();

		// Создайте файловый объект из .csv-файла
		const file = new File([csvFile], 'names.csv', { type: 'text/csv' });

		// Добавьте файловый объект к FormData
		formData.append('csv_file', file);

		return fetch(`${this.url}/font/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${localStorage.getItem('jwt')}`,
			},
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

	handleCreateDocument(textData) {
		// создание готовой грамоты
		const title = textData.title.join('');

		const background = textData.background.join('');

		const texts = textData.texts;

		const Elements = textData.Element;

		return fetch(`${this.url}/documents/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${localStorage.getItem('jwt')}`,
			},
			body: JSON.stringify({
				title,
				background,
				texts,
				elements: Elements,
			}),
		}).then(handleResponse);
	}

	handleLoadingDocument(fileArray) {
		// загрузка грамот и их сохранение
		const file = fileArray.file.name;
		const base64 = fileArray.base64;

		return fetch(`${this.url}/documents/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: file,
				background: base64,
			}),
		}).then(handleResponse);
	}

	handleGetUsersDocument() {
		return fetch(`${this.url}/profile/`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${localStorage.getItem('jwt')}`,
			},
		}).then(handleResponse);
	}

	handleGetUsersDocumentById(id) {
		return fetch(`${this.url}/documents/${id}/`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${localStorage.getItem('jwt')}`,
			},
		}).then(handleResponse);
	}

	handleUploadFile(data) {
		const formData = new FormData();
		formData.append('csvFile', data[0], 'csvFile');
		return fetch(`${this.url}/documents/upload/`, {
			method: 'POST',
			headers: {
				Authorization: `Token ${localStorage.getItem('jwt')}`,
				'Content-Disposition': `attachment; name="file"; filename="names.csv"`,
				// 'Content-Disposition': `form-data; name="file"; filename="names.csv"`,
			},
			body: formData,
		}).then(handleResponse);
	}
}

const authApi = new AuthApi({
	baseUrl:
		currentUrl === 'https://certificates.acceleratorpracticum.ru'
			? 'https://certificates.acceleratorpracticum.ru/api'
			: currentUrl === 'http://localhost:3000'
			? 'http://127.0.0.1:8000/api'
			: 'https://185.93.111.238/api',
});

export default authApi;
