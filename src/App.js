import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import React from "react";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import { ErrorPage } from "./pages/ErrorPage";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<FullPost />} />
        <Route path="/posts/:id/edit" element={<AddPost />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route
          path="/authors"
          element={<ErrorPage message={"Страница в разработке"} />}
        />
        <Route
          path="/profile"
          element={<ErrorPage message={"Страница в разработке"} />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
