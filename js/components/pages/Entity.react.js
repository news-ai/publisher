import React, { Component } from 'react';
import * as actionCreators from '../../actions/AppActions';
import { connect } from 'react-redux';

class Entity extends Component {
  componentDidMount() {
    let {entityId, entity} = this.props;
    // let action = actionCreators.fetchArticleEntities(article.id);
    if (entity === undefined) dispatch(action);
  }

  render() {
    let {entityId} = this.props;
    return (
      <div className='entity'>
      ENTITY PAGE {entityId}
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