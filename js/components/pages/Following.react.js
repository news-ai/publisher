import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/AppActions';
import FollowingList from '../pieces/FollowingList.react';


class Following extends Component {
  componentWillMount() {
  	const { dispatch } = this.props;
    dispatch(actionCreators.fetchFollow('entities'));
    dispatch(actionCreators.fetchFollow('publishers'));
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(actionCreators.fetchFollow('entities'));
    dispatch(actionCreators.fetchFollow('publishers'));
  }

	render() {
		const { entities, dispatch, following, toggleEntityFollow } = this.props;
		return (
			<div className='container'>
      <div style={{
        marginTop: '8px',
        marginBottom: '5px',
        borderBottom: '1px solid lightgray'
      }}>
        <span>Entities you Followed</span>
      </div>
      <FollowingList list={entities} following={following} toggleFollow={toggleEntityFollow} followType='entities' />
			</div>
		)
	}
}

const mapStateToProps = state => {
	const entityIds = Object.keys(state.entityReducer.following).filter( id => state.entityReducer[id]);
	const entities = entityIds.map(id => state.entityReducer[id]);
	return {
    following: state.entityReducer.following,
		entities,
    entityIds
	};
}

const mapDispatchToProps = dispatch => {
	return {
		dispatch: action => dispatch(action),
    toggleEntityFollow: id => dispatch(actionCreators.toggleFollow(id, 'entities'))
	};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Following);
