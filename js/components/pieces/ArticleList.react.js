import React, { PropTypes } from 'react';
import ArticleListItem from '../containers/ArticleListItem.react';

function ArticleList({articles}) {
  return (
    <div>
        <div>
        {
          articles.map((article, i) => <ArticleListItem key={i} {...article} />)
        }
        </div>
      </div>
    );
}

ArticleList.PropTypes = {
  articles: PropTypes.array.isRequired,
};

export default ArticleList;
