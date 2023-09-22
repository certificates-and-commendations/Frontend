import { MemoryRouter } from 'react-router-dom';
import { Sample } from './Sample';
import './Sample.css';

export default {
	title: 'Sample',
	component: Sample,
	decorators: [
		(Story) => (
			<MemoryRouter initialEntries={['/']}>
				<Story />
			</MemoryRouter>
		),
	],
	tags: ['autodocs'],
	// argTypes: {
	//   item: {
	//     type: 'object',
	//     description: 'обьект шаблона',
	//     defaultValue: {
	//       id: 2,
	//       title: 'horizotal template',
	//       thumbnail: 'http://185.93.111.238/media/thumbnails/temp_uvALw2v.jpg',
	//       category: null,
	//       color: null,
	//       is_horizontal: true,
	//     },
	//     control: {
	//       type: 'radio'
	//     }
	//   },
	//   isLoggedIn: {
	//     type: 'boolean',
	//     description: 'стейт LoggedIn',
	//   }
	// }
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
