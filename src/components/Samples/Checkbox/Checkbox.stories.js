import { Checkbox } from './Checkbox';
import './Checkbox.css';

export default {
	title: 'UI/ Кнопка фильтра',
	component: Checkbox,
	tags: ['autodocs'],
	argTypes: {
		text: {
			type: 'string',
			description: 'Текст кнопки',
			defaultValue: 'Кнопка',
		},
		onClick: {
			type: 'func',
			description: 'функция клика',
		},
		name: {
			type: 'string',
			description: 'имя кнопки в стейте',
			defaultValue: 'diplomas',
		},
		state: {
			type: 'object',
			description: 'стейт со всеми кнопками',
			defaultValue: {
				diplomas: false,
				thanks: false,
				certificates: false,
				is_vertical: false,
				is_horizontal: false,
			},
		},
	},
};

const Template = (args) => <Checkbox {...args} />;

export const DefaultCheckbox = Template.bind({});
DefaultCheckbox.args = {
	text: 'кнопка',
	onClick: () => console.log('Click'),
	name: 'diplomas',
	state: {
		diplomas: false,
		thanks: false,
		certificates: false,
		is_vertical: false,
		is_horizontal: false,
	},
};

export const ErrorCheckbox = Template.bind({});
ErrorCheckbox.args = {
	text: 'кнопка',
	onClick: () => console.log('Click'),
	name: 'diplomas',
	state: {
		diplomas: false,
		thanks: false,
		certificates: false,
		is_vertical: false,
		is_horizontal: false,
	},
};
