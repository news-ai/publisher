import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actionCreators from '../../actions/AppActions';

class Following extends Component {
  componentDidMount() {
  	const { dispatch } = this.props;
  }

	render() {
		const { entities, dispatch } = this.props;
		console.log(entities);
		return (
			<div className='container'>
			FOLLOWING
			{ entities.length > 0 ? entities.map( entity => (
					<div className='row' style={{display: 'flex'}}>
						<div className='six columns'>
							<Link to={`/entities/${entity.id}`}>
								<div className='round-btn'>{entity.name}</div>
							</Link>
						</div>	
						<div className='two columns'>
              <i className='fa fa-plus fa-lg pull-right' style={{
                color: 'black'
              }} ariaHidden='true' onClick={ _ => dispatch(actionCreators.toggleFollow(entity.id, 'entities'))}></i>
						</div>
					</div>
				)) : null }
			</div>
		)
	}
}

const mapStateToProps = state => {
	const entityIds = Object.keys(state.entityReducer.following).filter( id => state.entityReducer.following[id] === true);
	const entities = entityIds.map(id => state.entityReducer[id]);
	return {
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
