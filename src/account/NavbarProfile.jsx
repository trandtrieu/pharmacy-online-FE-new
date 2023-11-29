import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

class NavbarProfile extends Component {
  render() {
    return (
      <>
        <div className="col-md-3 pt-0">
          <div className="list-group list-group-flush account-settings-links">
            <a
              className="list-group-item list-group-item-action "
              data-toggle="list"
              href="#account-general"
            >
              General
            </a>
            <a
              className="list-group-item list-group-item-action"
              data-toggle="list"
              href="#account-change-password"
            >
              Change password
            </a>
            <a
              className="list-group-item list-group-item-action active "
              data-toggle="list"
              href="#account-prescripitons"
            >
              My presciptions
            </a>
            <a
              className="list-group-item list-group-item-action"
              data-toggle="list"
              href="#account-delivery-address"
            >
              My delivery address
            </a>
            <a
              className="list-group-item list-group-item-action"
              data-toggle="list"
              href="#account-orders"
            >
              My Orders
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default NavbarProfile;
