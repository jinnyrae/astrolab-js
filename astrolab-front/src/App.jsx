import Header from './components/header';
import Footer from './components/footer';
import Login from '../src/containers/user/login';
import Home from '../src/containers/home';
import Shop from '../src/containers/shop';
import Basket from '../src/containers/basket';
import Register from '../src/containers/user/register';
import Details from '../src/containers/details';
import AddProduct from './containers/admin/products/addProduct';
import EditProduct from './containers/admin/products/editProduct';
import Action from './containers/admin/products/action';
import OrdersTable from './containers/admin/orders/orderTable';
import OrderDetails from './containers/admin/orders/orderDetails';
import UserTable from './containers/admin/users/userTable';
import Atelier from './containers/atelier';
import Success from './containers/success';
import Payment from './containers/payment';
import Cgv from './containers/cgv';
import Pdc from './containers/psc';
import Apropos from './containers/apropos';
import { Routes, Route, Navigate } from 'react-router-dom';
import Admin from '../src/containers/admin/Admin';
import Profil from '../src/containers/user/profil';
import RequireAuth from '../src/helpers/auth';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<RequireAuth child={Home} admin={false} />} /> */}
        <Route
          path="/admin"
          element={<RequireAuth child={Admin} admin={true} />}
        />
        <Route
          path="/profil"
          element={<RequireAuth child={Profil} admin={false} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/atelier" element={<Atelier />} />
        <Route path="/apropos" element={<Apropos />} />
        <Route path="/cgv" element={<Cgv />} />
        <Route path="/pdc" element={<Pdc />} />
        <Route path="/details/:id" element={<Details />} />

        <Route
          path="/basket"
          element={<RequireAuth child={Basket} admin={false} />}
        />
        <Route
          path="/payment/:orderId"
          element={<RequireAuth child={Payment} admin={false} />}
        />
        <Route
          path="/success"
          element={<RequireAuth child={Success} admin={false} />}
        />
        <Route
          path="/basket"
          element={<RequireAuth child={Basket} admin={false} />}
        />

        <Route
          path="/admin/addProduct"
          element={<RequireAuth child={AddProduct} admin={true} />}
        />
        <Route
          path="/admin/editProduct/:id"
          element={<RequireAuth child={EditProduct} admin={true} />}
        />
        <Route
          path="/admin/action"
          element={<RequireAuth child={Action} admin={true} />}
        />
        <Route
          path="/admin/orderTable"
          element={<RequireAuth child={OrdersTable} admin={true} />}
        />
        <Route
          path="/admin/orderDetails/:id"
          element={<RequireAuth child={OrderDetails} admin={true} />}
        />
        <Route
          path="/admin/userTable"
          element={<RequireAuth child={UserTable} admin={true} />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
