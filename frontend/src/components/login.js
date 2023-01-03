import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import Image from "./assets/login-img.jpg";

function Login() {
  return (
    <div className="App">
      <section className="vh-100">
        <div className="container-fluid bg-dark">
          <div className="row">
            <div className="col-sm-6 text-black">
              <div className="px-5 ms-xl-4">
                <i
                  className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
                  style={{ color: "#709085" }}
                />
                <h1 style={{ color: "#e6e6e6", fontSize: "70px", marginBottom: "0px", marginTop: "80px" }}>
                  <srong>MATRIX MS</srong>
                </h1>
              </div>
              <div style={{ marginTop: "50px" }} className="d-flex align-items-center px-5 ms-xl-4 pt-xl-0">
                <form style={{ width: "23rem" }}>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form2Example18"
                      placeholder="User ID"
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form2Example28"
                      placeholder="Password"
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div class="d-grid gap-2">
                    <br />
                    <button
                      className="btn btn-outline-info btn-lg btn-block"
                      type="button"
                    >
                      Login
                    </button>
                  </div>
                  <br />
                  <br />{" "}
                  <p className="small mb-5 pb-lg-2">
                    <a className="text-muted" href="#!">
                      Forgot password?
                    </a>
                  </p>
                </form>
              </div>
            </div>
            <div className="col-sm-6 px-0 d-none d-sm-block">
              <img
                src={Image}
                alt="Login image"
                className="w-100 vh-100"
                style={{ objectFit: "cover", objectPosition: "left" }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
