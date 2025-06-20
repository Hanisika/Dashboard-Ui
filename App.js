import './App.css';
import Sidebar from './components/Sidebar/sidebar';
import MainDash from './components/MainDash/MainDash';
import Rightside from './components/Rightside/Rightside';
import OrderForm from './components/OrderForm/OrderForm';
import { Routes, Route, Outlet } from 'react-router-dom';
import LoginPage from './components/login/LoginPage';

const DashboardLayout = () => (
  <div className="App">
    <div className="AppGlass">
      <Sidebar />
      <div className="MainContent">
        <Outlet /> 
      </div>
      <Rightside />
    </div>
  </div>
);

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <Routes>
      {!isLoggedIn ? (
        <Route path="*" element={<LoginPage />} />  // ✅ Show Login Page First
      ) : (
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<MainDash />} />
          <Route path="orders" element={<OrderForm />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;