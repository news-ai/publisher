import React, { Component } from 'react';

class ArticleList extends Component {
  render() {
    return (
      <ul>
        {this.props.list.map(function(listValue){
          return <li>{listValue['name']}</li>;
        })}
      </ul>
    )
  }
}