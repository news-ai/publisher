import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/AppActions';
import EntityList from '../pieces/EntityList';
// import { bindActionCreators } from 'redux';

class Article extends Component {
  componentDidMount() {
    let {dispatch, article, entities} = this.props;
    let action = actionCreators.fetchArticleEntities(article.id);
    if (entities === undefined) dispatch(action);
  }

  render() {
    let {article, articleId, entities, entityScores, isReceiving} = this.props;
    let loading = (<span>The article is loading</span>);
    return (
      <div className='container'>
            <div className='row'>
                <div className='eight columns'>
                    <h5>Article Details</h5>
                </div>
            </div>
            <div className='row'>
            <div className='eight columns'>
                    <h5>Entities</h5>
                { ((isReceiving && entities.length >= 0) || entities === undefined) ? loading :
        <EntityList entities={entities} entityScores={entityScores} />}
                </div>
            </div>
        </div>
      );
  }
}

const mapStateToProps = (state, props) => {
  const article = state.feedReducer.articles.filter((article) => article.id === parseInt(props.params.articleId, 10))[0];
  return {
    article: article,
    articleId: props.params.articleId,
    entities: state.entityReducer[article.id],
    isReceiving: state.entityReducer.isReceiving,
    entityScores: article.entity_scores.map((obj) => obj.score)
  };
};

export default connect(
  mapStateToProps
)(Article);
