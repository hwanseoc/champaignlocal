import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss?v=1.2.0";
// pages
import IndexPage from "views/IndexPage.js";

import RegisterPage from "views/users/UsersRegisterPage.js";
import LoginPage from "views/users/UsersLoginPage.js";
import UpdatePage from "views/users/UsersUpdatePage.js";
import DeletePage from "views/users/UsersDeletePage.js";

import StoresPage from "views/stores/StoresPage.js";

import QuestionPage from "views/QuestionsPage.js";
import Main from "views/QuestionPageMain.js";
import Item from "views/QuestionPageItem.js";
// others

import { ProvideAuth, RequireAuth } from "utils/auth.js";

const root = createRoot(document.getElementById("root"));
root.render(
  <ProvideAuth>
    <Router>
      <Routes>
        <Route exact path="/" element={<IndexPage />} />
        <Route path="/users/register" element={<RegisterPage />} />
        <Route path="/questions" element={<QuestionPage />} />
        <Route path="/questions/getitems" element={<Main />} />
        <Route path="/questions/item/:id" element={<Item />} />
        <Route path="/users/login" element={<LoginPage />} />
        <Route
          path="/users/update"
          element={<RequireAuth><UpdatePage /></RequireAuth>}
        />
        <Route
          path="/users/delete"
          element={<RequireAuth><DeletePage /></RequireAuth>}
        />
        <Route path="/stores" element={<StoresPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  </ProvideAuth>
);
