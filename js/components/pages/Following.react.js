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
    console.log(entities);
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
        margin: '10px'
      }}>
			{ entities.length > 0 ? entities.map( entity => (
					<div className='row' style={{
            display: 'flex',
            marginTop: '3px'
          }}>
						<div className='four columns'>
							<Link to={`/entities/${entity.id}`}>
								<div className='round-btn'>{entity.name}</div>
							</Link>
						</div>	
						<div className='two columns'>
              <i className='fa fa-plus fa-lg' style={{
                color: following[entity.id] ? 'black' : 'lightgray'
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
