import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      employees: []
    };
  }
  componentDidMount() {
    const url = `http://localhost:3001/employees`;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({
          isLoading: false,
          employees: json
        });
      })
      .catch(function(error) {
        this.setState({
          isLoading: false
        });
        console.log(error);
      });
  }
  render() {
    return (
      <div className="App">
        <form
          action="http://localhost:3000/employees"
          method="post"
          name="myForm"
        >
          <input type="text" name="name" id="name" />
          <input type="text" name="department" id="department" />
          <input type="number" name="id" id="id" />
          <input type="number" name="salary" id="salary" />
          <input type="submit" value="submit" />
        </form>
        <button>Update</button>
      </div>
    );
  }
}

export default App;
