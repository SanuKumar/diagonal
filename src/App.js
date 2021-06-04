import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './component/header';
import ClientList from './component/clientList';
import { useDispatch, useSelector } from 'react-redux';
import { listClient } from './actions/clientActions';

const App = () => {
  const dispatch = useDispatch();
  const [client, setClient] = useState([]);
  const [imageData, setImageData] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  //fetch list from store
  const clientList = useSelector((state) => state.client);
  const { clientData } = clientList;

  useEffect(() => {
    dispatch(listClient(pageNumber));
  }, [dispatch, pageNumber]);

  useEffect(() => {
    let data = (clientData || {})['content-items']?.content;
    let pNo = (clientData || {})['page-num-requested'];
    if (data && data.length && pNo) {
      setClient(client.concat(data));
      setHasMore(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientData]);

  const fetchNextUsers = () => {
    if (Number((clientData || {})['page-num-requested']) !== undefined)
      setPageNumber(Number((clientData || {})['page-num-requested']) + 1);
  };

  //get all the images from asserts
  useEffect(() => {
    const context = require.context('./asserts', true, /.jpg$/);
    let obj = {};
    context.keys().forEach((key) => {
      const clientCode = key
        .split('./')
        .pop() // remove the first 2 characters
        .substring(0, key.length - 6); // remove the file extension
      obj[clientCode] = context(key);
    });
    setImageData(obj);
  }, []);

  const handleSearch = (searchName) => {
    if (searchName !== '') {
      const filteredClients = (client || []).filter((client) =>
        client.name.toLowerCase().includes(searchName.toLowerCase())
      );
      setClient(filteredClients);
    } else {
      setClient((clientData || {})['content-items']?.content);
    }
  };

  return (
    <>
      <div className='bg-black'>
        <Header handleSearch={handleSearch} />
        <ClientList
          client={client}
          fetchNextUsers={fetchNextUsers}
          hasMore={hasMore}
          imageData={imageData}
        />
      </div>
    </>
  );
};

export default App;
