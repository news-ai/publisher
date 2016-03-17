import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/AppActions';
import Entity from '../pieces/Entity';
// import { bindActionCreators } from 'redux';

class Article extends Component {
  componentDidMount() {
    let {dispatch, article} = this.props;
    let entityIds = article.entity_scores.map((entity) => entity.entity_id);
    let action = actionCreators.fetchArticleEntities(entityIds);
    dispatch(action);
  }

  render() {
    let {article, articleId, entities} = this.props;
    let loading = (<span>The article is loading</span>);
    // console.log(entities);
    //   <div key={entity.id}>
    //                 {entity.name}
    //                 </div>
    return (
      <div className='container'>
            <div className='row'>
                <div className='four columns'>
                    <h5>Entities</h5>
                { (entities.length !== article.entity_scores.length) ? loading :
        entities.map((entity, i) => <Entity key={entity.id} entityScore={article.entity_scores[i]} {...entity} />)}
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
  return {
    article: state.feedReducer.articles.filter((article) => article.id === parseInt(props.params.articleId, 10))[0],
    articleId: props.params.articleId,
    entities: state.entityReducer.entities
  };
};

export default connect(
  mapStateToProps
)(Article);
