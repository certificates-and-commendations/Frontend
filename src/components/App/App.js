import Header from '../Header/Header';
import './App.css';
import '../../vendor/normalize.css';

function App() {
	return (
		<div className="App">
			<Header isMain />
			<Header isMain={false} />
		</div>
	);
}

export default App;
