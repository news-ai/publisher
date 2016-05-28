import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/AppActions';
import FollowingList from '../pieces/FollowingList.react';


class Following extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entityIdx: 0,
      pubIdx: 0
    };
  }
  componentWillMount() {
  	const { dispatch } = this.props;
    dispatch(actionCreators.flushFollow('entities'));
    dispatch(actionCreators.flushFollow('publishers'));
    dispatch(actionCreators.fetchFollow('entities'));
    dispatch(actionCreators.fetchFollow('publishers'));
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(actionCreators.fetchFollow('entities'));
    dispatch(actionCreators.fetchFollow('publishers'));
  }

	render() {
		const { dispatch, entities, entityFollowing, toggleEntityFollow, entityNext, entityPageIdx, entityMaxPages,
      publishers, publisherFollowing, togglePublisherFollow, pubNext, pubPageIdx, pubMaxPages } = this.props;
		return (
			<div>
      <div style={{
        marginTop: '20px',
        marginBottom: '5px',
        borderBottom: '1px solid lightgray'
      }}>
        <span>Entities you Followed</span>
      </div>
      <FollowingList
      list={entities}
      following={entityFollowing}
      toggleFollow={toggleEntityFollow}
      followType='entities'
      pageIdx={entityPageIdx}
      maxPages={entityMaxPages}
      clickNext={ _ => dispatch(actionCreators.nextPage('entities'))}
      clickPrev={ _ => dispatch(actionCreators.updateFollowPage('entities', -1))}/>
      <div style={{
        marginTop: '20px',
        marginBottom: '5px',
        borderBottom: '1px solid lightgray'
      }}>
        <span>Publishers you Followed</span>
      </div>
      <FollowingList
      list={publishers}
      next={pubNext}
      following={publisherFollowing}
      toggleFollow={togglePublisherFollow}
      followType='publishers'
      pageIdx={pubPageIdx}
      maxPages={pubMaxPages}
      clickPrev={ _ => dispatch(actionCreators.updateFollowPage('publishers', -1))}
      clickNext={ _ => dispatch(actionCreators.nextPage('publishers'))}/>
      </div>
		)
	}
}

const mapStateToProps = state => {
  const pubIds = state.publisherReducer.follows[state.publisherReducer.followIdx];
  const publishers = pubIds ? pubIds.map(id => state.publisherReducer[id]): [];
	const entityIds = state.entityReducer.follows[state.entityReducer.followIdx];
	const entities = entityIds ? entityIds.map(id => state.entityReducer[id]): [];
	return {
    entityFollowing: state.entityReducer.following,
		entities,
    entityIds,
    entityNext: state.entityReducer.next,
    entityMaxPages: state.entityReducer.followPageCount,
    entityPageIdx: state.entityReducer.followIdx,
    publisherFollowing: state.publisherReducer.following,
    publishers,
    pubIds,
    pubNext: state.publisherReducer.next,
    pubMaxPages: state.publisherReducer.followPageCount,
    pubPageIdx: state.publisherReducer.followIdx
	};
}

const mapDispatchToProps = dispatch => {
	return {
		dispatch: action => dispatch(action),
    toggleEntityFollow: id => dispatch(actionCreators.toggleFollow(id, 'entities')),
    togglePublisherFollow: id => dispatch(actionCreators.toggleFollow(id, 'publishers')),
    nextFollowPage: followType => dispatch(actionCreators.updateFollowPage(updateFollowPage, 1)),
    prevFollowPage: followType => dispatch(actionCreators.updateFollowPage(updateFollowPage, -1))
	};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Following);
