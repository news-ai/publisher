import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/AppActions';
import EntityList from '../pieces/EntityList.react';
import { Link } from 'react-router';

class Article extends Component {
  componentDidMount() {
    let {dispatch, article, articleId, entities} = this.props;

    if (article === undefined)
      Promise.all([dispatch(actionCreators.fetchArticle(articleId))]).then(() => dispatch(actionCreators.fetchArticleEntities(articleId)));
    if (article !== undefined && entities.some((entity) => entity === undefined)) dispatch(actionCreators.fetchArticleEntities(articleId));
    console.log(entities);
    console.log(article);
  }

  render() {
    let {article, articleId, entities, entityScores} = this.props;
    const loading = (<span>The entities are loading</span>);
    console.log(article);
    console.log(entities);
    return (
      <div className='container'>
            <div className='row'>
                <div className='twelve columns'>
                {(article === undefined) ? loading : (
        <div>
                    <h5>Article Details</h5>
                        <p>Title: {article.name}</p>
                        <p>Publisher: {article.publisher.name}</p>
                        <p>Summary: {article.summary}</p>
                        <p>Authors: {article.authors.map((author, i) => <span key={i}><Link to={'/authors/' + author.id}>{author.name} </Link></span>)}</p>
                    </div>
        )}
                </div>
            </div>
            <div className='row'>
            <div className='twelve columns'>
                <h5>Entities</h5>
                { (entities === undefined || entities.some((entity) => entity === undefined)) ? loading :
        <EntityList entities={entities} entityScores={entityScores} />}
                </div>
            </div>
        </div>
      );
  }
}

const mapStateToProps = (state, props) => {
  const article = state.articleReducer[parseInt(props.params.articleId, 10)];
  console.log(article);
  console.log(state.articleReducer.isReceiving);
  console.log(state.entityReducer.isReceiving);
  return {
    article: article,
    articleId: props.params.articleId,
    entities: (article === undefined || state.articleReducer.isReceiving || state.entityReducer.isReceiving) ? undefined : article.entity_scores.map((score) => state.entityReducer[score.entity_id]),
    entityScores: (article === undefined) ? undefined : article.entity_scores.map((obj) => obj.score)
  };
};

export default connect(
  mapStateToProps
)(Article);
