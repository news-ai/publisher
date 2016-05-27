import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actionCreators from '../../actions/AppActions';

class Following extends Component {
  componentWillMount() {
  	const { dispatch } = this.props;
    dispatch(actionCreators.fetchFollow('entities'));
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(actionCreators.fetchFollow('entities'));
  }

	render() {
		const { entities, dispatch, following } = this.props;
		return (
			<div className='container'>
      <div style={{
        marginTop: '8px',
        marginBottom: '5px',
        borderBottom: '1px solid lightgray'
      }}>
        <span>Entities you Followed</span>
      </div>
      <div style={{
        margin: 'auto',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start'
      }}>
			{ entities.length > 0 ? entities.map( entity => (
        <div className='following-entity' style={{
          marginTop: '8px',
          width: '240px',
          display: 'flex',
          alignItems: 'center',
          padding: '5px 10px 5px 10px',
          border: '1px solid lightgray',
        }}>
						<div>
							<Link to={`/entities/${entity.id}`}>
								<div className='round-btn'>{entity.name}</div>
							</Link>
              <i className='fa fa-plus fa-lg' style={{
                color: following[entity.id] ? 'black' : 'lightgray',
                alignSelf: 'flex-end'
              }} ariaHidden='true' onClick={ _ => dispatch(actionCreators.toggleFollow(entity.id, 'entities'))}></i>
						</div>	
          </div>
				)) : <span>You are not following any entities.</span> }
      </div>
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
		dispatch: action => dispatch(action)
	};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {next, entityId} = stateProps;
  const {dispatch} = dispatchProps;
  return {
    ...stateProps,
    onScrollBottom: (ev) => {
      ev.preventDefault();
      if ( ((window.innerHeight + window.scrollY + 20) >= document.body.offsetHeight) && next ) dispatch(actionCreators.fetchEntityArticles(entityId));
    },
    dispatch: action => dispatch(action)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Following);
