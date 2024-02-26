
import { Link } from 'react-router-dom';

function Dropdown({ currentUser }) {
  

  return (
    <div className="relative ">
      
        <div className="absolute z-10 -right-5 top-5 mt-2 w-48 bg-slate-100 rounded-lg shadow-xl">
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-200">
              <Link to="/" >
                Home
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-200">
              <Link to="/about" >
                About
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-200">
              {currentUser ? (
                <Link to="/profile" >
                  {currentUser.user?.avatar || currentUser.avatar ? (
                    <img
                      src={currentUser.user?.avatar || currentUser.avatar}
                      alt="Profile"
                      className="w-7 h-7 rounded-full mr-2 inline-block"
                    />
                  ) : (
                    <span>{currentUser.user?.username || currentUser.username || 'Profile'}</span>
                  )}
                </Link>
              ) : (
                <Link to="/signin" >
                  Sign-In
                </Link>
              )}
            </li>
          </ul>
        </div>
    </div>
  );
}

export default Dropdown;
