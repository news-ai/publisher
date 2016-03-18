import React, { Component } from 'react';
import * as actionCreators from '../../actions/AppActions';
import { connect } from 'react-redux';

class Entity extends Component {
  componentDidMount() {
    let {dispatch, entityId, entity} = this.props;
    let action = actionCreators.fetchEntity(entityId);
    if (entity === undefined) dispatch(action);
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