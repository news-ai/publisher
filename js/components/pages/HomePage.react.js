/*
 * HomePage
 * This is the first thing users see of our App
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { asyncGetFeed } from '../../actions/AppActions'
import { store } from '../../app';

import { ArticleList } from '../pieces/ArticleList'

class HomePage extends Component {
  render() {
    const dispatch = this.props.dispatch;
    dispatch(asyncGetFeed());
    const { projectName, articles } = this.props.data;
    console.log(articles);
    return (
      <div>
        <h1>{projectName}</h1>
        <ArticleList list={articles} />
      </div>
    );
  }
}

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(HomePage);
