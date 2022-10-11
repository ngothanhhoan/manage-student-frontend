import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import { publicRoutes, privateRoutes } from "@/routes";
import PrivateRoutesComponent from "@/routes";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* public path component */}
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            const Layout =
              route.path === "/" ||
              route.path === "/signin" ||
              route.path === "/signup"
                ? Fragment
                : DefaultLayout;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout key={route.path}>
                    <Page key={route.path} />
                  </Layout>
                }
              />
            );
          })}

          {/* private path component */}
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            const Layout = DefaultLayout;

            return (
              <Route element={<PrivateRoutesComponent />}>
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout key={route.path}>
                      <Page key={route.path} />
                    </Layout>
                  }
                />
              </Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
