import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Admin from './Admin/Admin';
import Home from './components/Home';
import Auction from './Admin/Auction';
import Recent from './Admin/Recent';
import New from './Admin/New';
import Sale from './Admin/Sale';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Dashboard from './Admin/Dashboard';
import Admin2 from './components/Admin';
import All from './Admin/All';
import Side from './Admin/Side';
import Front from './Routing/Front';
import Cart from './Routing/Cart';
import Favourite from './components/Favourite';
import ProductsPage from './components/ProductPage';
import BrandPage from './components/BrandPage';
import Populars from './components/Populars';
import ManageBrand from './Admin/ManageBrand';
// import BrandItem from './components/BrandItem';
// import BrandProduct from './components/BrandProduct';
import ManageVent from './Admin/ManageVent';
import ManageCategory from './Admin/ManageCategory';
import Individual from './components/Individual';
import Search from './components/Search';


function App() {
  return (
    <Routes>
      <Route path="admin" element={<Admin />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
      <Route path="/admin2" element={<Admin2 />} />
      <Route path="/side" element={<Side />} />
      <Route path="/brand" element={<BrandPage />} />
      <Route path="/search" element={<Search />} />
      {/* <Route path="/item" element={<BrandItem />} />
      <Route path="/brands" element={<BrandProduct />} /> */}
      <Route path="/manage" element={<ManageBrand />} />
      <Route path="/managevent" element={<ManageVent />} />
      <Route path="/managecategory" element={<ManageCategory />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="new" element={<New />} />
        <Route path="sale" element={<Sale />} />
        <Route path="all" element={<All />} />
        <Route path="recent" element={<Recent />} />
        <Route path="auction" element={<Auction />} />
      </Route>
      <Route path="/front" element={<Front />}>
        <Route path="cart" element={<Cart />} />
        <Route path="favourite" element={<Favourite />} />
        <Route path="populars" element={<Populars />} />
        <Route path="individual/:id" element={<Individual />} />
      </Route>
    </Routes>
  );
}

export default App;




