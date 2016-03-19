import React, { Component } from 'react';
import * as actionCreators from '../../actions/AppActions';
import { connect } from 'react-redux';
import ArticleList from '../pieces/ArticleList.react';


class Entity extends Component {
  componentDidMount() {
    let {dispatch, entityId, entity, entityArticles} = this.props;
    if (entity === undefined) {
      Promise.all([
        dispatch(actionCreators.fetchEntity(entityId))])
        .then(() => dispatch(actionCreators.fetchEntityArticles(entityId)));
    }
    if (entity !== undefined && entityArticles === undefined) dispatch(actionCreators.fetchEntityArticles(entityId));
  }

  render() {
    let {entity, entityArticles, onScrollBottom} = this.props;
    const entityLoading = (<span>The entity is loading</span>);
    const articleLoading = (<span>The articles are loading</span>);
    return (
      <div className='container entity'>
        <div className='row'>
        {(entity === undefined) ? entityLoading : (
        <div className='twelve columns'>
            <h5>{entity.name}</h5>
            <p>Type: {entity.main_type}</p>
            </div>
        )}
        </div>
        <div className='row'>
          { (entityArticles === undefined) ? articleLoading : (
        <div>
            <button onClick={() => onScrollBottom()}>ADDITIONAL LOADING</button>
        <ArticleList articles={entityArticles} />
        </div>
        )}
          </div>
      </div>
      );
  }
}

const mapStateToProps = (state, props) => {
  const entityId = parseInt(props.params.entityId, 10);
  const entity = state.entityReducer[entityId];
  return {
    entityId: entityId,
    entity: entity,
    entityArticles: (entity === undefined || entity['entity_articles'] === undefined) ? undefined : (entity.entity_articles.some((id) => state.articleReducer[id] === undefined)) ? undefined : entity.entity_articles.map((id) => state.articleReducer[id])
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const entityId = parseInt(props.params.entityId, 10);
  return {
    onScrollBottom: () => {
      // ev.preventDefault();
      // if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) 
      dispatch(actionCreators.fetchAdditionalEntityArticles(entityId));
    },
    dispatch: action => dispatch(action)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Entity);
