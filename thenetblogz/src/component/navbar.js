import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    constructor() {
        super();
        this.state = { name: ''};
    }

    handleChange = event => {
        this.setState({ name: event.target.value })
    };

    render() {
        return (
        <>
        <form>
            <label>
                Name:
                <input type="text" 
                    name="name"
                    value={this.state.username}
                    onChange={this.handleChange} />
            </label>
            </form>
            <h1>Welcome: {this.state.name}</h1>
        </>)
    }
}

export default Navbar;