/*
 * HomePage
 * This is the first thing users see of our App
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ArticleList from '../pieces/ArticleList.react';

function HomePage({projectName, articles}) {
  return (
    <div>
        <div className='container'>
          <h1 className='row'>{projectName}</h1>
        </div>
        <ArticleList articles={articles} />
      </div>
    );
}

HomePage.PropTypes = {
  projectName: PropTypes.string.isRequired,
  articles: PropTypes.array.isRequired
};


const mapStateToProps = (state) => {
  return {
    projectName: state.feedReducer.projectName,
    articles: state.feedReducer.articles
  };
};

export default connect(
  mapStateToProps
)(HomePage);
