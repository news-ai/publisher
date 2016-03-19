import React from 'react';

function AdditionalLoading({name}) {
  return (
    <div style={{
      backgroundColor: 'gray',
      color: 'white',
      fontSize: '2em',
      width: '100% !important',
      position: 'absolute',
      textAlign: 'center'
    }}>The {name} is loading</div>
    );
}

export default AdditionalLoading;