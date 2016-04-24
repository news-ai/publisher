import React from 'react';

function ArticleInputBar({url, inputHandler, onClickHandler, isReceiving, didInvalidate}) {
  return (
    <div className='row' style={{
        marginBottom: '5px',
        marginTop: '5px',
        display: 'flex',
        alignItems: 'center',
    }}>
    <span style={{margin: '5px'}}>Put URL here: </span>
       <input
        className='u-max-full-width'
        type='text'
        onKeyUp={ e => e.which === 13 ? onClickHandler() : null}
        onChange={ e => inputHandler(e.target.value)}
        defaultValue=''
        value={url}
        style={{
            border: didInvalidate ? '1px solid red' : null
        }}
        ></input>
        <button onClick={ _ => onClickHandler()}>Submit</button>

        { isReceiving ? <img style={{
            marginLeft: '5px',
            width: '30px',
            height: '30px',
        }} src='../../img/default_loading.gif'></img> : null}
    </div>
    );
}

export default ArticleInputBar;
