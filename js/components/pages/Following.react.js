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
		const { entities, entityFollowing, toggleEntityFollow, publishers, publisherFollowing, togglePublisherFollow } = this.props;
		return (
			<div className='container'>
      <div style={{
        marginTop: '20px',
        marginBottom: '5px',
        borderBottom: '1px solid lightgray'
      }}>
        <span>Entities you Followed</span>
      </div>
      <FollowingList list={entities} following={entityFollowing} toggleFollow={toggleEntityFollow} followType='entities' />
      <div style={{
        marginTop: '20px',
        marginBottom: '5px',
        borderBottom: '1px solid lightgray'
      }}>
        <span>Publishers you Followed</span>
      </div>
      <FollowingList list={publishers} following={publisherFollowing} toggleFollow={togglePublisherFollow} followType='publishers' />
      </div>
		)
	}
}

const mapStateToProps = state => {
  const pubIds = Object.keys(state.publisherReducer.following).filter( id => state.publisherReducer[id]);
  const publishers = pubIds.map(id => state.publisherReducer[id]);
	const entityIds = Object.keys(state.entityReducer.following).filter( id => state.entityReducer[id]);
	const entities = entityIds.map(id => state.entityReducer[id]);
	return {
    entityFollowing: state.entityReducer.following,
		entities,
    entityIds,
    publisherFollowing: state.publisherReducer.following,
    publishers,
    pubIds
	};
}

const mapDispatchToProps = dispatch => {
	return {
		dispatch: action => dispatch(action),
    toggleEntityFollow: id => dispatch(actionCreators.toggleFollow(id, 'entities')),
    togglePublisherFollow: id => dispatch(actionCreators.toggleFollow(id, 'publishers'))
	};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Following);
