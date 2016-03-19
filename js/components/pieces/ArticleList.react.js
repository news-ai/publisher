import React, { PropTypes } from 'react';
import ArticleListItem from './ArticleListItem.react';

function ArticleList({articles}) {
  return (
    <div>
        <div className='row article-list-categories'>
        <div className='five columns'>Name</div>
        <div className='seven columns'>Summary</div>
        </div>
        <div>
        {articles.map((article, i) => {
      return (<ArticleListItem
        key={i}
        {...article}
        />);
    })}
        </div>
      </div>
    );
}

ArticleList.PropTypes = {
  articles: PropTypes.array.isRequired,
};

export default ArticleList;
