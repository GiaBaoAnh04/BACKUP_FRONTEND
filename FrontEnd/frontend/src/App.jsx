import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
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





function App() {
  return (
    <Router>
      <Routes>
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
          <Route path="/DonHang/:id" element={<StockDetail />} />
          <Route path="/KhachHang/:id" element={<CustomerDetail />} />
          <Route path="/HoaDon/:id" element={<OrderDetail />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
