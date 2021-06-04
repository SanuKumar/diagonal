import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import navBar from '../asserts/nav_bar.png';
import back from '../asserts/Back.png';
import search from '../asserts/search.png';

const Header = ({ handleSearch }) => {
  const [title, setTitle] = useState('');
  const clientList = useSelector((state) => state.client);
  const { error, clientData } = clientList;
  const searchString = useRef(null);

  useEffect(() => {
    if (error) {
      return;
    } else {
      setTitle(clientData?.title);
    }
  }, [title, error, clientData]);

  return (
    <div className='fixed'>
      <div>
        <img className='w-screen h-8' src={navBar} alt='navbar' />
      </div>
      <div className='flex absolute top-0 p-2 items-center'>
        <img className='h-4 pl-5' src={back} alt='back-button' />
        <div className='text-white pl-5'>{title}</div>
        <div className='pl-5'>
          <input
            type='search'
            name='search'
            ref={searchString}
            placeholder='Search'
            className='border rounded py-2 px-3 h-1 w-32 outline-none'
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <button
          type='submit'
          onClick={() => handleSearch(searchString.current.value)}
        >
          <img src={search} alt='search' className='h-4 pl-5' />
        </button>
      </div>
    </div>
  );
};

export default Header;
