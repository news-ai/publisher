import React, { Component, Text } from 'react';

class ArticleList extends Component {
  render() {
    let articles = this.props.list;
    return (
      <ul>
        {articles.map(function(listValue, i){
          return <li key={listValue['id']}>{listValue['name']}</li>;
        })}
      </ul>
    );
  }
}

export default ArticleList;