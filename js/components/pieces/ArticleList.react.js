import React, { Component } from 'react';

class ArticleList extends Component {
  render() {
    const articles = this.props.list;
    return (
      <ul>
        {articles.map(function(listValue) {
          return <li key={listValue.id}>{listValue.name}</li>;
        })}
      </ul>
    );
  }
}

export default ArticleList;
