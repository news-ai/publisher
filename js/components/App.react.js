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

const mapStateToProps = state => {
  return {
    data: state
  };
};

export default connect(mapStateToProps)(App);
