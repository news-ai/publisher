import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actionCreators from '../../actions/AppActions';

class Following extends Component {
  componentDidMount() {
  	const { dispatch } = this.props;
    dispatch(actionCreators.fetchFeed('entities'));
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(actionCreators.fetchFeed('entities'));
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
          width: '240px',
          display: 'inline',
          paddingLeft: '5px',
          paddingRight: '5px'
        }}>
						<div>
							<Link to={`/entities/${entity.id}`}>
								<div className='round-btn'>{entity.name}</div>
							</Link>
              <i className='fa fa-plus fa-lg pull-right' style={{
                color: following[entity.id] ? 'black' : 'lightgray',
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
		entities
	};
}

const mapDispatchToProps = dispatch => {
	return {
		dispatch: action => dispatch(action)
	};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Following);
