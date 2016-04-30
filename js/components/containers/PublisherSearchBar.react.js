import { connect } from 'react-redux';
import * as actionCreators from '../../actions/AppActions';
import Typeahead from '../pieces/Typeahead.react';

const mapStateToProps = state => {
	return {};
}


const mapDispatchToProps = dispatch => {
	return {
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(Typeahead);
