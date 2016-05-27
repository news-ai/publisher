import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/AppActions';
import EntityListItem from '../pieces/EntityListItem.react';
import { Link } from 'react-router';

class Article extends Component {
  componentDidMount() {
    mixpanel.people.increment("articles read");
    const {dispatch, article, articleId} = this.props;
    if (article === undefined) dispatch(actionCreators.fetchArticle(articleId));
  }

  render() {
    const {article, entities, entityScores, toggleFollow, following} = this.props;

    const entitiesLoading = (<span>The entities are loading</span>);
    const articleLoading = (<span>The article is loading</span>);
    const entitiesProcessing = (
      <div style={{display: 'flex', alignItems: 'center'}}>
        <span>Entities are being processed. Come back in 5-10 minutes.</span>
        <img style={{
          marginLeft: '5px',
          width: '30px',
          height: '30px',
        }} src='../../img/default_loading.gif'></img>
      </div>);
    return (
      <div className='container'>
            <div className='row'>
                <div className='twelve columns'>
                { article ? (<div>
                    <h5>Article Details</h5>
                        <img className='u-max-full-width' src={article.header_image} />
                        <div style={{
                          fontSize: '2em',
                          fontWeight: 500
                        }}>{article.name}</div>
                        <Link to={'/publishers/' + article.publisher.id}>
                          <div>{article.publisher.name}</div>
                        </Link>
                        <p>
                        <span style={{fontWeight: 'bold'}}>Summary: </span>
                        {article.summary}
                        </p>
                        <span className='pull-right'>{article.added_at}</span>
                        <p>Link: <a target='_blank' href={article.url}>{article.url}</a></p>
                    </div>) : articleLoading
                }
                </div>
            </div>
            <div className='row'>
            <div className='twelve columns' style={{marginBottom: '200px'}}>
                <h5>Entities</h5>
                {
                  entities ? entities.length > 0 ?
                      <div>
                        <div className='row entity-categories'>
                        <span className='ten columns'>Name</span>
                        <span className='two columns'>Relevance</span>
                        </div>
                        <div className='entity-body'>
                      {entities.map((entity, i) => <EntityListItem key={entity.id} following={following} toggleFollow={toggleFollow} entityScore={entityScores[i]} {...entity} />)}
                        </div>
                      </div>
                    : entitiesProcessing
                  : entitiesLoading
                }
                </div>
            </div>
        </div>
      );
  }
}

const mapStateToProps = (state, props) => {
  const article = state.articleReducer[parseInt(props.params.articleId, 10)];
  return {
    article: article,
    articleId: props.params.articleId,
    entities: article ? article.entity_scores.map( score => score.entity) : undefined,
    entityScores: article ? article.entity_scores.map( obj => obj.score) : undefined,
    following: state.entityReducer.following
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: action => dispatch(action),
    toggleFollow: id => dispatch(actionCreators.toggleFollow(id, 'entities'))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article);
