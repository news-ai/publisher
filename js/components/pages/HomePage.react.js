/*
 * HomePage
 * This is the first thing users see of our App
 */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/AppActions';
import ArticleList from '../pieces/ArticleList.react';

class HomePage extends Component {
  componentDidMount() {
    let {dispatch, articleIds} = this.props;
    if (articleIds === undefined) dispatch(actionCreators.fetchFeed());
  }

  render() {
    let {projectName, articles, feedIsReceving, articleIsReceiving, onScrollBottom, next} = this.props;
    const loading = (<span>The feed is loading</span>);
    return (
      <div>
          <div className='container'>
            <h1 className='row'>{projectName}</h1>
            <button onClick={() => onScrollBottom()}>CLICK TO GET MORE FEED</button>
          </div>
          <div className='container article-list-container'>
          {(articles === undefined || next === undefined) ? loading :
        <ArticleList articles={articles} />
      }
        </div>
        </div>
      );
  }
}

// HomePage.PropTypes = {
//   projectName: PropTypes.string.isRequired,
//   articles: PropTypes.array.isRequired
// };


const mapStateToProps = (state) => {
  const feedArticleIds = state.feedReducer.feedArticleIds;
  return {
    projectName: state.feedReducer.projectName,
    next: state.feedReducer.next,
    articleIds: feedArticleIds,
    feedIsReceving: state.feedReducer.isReceiving,
    articleIsReceiving: state.articleReducer.isReceiving,
    articles: (state.feedReducer.next === undefined) ? undefined : feedArticleIds.map((articleId) => state.articleReducer[articleId])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onScrollBottom: () => dispatch(actionCreators.fetchAdditionalFeed()),
    dispatch: (action) => dispatch(action)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
