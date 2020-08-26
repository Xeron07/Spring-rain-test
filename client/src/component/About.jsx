/** @format */

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class About extends Component {
  state = {
    contacts: [],
    allData: [],
    loading: true,
  };

  componentDidMount = () => {
    this.getDataFromServer();
  };

  getDataFromServer = () => {
    axios
      .get("/api/all")
      .then((res) => {
        if (res.data.status) {
          this.setState({
            contacts: [...res.data.data],
            allData: [...res.data.data],
            loading: false,
          });
        } else {
          alert("some error occured");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    return (
      <div className="container" style={{ marginTop: "5%" }}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <i
                className="fa fa-search"
                style={{ fontSize: "24px", color: "blue" }}
              ></i>
            </span>
          </div>
          <input
            type="search"
            className="form-control"
            placeholder="Search..(phone number only)"
            aria-label="phonenumber"
            aria-describedby="basic-addon1"
            onKeyUp={this.filerData}
          />
        </div>
        {this.state.loading ? this.loadingUi() : this.renderData()}
      </div>
    );
  }

  loadingUi = () => {
    return (
      <div
        className="alert alert-info"
        style={{
          textAlign: "center",
          marginTop: "40%",
          width: "40%",
          margin: "auto",
        }}
        role="alert"
      >
        <span className="spinner-grow spinner-grow-sm"></span>&nbsp;
        <span className="spinner-grow spinner-grow-sm"></span>&nbsp;
        <span className="spinner-grow spinner-grow-sm"></span>&nbsp;
      </div>
    );
  };

  renderData = () => {
    const contacts = [...this.state.contacts];
    if (contacts.length <= 0) {
      return (
        <div
          className="alert alert-warning"
          style={{
            textAlign: "center",
            marginTop: "40%",
            width: "40%",
            margin: "auto",
          }}
          role="alert"
        >
          No Data Found
        </div>
      );
    } else {
      return (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Operation</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((data) => {
              return (
                <tr key={data.u_id}>
                  <td>{data.name}</td>
                  <td>{data.phoneNumber}</td>
                  <td>
                    <Link className="btn btn-light" to={`/single/${data.phoneNumber}`}>
                      <i
                        className="fa fa-pencil-square-o"
                        style={{ color: "#16a085" }}
                      ></i>
                    </Link>
                    {"   "}
                    <button
                      className="btn btn-light"
                      onClick={() => {
                        this.handleDelete(data.u_id);
                      }}
                    >
                      <i
                        className="fa fa-trash"
                        style={{ color: "#c0392b" }}
                      ></i>
                    </button>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  };

  handleDelete = (uid) => {
    axios
      .post(`/api/delete`, {
        u_id: uid,
      })
      .then((res) => {
        if (res.data.status) {
          alert("Contact deleted");
          this.getDataFromServer();
        } else {
          alert("some error occur");
        }
      });
  };

  filerData = (event) => {
    let str = event.target.value;
    let filteredData = this.state.allData.filter((d) =>
      d.phoneNumber.toLowerCase().includes(str.toLowerCase())
    );
    this.setState({ contacts: [...filteredData] });
  };
}

export default About;
