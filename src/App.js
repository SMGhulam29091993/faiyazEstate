import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';

import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Profile } from './pages/Profile';
import { About } from './pages/About';
import { HomePage } from './pages/Home';
import Header from './component/Header';
import PrivateRoute from './component/PrivateRoute';
import PublicRoute from './component/PublicRoute';
import { UpdateProfile } from './pages/UpdateProfile';
import { CreateList } from './pages/CreateListing';
import { UpdateListing } from './pages/UpdateListings';
import { ListingPage } from './pages/ListingPage';
import { SearchPage } from './pages/SearchPage';

const App = ()=>{
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/listing/:listingID" element={<ListingPage/>} />
        <Route path="/search" element={<SearchPage/>} />
        <Route element={<PublicRoute/>}>
          <Route path="/sign-in" element={<SignIn/>} />
          <Route path="/sign-up" element={<SignUp/>} /> 
        </Route>
        
        <Route element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/update-profile" element={<UpdateProfile/>} />
          <Route path="/create-listing" element={<CreateList/>} />
          <Route path="/update-listing/:listingID" element={<UpdateListing/>} />
        </Route>
        
        <Route path="/about" element={<About/>} />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
