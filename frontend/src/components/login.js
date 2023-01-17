import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import Image from "./assets/login-img.jpg";
import constants from "./../utilities/constants";
import axios from "axios";

const constant = constants.getConstant();

function Login(props) {
  const [data, setData] = useState([]);
  let datas = data.length;
  var em;
  var pass;

  const changed = async () => {
    em = document.getElementById("forEmail").value;
    pass = document.getElementById("forPass").value;
    const result = await axios(
      constant.login + `?email=${em}&password=${pass}`
    );
    setData(result.data.details);
  };

  const onSubmit = async () => {
    em = document.getElementById("forEmail").value;
    pass = document.getElementById("forPass").value;
    let design;
    const result = await axios(
      constant.login + `?email=${em}&password=${pass}`
    );
    setData(result.data.details);
    {
      data.map((item) => {
        if (em === item.email) {
          design = item.designation;
        }
      });
    }
    localStorage.setItem("data", JSON.stringify(data));
    data.length > 0
      ? props.history.push({
          pathname: "App",
        })
      : alert("Account does not exist.");
  };
  return (
    <div className="App">
      <section className="vh-100">
        <div className="container-fluid bg-dark">
          <div className="row">
            <div className="col-sm-6 text-black ">
              <div className="px-5 ms-xl-4">
                <i
                  className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
                  style={{ color: "#709085" }}
                />
                <div style={{ textAlign: "center" }}>
                  <h1
                    style={{
                      color: "#e6e6e6",
                      fontSize: "70px",
                      marginBottom: "0px",
                      marginTop: "80px",
                    }}
                  >
                    MATRIX MS
                  </h1>
                </div>
                <div
                  style={{ marginTop: "50px" }}
                  className="d-flex align-items-center px-5 ms-xl-4 pt-xl-0"
                >
                  <form style={{ width: "23rem", marginLeft: "20px" }}>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="forEmail"
                        placeholder="Email"
                        className="form-control form-control-lg"
                        onChange={changed}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="forPass"
                        placeholder="Password"
                        className="form-control form-control-lg"
                        onChange={changed}
                      />
                    </div>
                    <div className="d-grid gap-2">
                      <br />
                      <button
                        className="btn btn-outline-info btn-lg btn-block"
                        type="button"
                        onClick={() => {
                          onSubmit();
                        }}
                      >
                        Login
                      </button>
                    </div>

                    <br />
                  </form>
                </div>
              </div>
            </div>
            <div className="col-sm-6 px-0 d-none d-sm-block">
              <img
                src={Image}
                alt=""
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
