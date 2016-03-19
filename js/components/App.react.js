import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from './pieces/Navigation.react';

class App extends Component {
  render() {
    return (
      <div className='wrapper'>
          <div className='container'>
            <Navigation />
          </div>
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
