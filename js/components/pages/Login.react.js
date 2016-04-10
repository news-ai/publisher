import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/AppActions';

class Login extends Component {
	render() {
		const { loginWithGoogle } = this.props;
		return (
			<div className='container'>
			<button onClick={loginWithGoogle()}>Login with Google</button>
			</div>
			);
	}
}

const mapStateToProps = state => {
	return {
		person: state.personReducer.person

	};
};

const mapDispatchToProps = dispatch => {
	return {
		loginWithGoogle: dispatch(actionCreators.loginWithGoogle())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps)(Login);
