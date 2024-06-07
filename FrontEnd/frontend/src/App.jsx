//import { BrowserRouter as Routes, Route } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import React, { useContext, useEffect } from 'react';
import Layout from './Shared/Layout';
import Dashboard from './Components/DASHBOARD/Dashboard';
import Staff from './Components/STAFF/Staff'
import Book from './Components/BOOK/Book';
import Customer from './Components/CUSTOMER/Customer';
import Order from './Components/ORDER/Order';
import Stock from './Components/STOCK/Stock';
import Revenue from './Components/REVENUE/Revenue';
import Celander from './Components/CELANDER/Celander';
import Chatting from './Components/CHATTING/Chatting';
import Setting from './Components/SETTING/Setting';
import StockDetail from './Components/STOCK/StockDetail'
import CustomerDetail from './Components/CUSTOMER/CustomerDetail'
import OrderDetail from './Components/ORDER/OrderDetail'
import Login from './Components/LOGIN/Login'
import BookDetail from './Components/BOOK/SingleBook'
import StaffDetail from './Components/STAFF/StaffDetail'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './Components/context/UserContext';


function App() {

  const {user, loginContext} = useContext(UserContext);

  console.log("=>>> user: ", user)
  useEffect(() => {
    if (localStorage.getItem("token")){
      loginContext(localStorage.getItem("username"), localStorage.getItem("token"));
    }
  }, [])

  return (
    <div className="App">
    <ToastContainer />
      <Routes>
        <Route path="/Login" element={<Login />}/>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />}/>
          <Route path="Book" element={<Book/>}/>
          <Route path="Staff" element={<Staff/>}/>
          <Route path="Customer" element={<Customer/>}/>
          <Route path="Stock" element={<Stock/>}/>
          <Route path="Order" element={<Order/>}/>
          <Route path="Revenue" element={<Revenue/>}/>
          <Route path="Celander" element={<Celander/>}/>
          <Route path="Chatting" element={<Chatting/>}/>
          <Route path="Setting" element={<Setting/>}/>
          <Route path="Sach/:id" element={<BookDetail />} />
          <Route path="/DonHang/:id" element={<StockDetail />} />
          <Route path="/KhachHang/:id" element={<CustomerDetail />} />
          <Route path="/HoaDon/:id" element={<OrderDetail />} />
          <Route path="/NhanVien/:id" element={<StaffDetail />} />
        </Route>
      </Routes>
      </div>
    );
}

export default App;
