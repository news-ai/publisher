import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// function Article() {
//   return (<span>THIS IS ARTICLE PAGE {this.props.params.articleId} </span>);
// }

// class Article extends Component {
//   render() {
//     return (
//       <span>
//     	THIS IS ARTICLE {this.props.params.articleId}
//     	</span>
//       );
//   }
// }
function Article({article, articleId}) {
  return (
    <span>THIS IS ARTCLE {articleId}</span>
    );
}

const mapStateToProps = (state, props) => {
  return {
    article: state.articles.filter((article) => article.id === parseInt(props.params.articleId, 10))[0],
    articleId: props.params.articleId
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onFbClick: () => dispatch(shouldFetchFb())
//   };
// };

// const Welcome = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(NoLogin);

export default connect(
  mapStateToProps
)(Article);

// export default Article;
