import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/AppActions';
import { bindActionCreators } from 'redux'

function Article({article, articleId}) {
  return (
    <span>THIS IS ARTCLE {articleId}</span>
    );
}

const mapStateToProps = (state, props) => {
  return {
    article: state.feedReducer.articles.filter((article) => article.id === parseInt(props.params.articleId, 10))[0],
    articleId: props.params.articleId
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  // console.log(stateProps);
  // console.log(dispatchProps);
  // console.log(ownProps);
  let entityIds = stateProps.article.entity_scores.map((entity) => entity.entity_id);
  dispatchProps.fetchArticleEntities(entityIds);
  return {};
};

export default connect(
  mapStateToProps,
  actionCreators,
  mergeProps
)(Article);
