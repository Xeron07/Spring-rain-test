/** @format */

import React, { Component } from "react";

class Home extends Component {
  state = {
    result: 0,
    inputNum: 0,
  };
  render() {
    return (
      <div className='container'>
        <h1>Factorial Calculator</h1>

        <input
          type='number'
          className='form-control'
          style={{ width: "30%" }}
          onChange={(eve) => {
            this.setState({
              inputNum: eve.target.value ? eve.target.value : 0,
            });
          }}
          placeholder='Enter a number...'
        />
        <br />
        <br />
        <button
          className='btn btn-outline-info'
          onClick={() => this.calculateResult()}>
          Calculate Factorial
        </button>

        <h2>Factorial: {this.state.result}</h2>
      </div>
    );
  }

  calculateResult = () => {
    let val = parseInt(this.state.inputNum);
    let fac = 1;

    if (val === 1 || val === 0) val = 1;
    else for (let i = val; i > 1; i--) fac = fac * i;

    this.setState({ result: fac });
  };
}

export default Home;
