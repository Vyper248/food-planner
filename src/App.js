import './App.css';
import { Routes, Route } from 'react-router-dom';

import MenuBar from './components/MenuBar';
import Items from './pages/Items';
import Home from './pages/Home';
import Meals from './pages/Meals';

function App() {
	return (
		<div className="App">
			<MenuBar/>
			<Routes>
				<Route path='/' element={<Home/>} />
				<Route path='/items' element={<Items/>} />
				<Route path='/meals' element={<Meals/>} />
			</Routes>
		</div>
	);
}

export default App;