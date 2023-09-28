import './ComputerRestrictions.css';
import image404 from '../../images/404.png';

function ComputerRestrictions() {
	return (
		<div className="computer-restrictions">
			<img
				src={image404}
				alt="Страница не найдена"
				className="computer-restrictions__image"
			/>
			<h1 className="computer-restrictions__title">
				К сожалению, вы не можете пользоваться нашим сайтом с этого устройства
			</h1>
			<p className="computer-restrictions__text">
				Попробуйте зайти сюда с компьютера!
			</p>
		</div>
	);
}

export default ComputerRestrictions;
