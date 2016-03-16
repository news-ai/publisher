import React, { Component } from 'react';

// function Article() {
//   return (<span>THIS IS ARTICLE PAGE {this.props.params.articleId} </span>);
// }

class Article extends Component {
  render() {
    return (
      <span>
    	THIS IS ARTICLE {this.props.params.articleId}
    	</span>
      );
  }
}

export default Article;
