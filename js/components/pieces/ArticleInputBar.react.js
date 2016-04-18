import React from 'react';

function ArticleInputBar({url, inputHandler, onClickHandler, isReceiving}) {
  return (
    <div className='row'>
    <span>Add Article</span>
       <input
        className='u-max-full-width'
        type='text'
        onKeyUp={ e => {
			if (e.which === 13) onClickHandler();
        }}
        onChange={e => inputHandler(e.target.value)}
        defaultValue=''
        value={url}
        ></input>
        <button onClick={ _ => onClickHandler()}>Submit</button>
        { isReceiving ? <i className='fa fa-spinner' ariaHidden='true'></i>: null}
    </div>
    );
}

export default ArticleInputBar;
