import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class PrescriptionBanner extends Component {
  createPrescription() {
    this.props.history.push(`/prescription`);
    // window.scrollTo(0, 0);
  }
  render() {
    return (
      <>
        <div className="container-fluid bg-light">
          <div className="container">
            <div class="row pres-banner p-4">
              <div class="col-md-9 pres-banner-right">
                <div className="d-flex justify-content-around">
                  <img
                    src="../assets/img/upoad-prescription-step-1.webp"
                    alt=""
                    className="img-fluid"
                    style={{ maxWidth: "30%" }}
                  />

                  <img
                    src="../assets/img/upoad-prescription-step-2.webp"
                    alt=""
                    className="img-fluid"
                    style={{ maxWidth: "30%" }}
                  />

                  <img
                    src="../assets/img/upoad-prescription-step-3.webp"
                    alt=""
                    className="img-fluid"
                    style={{ maxWidth: "30%" }}
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div className="d-flex flex-column">
                  <div class="nine">
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
