import { MemoryRouter } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import { Sample } from './Sample';
import './Sample.css';

export default {
	title: 'UI/ Элемент Шаблон',
	component: Sample,
	decorators: [
		(Story) => (
			<MemoryRouter initialEntries={['/']}>
				<Story />
			</MemoryRouter>
		),
	],
	tags: ['autodocs'],
	argTypes: {
		onLike: { action: 'onLike' },
		onDislike: { action: 'onDislike' },
		onImageClick: { action: 'onImageClick' },
		item: {
			type: 'object',
			description: 'обьект шаблона',
			defaultValue: {
				id: 2,
				title: 'horizotal template',
				thumbnail: 'http://185.93.111.238/media/thumbnails/temp_uvALw2v.jpg',
				category: null,
				color: null,
				is_horizontal: true,
			},
			isLoggedIn: {
				type: 'boolean',
				description: 'стейт LoggedIn',
			},
		},
	},
};

const Template = (args) => <Sample {...args} />;

export const DefaultSample = Template.bind({});
DefaultSample.args = {
	item: {
		id: 2,
		title: 'horizotal template',
		thumbnail: 'http://185.93.111.238/media/thumbnails/temp_uvALw2v.jpg',
		category: null,
		color: null,
		is_horizontal: true,
	},
	onImageClick: () => console.log('ImageClick'),
	onLike: () => console.log('Like'),
	onDislike: () => console.log('Dislike'),
	favoriteSamples: [],
	isLoggedIn: true,
};

export const SampleWithLike = Template.bind({});
SampleWithLike.args = {
	item: {
		id: 2,
		title: 'horizotal template',
		thumbnail: 'http://185.93.111.238/media/thumbnails/temp_uvALw2v.jpg',
		category: null,
		color: null,
		is_horizontal: true,
	},
	favoriteSamples: [
		{
			id: 2,
			title: 'horizotal template',
			thumbnail: 'http://185.93.111.238/media/thumbnails/temp_uvALw2v.jpg',
			category: null,
			color: null,
			is_horizontal: true,
		},
	],
	isLoggedIn: true,
};

SampleWithLike.story = {
	parameters: {
		actions: {
			onLike: action('onLike'),
		},
		onLoad: async (args) => {
			const item = args.item;

			try {
				const response = await fetch(`http://185.93.111.238/api/documents/`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (response.ok) {
					console.log('Успешно отправлено на сервер');
					action('onLike button clicked')(response);
				} else {
					console.error('Ошибка при отправке на сервер');
				}
			} catch (error) {
				console.error('Произошла ошибка', error);
			}
		},
	},
};
