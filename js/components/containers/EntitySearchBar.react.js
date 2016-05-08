import { connect } from 'react-redux';
import * as actionCreators from '../../actions/filterActions';
import Typeahead from '../pieces/Typeahead.react';

const mapStateToProps = state => {
  return {
    map: state.entityReducer,
    ...state.filterReducer.entityInput
  };
};


const mapDispatchToProps = dispatch => {
  return {
    filterHandler: query => dispatch(actionCreators.fetchEntitySearch(query)),
    keyPressHandler: keyCode => dispatch(actionCreators.updateActiveTypeaheadField(keyCode, 'entityInput')),
    deleteSelection: i => dispatch(actionCreators.deleteTypeaheadSelection(i, 'entityInput')),
    onHover: i => dispatch(actionCreators.onHoverTypeahead(i, 'entityInput')),
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Typeahead);