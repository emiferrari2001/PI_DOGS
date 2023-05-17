import './App.css';
import { Routes, Route , useLocation} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail.jsx'
import Form from './components/Form/Form';

function App() {
  const location = useLocation()
  return (
    <div className="App">
      {location.pathname === '/home' && <Nav/>}
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/create' element={<Form/>}/>
      </Routes>
    </div>
  );
}

export default App;
