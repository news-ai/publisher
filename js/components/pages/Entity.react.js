import React, { Component } from 'react';
import * as actionCreators from '../../actions/AppActions';
import { connect } from 'react-redux';
import ArticleList from '../pieces/ArticleList.react';
import AdditionalLoading from '../pieces/AdditionalLoading.react';
import CenterLoading from '../pieces/CenterLoading.react';


class Entity extends Component {
  constructor(props) {
    super(props);
    this._onScrollBottom = this._onScrollBottom.bind(this);
  }

  componentDidMount() {
    const {dispatch, entityId, entity, entityArticles } = this.props;
    if (entity === undefined) dispatch(actionCreators.fetchEntity(entityId)).then( _ => dispatch(actionCreators.fetchEntityArticles(entityId)));
    if (entity !== undefined && entityArticles === undefined) dispatch(actionCreators.fetchEntityArticles(entityId));
    window.addEventListener('scroll', this._onScrollBottom);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._onScrollBottom);
  }

  _onScrollBottom(ev) {
    const {dispatch, entityId} = this.props;
    ev.preventDefault();    
    if ((window.innerHeight + window.scrollY + 20) >= document.body.offsetHeight) dispatch(actionCreators.fetchEntityArticles(entityId));   
  }

  render() {
    const { dispatch, entityId, entity, entityArticles, next, articleIsReceiving, followed} = this.props;
    const entityLoading = (<span>The entity is loading</span>);
    const articleLoading = <CenterLoading name='articles'/>;

    return (
      <div className='container'>
        <div className='row'>
        {entity === undefined ? entityLoading : (
          <div className='twelve columns'>
            <div className='u-max-full-width' style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{fontWeight: 500, fontSize: '1.8em'}}>{entity.name}</span>
              <i className='fa fa-plus fa-lg right' style={{
                color: followed ? 'black' : 'lightgray'
              }} ariaHidden='true' onClick={ _ => dispatch(actionCreators.toggleFollow(entityId, 'entities'))}></i>
            </div>
            <p>Type: {entity.main_type}</p>
          </div>
        )}
        </div>
        <div>
          { (entityArticles === undefined) ? articleLoading : (
        <div>
        <ArticleList articles={entityArticles} />
        </div>
        )}
      {(entityArticles && next && articleIsReceiving) ? <AdditionalLoading name='articles are' /> : null}
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
    next: entity ? entity.next : undefined,
    articleIsReceiving: state.articleReducer.isReceiving,
    entityArticles: (entity === undefined || entity.entity_articles === undefined) ? undefined : (entity.entity_articles.some( id => state.articleReducer[id])) ? entity.entity_articles.map( id => state.articleReducer[id]) : undefined,
    followed: state.entityReducer.following[entityId] ? true : false
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    dispatch: action => dispatch(action)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Entity);
