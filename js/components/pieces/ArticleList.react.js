import React, { PropTypes } from 'react';
import ArticleListItem from './ArticleListItem.react';

function ArticleList({articles}) {
  return (
    <div className='container article-list-container'>
        <div className='row article-list-categories'>
        <div className='five columns'>Name</div>
        <div className='seven columns'>Summary</div>
        </div>
        <div>
        {articles.map((article) => {
      return (<ArticleListItem
        key={article.id}
        {...article}
        />);
    })}
        </div>
      </div>
    );
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onFbClick: () => dispatch(shouldFetchFb())
//   };
// };

// const Welcome = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(NoLogin);


ArticleList.PropTypes = {
  articles: PropTypes.array.isRequired,
};

export default ArticleList;
