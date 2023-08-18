import './App.css';
// import { useState } from 'react';
import { Routes } from 'react-router-dom';

// import { Route, Navigate } from 'react-router-dom';

// import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';

function App() {
	// СТЕЙТ СОСТОЯНИЯ LOGIN
	// const [isloggedIn, setIsloggedIn] = useState(false);

	return (
		<Routes >
			{/* По готовности компонента Main кладем его в роут */}
			{/* <Route path='/' element={ Ожидаю Main } /> */}

			{/* По готовности компонента SignUp кладем его в роут */}
			{/* <Route path='/signup' element={isloggedIn ? <Navigate to='/' /> : Ожидаю SignUp />} /> */}

			{/* По готовности компонента SignIn кладем его в роут */}
			{/* <Route path='/signin' element={isloggedIn ? <Navigate to='/' /> : Ожидаю SignIn />} /> */}

			{/* По готовности компонента Editor кладем его в роут */}
			{/* <Route path='/editor' element={<ProtectedRouteElement loggedIn={isloggedIn} element={ Ожидаю Editor } />} /> */}

			{/* По готовности компонента Editor кладем его в роут */}
			{/* <Route path='/profile' element={<ProtectedRouteElement loggedIn={isloggedIn} element={ Ожидаю Profile } />} /> */}

			{/* По готовности компонента NotFoundPage кладем его в роут */}
			{/* <Route path='*' element={ Ожидаю NotFoundPage } /> */}

		</Routes>
	);
}

export default App;
