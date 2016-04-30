import { connect } from 'react-redux';
import * as actionCreators from '../../actions/publisherActions';
import Typeahead from '../pieces/Typeahead.react';

const mapStateToProps = state => {
	return {
		map: state.publisherReducer,
		list: state.publisherReducer.publishers,
		...state.publisherReducer.searchInput
	};
}


const mapDispatchToProps = dispatch => {
	return {
	    filterHandler: query => dispatch(actionCreators.filterPublishers(query)),
	    keyPressHandler: keyCode => dispatch(actionCreators.updateActiveTypeaheadField(keyCode)),
	    deleteSelection: i => dispatch(actionCreators.deleteTypeaheadSelection(i)),
	    onHover: i => dispatch(actionCreators.onHoverTypeahead(i)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(Typeahead);
