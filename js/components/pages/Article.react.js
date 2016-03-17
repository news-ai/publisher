import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/AppActions';
import Entity from '../pieces/Entity';
// import { bindActionCreators } from 'redux';

class Article extends Component {
  componentDidMount() {
    let {dispatch, article} = this.props;
    let action = actionCreators.fetchArticleEntities(article.id);
    dispatch(action);
  }

  render() {
    let {article, articleId, entities, entityScores, isReceiving} = this.props;
    let loading = (<span>The article is loading</span>);
    return (
      <div className='container'>
            <div className='row'>
                <div className='four columns'>
                    <h5>Entities</h5>
                { (isReceiving && entities.length > 0) ? loading :
        entities.map((entity, i) => <Entity key={entity.id} entityScore={entityScores[i]} {...entity} />)}
                </div>
                <div className='eight columns'>
                    <h5>Article Details</h5>
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
    entities: state.entityReducer.entities,
    isReceiving: state.entityReducer.isReceiving,
    entityScores: article.entity_scores.map((obj) => obj.score)
  };
};

export default connect(
  mapStateToProps
)(Article);
