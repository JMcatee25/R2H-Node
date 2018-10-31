import React, { Component } from "react";
import Employees from "./components/Employees";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      employees: []
    };
  }
  componentDidMount() {
    const url = `http://localhost:3001/`;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({
          employees: json
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleUpdate = () => {
    const url = `http://localhost:3001/`;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({
          employees: json
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  render() {
    let employees = this.state.employees.map((employee, index) => {
      return (
        <Employees
          name={employee.name}
          department={employee.department}
          salary={employee.salary}
        />
      );
    });
    return (
      <div className="App">
        <form
          action="http://localhost:3001/employees"
          method="post"
          name="myForm"
        >
          <input type="text" name="name" id="name" />
          <input type="text" name="department" id="department" />
          <input type="number" name="id" id="id" />
          <input type="number" name="salary" id="salary" />
          <input type="submit" value="submit" />
        </form>
        <button onClick={this.handleUpdate}>Update</button>
        {employees}
      </div>
    );
  }
}

export default App;
