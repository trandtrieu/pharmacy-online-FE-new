import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HeaderAdmin from "./admin/HeaderAdmin";

import ProductAdmin from "./admin/ProductAdmin";

function Admin() {
  return (
    <Router>
      <div>
        <body class="g-sidenav-show  bg-gray-100">
          <HeaderAdmin />
          <Switch>
            <Route path="/admin/home" component={ProductAdmin} />
          </Switch>
          {/* <FooterAdmin /> */}
        </body>
      </div>
    </Router>
  );
}

export default Admin;
