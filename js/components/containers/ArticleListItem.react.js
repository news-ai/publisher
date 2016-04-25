import { connect } from 'react-redux';
import * as actionCreators from '../../actions/AppActions';
import ArticleListItem from '../pieces/ArticleListItem.react';

const mapStateToProps = state => {
	return {};
}


const mapDispatchToProps = dispatch => {
	return {
		toggleStar: articleId => dispatch(actionCreators.toggleStar(articleId)),
		toggleReadLater: articleId => dispatch(actionCreators.toggleReadLater(articleId))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(ArticleListItem);
