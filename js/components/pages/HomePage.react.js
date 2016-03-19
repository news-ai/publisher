/*
 * HomePage
 * This is the first thing users see of our App
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/AppActions';
import ArticleList from '../pieces/ArticleList.react';

class HomePage extends Component {
  componentDidMount() {
    let {dispatch, articleIds} = this.props;
    if (articleIds === undefined) dispatch(actionCreators.fetchFeed());
  }

  render() {
    let {projectName, articles, feedIsReceving, articleIsReceiving} = this.props;
    const loading = (<span>The feed is loading</span>);
    return (
      <div>
          <div className='container'>
            <h1 className='row'>{projectName}</h1>
          </div>
          <div className='container article-list-container'>
          {(articles === undefined || feedIsReceving || articleIsReceiving) ? loading :
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
    articleIds: feedArticleIds,
    feedIsReceving: state.feedReducer.isReceiving,
    articleIsReceiving: state.articleReducer.isReceiving,
    articles: (feedArticleIds === undefined || state.articleReducer.isReceiving) ? undefined : feedArticleIds.map((articleId) => state.articleReducer[articleId])
  };
};

export default connect(
  mapStateToProps
)(HomePage);
