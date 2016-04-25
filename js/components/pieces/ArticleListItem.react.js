import React, { PropTypes } from 'react';
import { Link } from 'react-router';
const moment = require('moment-timezone');

function ArticleListItem({id, name, url, summary, added_at, publisher, entity_scores, starred, toggleStar, read_later, toggleReadLater}) {
  const timestring = moment(added_at).tz('America/New_York').format('MMM D, YYYY hh:mm A');
  const star = starred || starred !== null ? 'fa fa-star fa-lg starred pull-right star' : 'fa fa-star-o fa-lg pull-right star';
  return (
    <div className='row article-body' key={id}>
      <div className='twelve columns'>
          <div className='article-name'>
            <Link style={{color: 'black', fontWeight: 550}} to={'/articles/' + id}><span>{name}</span></Link>
            <i style={{
              color: starred ? null : 'lightgray'
            }} className={star} ariaHidden='true' onClick={ _ => toggleStar(id)}></i>
            <i style={{
              color: read_later || read_later !== null ? 'gray' : 'lightgray'
            }} className='fa fa-book fa-lg pull-right' ariaHidden='true' onClick={ _ => toggleReadLater(id)}></i>
          </div>
          <div className='article-publisher'>
            <Link to={'/publishers/' + publisher.id}><span>{publisher.name}</span></Link>
          </div>
            { entity_scores.length >= 3 ? (
            <div className='article-top3-entities'>
              { entity_scores.map((entity, i) => i < 3 ?
              <Link to={'/entities/' + entity_scores[i].entity.id}><div>{entity_scores[i].entity.name}</div></Link>
              : null)}
            </div>
              ) : null}
          <div className='article-bulletpoints'>
          <span>
          {summary}
          </span>
          <div>
            <a target='_blank' style={{fontSize: '0.8em'}} href={url}>{url}</a>
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
  starred: PropTypes.bool.isRequired,
};

export default ArticleListItem;
