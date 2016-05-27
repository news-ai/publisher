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
		const { fetchFollow, entities, entityFollowing, toggleEntityFollow, entityNext, publishers, publisherFollowing, togglePublisherFollow, pubNext } = this.props;
		return (
			<div className='container'>
      <div style={{
        marginTop: '20px',
        marginBottom: '5px',
        borderBottom: '1px solid lightgray'
      }}>
        <span>Entities you Followed</span>
      </div>
      <FollowingList fetchFollow={fetchFollow} list={entities} next={entityNext} following={entityFollowing} toggleFollow={toggleEntityFollow} followType='entities' />
      <div style={{
        marginTop: '20px',
        marginBottom: '5px',
        borderBottom: '1px solid lightgray'
      }}>
        <span>Publishers you Followed</span>
      </div>
      <FollowingList fetchFollow={fetchFollow} list={publishers} next={pubNext} following={publisherFollowing} toggleFollow={togglePublisherFollow} followType='publishers' />
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
    entityNext: state.entityReducer.next,
    publisherFollowing: state.publisherReducer.following,
    publishers,
    pubIds,
    pubNext: state.publisherReducer.next
	};
}

const mapDispatchToProps = dispatch => {
	return {
		dispatch: action => dispatch(action),
    toggleEntityFollow: id => dispatch(actionCreators.toggleFollow(id, 'entities')),
    togglePublisherFollow: id => dispatch(actionCreators.toggleFollow(id, 'publishers')),
    fetchFollow: followType => dispatch(actionCreators.fetchFollow(followType))
	};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Following);
