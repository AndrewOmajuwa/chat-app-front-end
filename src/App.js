import React, { Component } from "react";
import * as request from "superagent";
import {connect} from 'react-redux'
import {onEvent} from './actions/messages'


 class App extends Component {

   url = 'https://mighty-mesa-76259.herokuapp.com/'
  
  source = new EventSource(`${this.url}stream`);

  componentDidMount() {
    this.source.onmessage = this.props.onEvent;
  }

  onChange = event => {
    const { value } = event.target;

    this.setState({ message: value });
  };

  onSubmit = event => {
    event.preventDefault();

    console.log("submit");

    const { message } = this.props;

    console.log('message test:', message)

    this.setState({ message: "" });

    request
      .post(`${this.url}message`)
      .send({ message })
      .then(res => console.log("test", res));
  };

  render() {
    console.log("hello messages", this.props.messages)
    const message = this.props.messages.map((message, index) => (
      <p key={index}>{message}</p>
    ));
    return (
      <main>
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}
            type="text"
            value={this.props.message}
          />
          <button>send</button>
        </form>

        {message}
      </main>
    );
  }
}



function  mapStateToProps (state) {
  return {
    messages: state.messages
  }
}

const mapDispatchToProps = {onEvent}

export default connect (mapStateToProps, mapDispatchToProps)(App)