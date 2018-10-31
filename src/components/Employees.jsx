import React, { Component } from "react";

export default class Employees extends Component {
  render() {
    return (
      <div>
        <p>{this.props.name}</p>
        <p>{this.props.department}</p>
        <p>{this.props.salary}</p>
      </div>
    );
  }
}
