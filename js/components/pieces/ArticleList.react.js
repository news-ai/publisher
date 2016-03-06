import React, { Component } from 'react';
import ArticleListItem from './ArticleListItem.react';

class ArticleList extends Component {
  // <div className='three columns'>Entities</div>
  render() {
    const articles = this.props.list;
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
}

export default ArticleList;
