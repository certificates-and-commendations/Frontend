import ButtonDowload from './ButtonDowload';
import './ButtonDowload.css';

export default {
	title: 'UI/ Кнопка Скачать в шапке на стр Редактора',
	component: ButtonDowload,
	tags: ['autodocs'],
	argTypes: {
		onDownload: {
			type: 'func',
			description: 'функ скачать на устройство',
		},
		onPrint: {
			type: 'func',
			description: 'функ отправить на печать',
		},
		onMail: {
			type: 'func',
			description: 'функ отправить на почту',
		},
	},
};

const Template = (args) => <ButtonDowload {...args} />;

export const DefaultButtonDowload = Template.bind({});
DefaultButtonDowload.args = {
	onDownload: () => console.log('Downloading...'),
	onPrint: () => console.log('Printing...'),
	onMail: () => console.log('Mailing ? )))'),
};
