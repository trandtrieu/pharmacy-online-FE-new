import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class PrescriptionBanner extends Component {
  createPrescription() {
    this.props.history.push(`/create-prescription`);
  }
  render() {
    return (
      <>
        <div className="container-fluid bg-light">
          <div className="container">
            <div className="row pres-banner p-4">
              <div className="col-md-9 pres-banner-right">
                <div className="d-flex justify-content-around">
                  <img
                    src="../assets/images/st1.png"
                    alt=""
                    className="img-fluid"
                    style={{ maxWidth: "30%" }}
                  />

                  <img
                    src="../assets/images/st2.png"
                    alt=""
                    className="img-fluid"
                    style={{ maxWidth: "30%" }}
                  />

                  <img
                    src="../assets/images/st3.png"
                    alt=""
                    className="img-fluid"
                    style={{ maxWidth: "30%" }}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="d-flex flex-column">
                  <div className="nine">
                    <h3>Easily fill prescriptions at the pharmacy</h3>
                    {/* <span>or 0789458707</span> */}
                  </div>
                  <button
                    className="button-29"
                    onClick={() => this.createPrescription()}
                  >
                    Button{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(PrescriptionBanner);
