import React from 'react';
import NoImage from '../asserts/placeholder_for_missing_posters.png';
import InfinitScroll from 'react-infinite-scroll-component';

const ClientList = ({ client, fetchNextUsers, hasMore, imageData }) => {
  return (
    <>
      <div>
        <InfinitScroll
          dataLength={(client || []).length}
          next={fetchNextUsers}
          hasMore={hasMore}
          loader={<h4>Loading ... </h4>}
        >
          <div className='grid grid-cols-3 gap-4 content-center'>
            {client &&
              client.map((d, i) => {
                let clientImage = imageData[d['poster-image'].split('.')[0]];
                return (
                  <div key={i}>
                    <img
                      src={clientImage ? clientImage.default : NoImage}
                      alt='images'
                    />
                    <div style={{ color: 'white' }}>{d.name}</div>
                  </div>
                );
              })}
          </div>
        </InfinitScroll>
      </div>
    </>
  );
};

export default ClientList;
