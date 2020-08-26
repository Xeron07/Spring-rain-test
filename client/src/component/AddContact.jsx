import React, { Component } from "react";
import axios from "axios";

class AddContact extends Component {
  state = {
    name: "",
    phoneNumber: "",
  };
  render() {
    return (
      <div className="container">
        <div
          className="card col-8 col-sm-6 col-md-5"
          style={{ margin: "auto", marginTop: "10%" }}
        >
          <div className="card-body">
            <div className="card-title">
              <h5 style={{ textAlign: "center" }}>Add Contact</h5>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputName">Name:</label>
                <input
                  type="name"
                  className="form-control"
                  id="exampleInputName"
                  placeholder="Enter Name"
                  value={this.state.name}
                  onChange={(eve) => this.handleChangeName(eve.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputPhoneNumber">Phone Number:</label>
                <input
                  type="tel"
                  className="form-control"
                  value={this.state.phoneNumber}
                  id="inputPhoneNumber"
                  pattern="[0][1][1-9][0-9]{8}"
                  placeholder="ex. 017XXXXXXXX"
                  onChange={(eve) =>
                    this.handleChangePhoneNumber(eve.target.value)
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-sm btn-block"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  handleChangeName = (val) => {
    this.setState({ name: val });
  };

  handleChangePhoneNumber = (val) => {
    this.setState({ phoneNumber: val });
  };

  handleSubmit = (event) => {
    const name = this.state.name;
    const pn = this.state.phoneNumber;
    if (/^\+?0?1[3456789][0-9]{8}\b/.test(pn)) {
      axios
        .post("/api/add", {
          name: name,
          phoneNumber: pn,
        })
        .then((res) => {
          if (res.data.status) {
            alert(res.data.msg);
            this.setState({ name: "", phoneNumber: "" });
          } else alert(res.data.msg);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert("Enter a valid phone number");
    }
    event.preventDefault();
  };
}

export default AddContact;
