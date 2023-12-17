import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FC, Fragment } from "react";
import { Outlet } from "react-router-dom";
import { HelloWorldPage, LoginPage, Menu } from "@/pages";
import { PrivateRoute } from "@/routes/PrivateRoute";
import useAuth from "@/context/AuthContext";

export const Router: FC = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Fragment>
              <Outlet />
            </Fragment>
          }
        >
          <Route path="/hello-world" element={<HelloWorldPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <Fragment>
                <Outlet />
              </Fragment>
            }
          >
            <Route path="/" element={<PrivateRoute email={user.email} token={user.token} />}>
              <Route path="/menu" element={<Menu />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
