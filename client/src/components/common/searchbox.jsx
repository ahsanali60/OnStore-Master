import React, { Component } from "react";
import { Form, FormControl, Button } from "react-bootstrap";

class SearchBox extends Component {
  state = {};
  render() {
    return (
      <Form inline className="m-2 ">
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-dark">Search</Button>
      </Form>
    );
  }
}

export default SearchBox;
