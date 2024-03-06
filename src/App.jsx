import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateEvent from './pages/CreateEvent';
import FooterCom from './components/FooterCom';
import Event from './pages/Home';
import MyEvent from './pages/MyEvent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route element={<PrivateRoute />}>
            <Route path="create-event" element={<CreateEvent />} />
            <Route path="myevent" element={<MyEvent />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <FooterCom />
    </BrowserRouter>
  );
};

export default App;
