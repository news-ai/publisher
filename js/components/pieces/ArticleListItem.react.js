import React, { PropTypes } from 'react';
import { Link } from 'react-router';
let moment = require('moment-timezone');

function ArticleListItem({id, name, url, summary, added_at, authors, publisher, entity_scores}) {
  const timestring = moment(added_at).tz('America/New_York').format('MMM D, YYYY hh:mm A');
            /*<i
            className='fa fa-star fa-2x pull-right'
            style={{
              color: 'gray'
            }}
            ariaHidden='true'
            ></i>*/
  return (
    <div className='row article-body' key={id}>
      <div className='twelve columns'>
          <div className='article-name'>
            <Link style={{color: 'black', fontWeight: 550}} to={'/articles/' + id}><span>{name}</span></Link>
          </div>
          <div className='article-publisher'>
            <Link to={'/publishers/' + publisher.id}><span>{publisher.name}</span></Link>
          </div>
            {entity_scores.length >= 3 ? (
            <div className='article-top3-entities'>
              {entity_scores.map((entity, i) => (i < 3) ?
              <Link to={'/entities/' + entity_scores[i].entity.id}><div>{entity_scores[i].entity.name}</div></Link>
              : null)}
            </div>
              ) : null}
          <div className='article-authors'>
          {authors.map((author, i) => <span key={i}><Link to={'/authors/' + author.id}>{author.name} </Link></span>)}
          </div>
          <div className='article-bulletpoints'>
          <span>
          {summary}
          </span>
          <div>
            <span className='pull-right article-list-item-date'>{timestring}</span>
          </div>
          </div>
        </div>
      </div>
    );
}

ArticleListItem.PropTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  added_at: PropTypes.string.isRequired,
  header_image: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
};

export default ArticleListItem;
