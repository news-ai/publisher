import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/AppActions';
import Navigation from './pieces/Navigation.react';
import Login from './pages/Login.react';
import CenterLoading from './pieces/CenterLoading.react';

class App extends Component {
  componentDidMount() {
    this.props.getAuth();
  }

  render() {
    return (
      <div className='wrapper'>
          <div className='container'>
            <Navigation isLogin={this.props.isLogin} />
          </div>
        {
          this.props.data.personReducer.person ?
          this.props.children :
          this.props.data.personReducer.isReceiving ?
          (
            <div className='container article-list-container'>
            <CenterLoading name='feed' />
          </div>)
          : <Login /> }
      </div>
      );
  }
}

const mapStateToProps = state => {
  return {
    data: state,
    isLogin: state.personReducer.person ? true : false,
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
