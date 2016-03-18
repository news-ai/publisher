import React, { Component } from 'react';
import { connect } from 'react-redux';

class Entity extends Component {
  componentDidMount() {
    let {entityId} = this.props;

  }

  render() {
    let {entityId} = this.props;
    return (
      <div className='entity'>
      ENTITY PAGE
      </div>
      );
  }
}

const mapStateToProps = (state, props) => {
  return {
    entityId: parseInt(props.params.entityId)
  };
}

export default connect(mapStateToProps)(Entity);