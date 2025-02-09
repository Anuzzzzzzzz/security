import { Outlet } from 'react-router-dom';
import './App.scss';
import InactivityWarning from './InactivityWarning';
import Footer from './constants/footer/footer';
import Navbar from './constants/navbar/navbar';

function App() {
  return (
    <div className="app">
      <Navbar />
      <InactivityWarning /> {/* Add the inactivity warning here */}
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
