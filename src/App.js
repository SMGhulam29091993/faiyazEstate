import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';

import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Profile } from './pages/Profile';
import { About } from './pages/About';
import { HomePage } from './pages/Home';

const App = ()=>{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
