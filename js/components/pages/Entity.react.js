import React, { Component } from 'react';
import * as actionCreators from '../../actions/AppActions';
import { connect } from 'react-redux';
import ArticleList from '../pieces/ArticleList.react';


class Entity extends Component {
  componentDidMount() {
    let {dispatch, entityId, entity} = this.props;
    if (entity === undefined) {
      dispatch(actionCreators.fetchEntity(entityId));
      dispatch(actionCreators.fetchEntityArticles(entityId));
    }
  }

  render() {
    let {entityId, entity} = this.props;
    const loading = (<span>The entity is loading</span>);
    return (
      <div className='container entity'>
        <div className='row'>
          { (entity === undefined) ? loading : (
        <div className='twelve columns'>
            <h5>{entity.name}</h5>
            <p>Type: {entity.main_type}</p>
          </div>
        )}
        </div>
      </div>
      );
  }
}

const mapStateToProps = (state, props) => {
  const entityId = parseInt(props.params.entityId);
  return {
    entityId: entityId,
    entity: state.entityReducer[entityId]
  };
};

export default connect(mapStateToProps)(Entity);