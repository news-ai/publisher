import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/AppActions';
import EntityList from '../pieces/EntityList.react';
import { Link } from 'react-router';

class Article extends Component {
  componentDidMount() {
    let {dispatch, article, entities, isReceiving} = this.props;
    let action = actionCreators.fetchArticleEntities(article.id);
    if (entities.length === 0 && !isReceiving) dispatch(action);
  }

  render() {
    let {article, articleId, entities, entityScores, isReceiving} = this.props;
    const loading = (<span>The entities are loading</span>);
    return (
      <div className='container'>
            <div className='row'>
                <div className='twelve columns'>
                    <h5>Article Details</h5>
                    <div>
                        <p>Title: {article.name}</p>
                        <p>Publisher: {article.publisher.name}</p>
                        <p>Summary: {article.summary}</p>
                        <p>Authors: {article.authors.map((author, i) => <span key={i}><Link to={'/authors/' + author.id}>{author.name} </Link></span>)}</p>
                    </div>
                </div>
            </div>
            <div className='row'>
            <div className='twelve columns'>
                <h5>Entities</h5>
                { (isReceiving && entities.length >= 0) ? loading :
        <EntityList entities={entities} entityScores={entityScores} />}
                </div>
            </div>
        </div>
      );
  }
}

const mapStateToProps = (state, props) => {
  const article = state.feedReducer.articles.find((article) => article.id === parseInt(props.params.articleId, 10));
  const entitiesNotLoaded = article.entity_scores.some((score) => state.entityReducer[score.entity_id] === undefined);
  return {
    article: article,
    articleId: props.params.articleId,
    entities: (article.entity_scores.length === 0 || entitiesNotLoaded) ? [] : article.entity_scores.map((score) => state.entityReducer[score.entity_id]),
    isReceiving: state.entityReducer.isReceiving,
    entityScores: article.entity_scores.map((obj) => obj.score)
  };
};

export default connect(
  mapStateToProps
)(Article);
