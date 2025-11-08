// App.jsx

import React from 'react';
import Author from './features/Author';
import AuthorLogin from './features/components/AuthorLogin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';

const App = () => {
  return (
    <BrowserRouter basename="/author">
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
        theme="light"
        transition={Bounce}
      />
      
      <Routes>
        <Route path="/" element={<Author />} />
        <Route path="/login" element={<AuthorLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;