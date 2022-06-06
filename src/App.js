import './App.css';
import { Routes, Route } from 'react-router-dom';

import MenuBar from './components/MenuBar';
import ShoppingList from './pages/ShoppingList';
import Items from './pages/Items';
import Home from './pages/Home';
import Meals from './pages/Meals';
import Settings from './pages/Settings';

function App() {
	return (
		<div className="App">
			<MenuBar/>
			<Routes>
				<Route path='/' element={<Home/>} />
				<Route path='/shoppingList' element={<ShoppingList/>} />
				<Route path='/items' element={<Items/>} />
				<Route path='/meals' element={<Meals/>} />
				<Route path='/settings' element={<Settings/>} />
			</Routes>
		</div>
	);
}

export default App;