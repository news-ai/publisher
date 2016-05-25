import { connect } from 'react-redux';
import * as actionCreators from '../../actions/AppActions';
import EntityListItem from '../pieces/EntityListItem.react';

const mapStateToProps = state => {
  return {
    following: state.entityReducer.following
  };
}


const mapDispatchToProps = dispatch => {
  return {
    toggleFollow: entityId => dispatch(actionCreators.toggleFollow(entityId, 'entities')),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(EntityListItem);
