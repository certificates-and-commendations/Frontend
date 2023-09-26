import { createStore } from 'redux';
import rootReducer from './reducers/index'; // Импортируйте ваш корневой редюсер

const store = createStore(rootReducer);

export default store;
