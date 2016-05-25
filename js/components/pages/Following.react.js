import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actionCreators from '../../actions/AppActions';

class Following extends Component {
  componentDidMount() {
  	const { dispatch } = this.props;
  }

	render() {
		const { entities } = this.props;
		console.log(entities);
		return (
			<div className='container'>
			FOLLOWING
			{ entities.map( entity => (
				<Link to={`/entities/${entity.id}`}>
					<div className='row entity-item'>
						<div className='twelve columns'>
							<span>{entity.name}</span>
							<span className='pull-right'>{entity.main_type}</span>
						</div>	
					</div>
				</Link>
				)) }
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
