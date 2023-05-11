import './App.css';
import { Routes, Route , useLocation} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';

function App() {
  const location = useLocation()
  return (
    <div className="App">
      {location.pathname !== '/' && <Nav/>}
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
