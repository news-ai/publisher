import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/AppActions';
import Navigation from './pieces/Navigation.react';
import Login from './pages/Login.react';

class App extends Component {
  componentDidMount() {
    this.props.getAuth();
  }

  render() {
    return (
      <div className='wrapper'>
          <div className='container'>
            <Navigation />
          </div>
        { this.props.data.personReducer.person ? this.props.children : <Login /> }
      </div>
      );
  }
}

const mapStateToProps = state => {
  return {
    data: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAuth: _ => dispatch(actionCreators.fetchPerson()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(App);
