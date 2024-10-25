import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { GlobalStyle } from "./global.styles.js";


import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component.jsx";
import CheckoutPage from "./pages/checkout/checkout.component.jsx";

import Header from "./components/header/header.component.jsx";

import { selectCurrentUser } from "./redux/user/user.selectors.js";
import { checkUserSession } from "./redux/user/user.actions.js";

const App = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <div>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop/*" element={<ShopPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route
          path="/signIn"
          element={currentUser ? <Navigate to="/" /> : <SignInAndSignUpPage />}
        />
      </Routes>
    </div>
  );
};

export default App;
