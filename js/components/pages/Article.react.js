import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/AppActions';
// import { bindActionCreators } from 'redux';

function Article({article, articleId}) {
  return (
    <div className='container'>
        <div className='row article-categories'>
            <div className='four columns'>
                <span>Entities</span>
            </div>
            <div className='eight columns'>
                <span>Article Details</span>
            </div>
        </div>
    <span>THIS IS ARTCLE {articleId}</span>
    </div>
    );
}

const mapStateToProps = (state, props) => {
  return {
    article: state.feedReducer.articles.filter((article) => article.id === parseInt(props.params.articleId, 10))[0],
    articleId: props.params.articleId,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  let entityIds = stateProps.article.entity_scores.map((entity) => entity.entity_id);
  let action = dispatchProps.fetchArticleEntities(entityIds);
  return Object.assign({}, ownProps, stateProps, dispatchProps);
};

export default connect(
  mapStateToProps,
  actionCreators,
  mergeProps
)(Article);
