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
					<div className='row'>
						<div className='twelve columns'>
							<div className='article-top3-entities'>
								<Link to={`/entities/${entity.id}`}>
									<div>{entity.name}</div>
								</Link>
							<span className='right'>{entity.main_type}</span>
							</div>
						</div>	
					</div>
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
