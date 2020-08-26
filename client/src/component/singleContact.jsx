import React, { Component } from "react";
import Axios from "axios";

class SingleContact extends Component {
  state = {
    name: "",
    phoneNumber: "",
    c_Id: "",
  };

  componentDidMount = () => {
    const { pn } = this.props.match.params;
    this.setState({ phoneNumber: pn });
    this.getDataFromServer(pn);
  };

  getDataFromServer = (val = 0) => {
    const pn = val == 0 ? this.state.phoneNumber : val;
    Axios.get(`/api/single/${pn}`)
      .then((res) => {
        if (res.data.status) {
          this.setState({
            c_Id: res.data.data.u_id,
            name: res.data.data.name,
            phoneNumber: res.data.data.phoneNumber,
          });
        } else {
          alert("User not found");
        }
      })
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <div className="container" style={{ marginTop: "5%" }}>
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-8">
                <h4>
                  <b>
                    <i style={{ color: "#2980b9" }}>Name: </i>
                  </b>
                  {this.state.name}
                </h4>
              </div>
              <div className="col-4">
                <button
                  className="btn btn-light"
                  onClick={() => {
                    this.handleUpdate("name");
                  }}
                >
                  <i
                    className="fa fa-pencil-square-o"
                    style={{ color: "#16a085" }}
                  ></i>
                </button>
              </div>
              <div className="col-8">
                <h5>
                  <b>
                    <i style={{ color: "#2980b9" }}>Phone Number: </i>
                  </b>
                  {this.state.phoneNumber}
                </h5>
              </div>
              <div className="col-4">
                <button
                  className="btn btn-light"
                  onClick={() => {
                    this.handleUpdate("pn");
                  }}
                >
                  <i
                    className="fa fa-pencil-square-o"
                    style={{ color: "#16a085" }}
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleUpdate = (type) => {
    let value = "";
    if (type === "name") value = prompt("Enter a name");
    else value = prompt("Enter Phone Number");

    if (!value) {
      alert("Enter a valid input data");
      return;
    }

    if (type != "name") {
      if (!/^\+?0?1[3456789][0-9]{8}\b/.test(value)) {
        alert("Enter a valid phone number");
        return;
      }
    }

    Axios.post("/api/update", {
      type,
      data: value,
      u_id: this.state.c_Id,
    })
      .then((res) => {
        if (res.data.status) {
          alert("Contact updated");
          if (type != "name") window.location.pathname = "/single/" + value;
          else this.getDataFromServer();
        } else {
          alert("Some Error Occured");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export default SingleContact;
