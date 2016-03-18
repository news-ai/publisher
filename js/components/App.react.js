import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className='wrapper'>
        { this.props.children }
      </div>
      );
  }
}

// REDUX STUFF

// Which props do we want to inject, given the global state?
const mapStateToProps = (state) => {
  return {
    data: state
  };
};

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(App);
