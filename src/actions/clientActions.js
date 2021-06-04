import { clientConstant } from '../constant/clientConstant';
import Client1 from '../API/CONTENTLISTINGPAGE-PAGE1.json';
import Client2 from '../API/CONTENTLISTINGPAGE-PAGE2.json';
import Client3 from '../API/CONTENTLISTINGPAGE-PAGE3.json';

export const listClient = (pageNumber) => async (dispatch) => {
  try {
    dispatch({
      type: clientConstant.CLIENT_LIST_REQUEST,
    });
    let client;
    if (pageNumber === 1) {
      client = Client1;
    } else if (pageNumber === 2) {
      client = Client2;
    } else if (pageNumber === 3) {
      client = Client3;
    } else {
      client = '';
    }

    if (client !== '') {
      dispatch({
        type: clientConstant.CLIENT_LIST_SUCCESS,
        payload: client.page,
      });
    } else {
      dispatch({
        type: clientConstant.CLIENT_LIST_FAIL,
      });
    }
  } catch (error) {
    dispatch({
      type: clientConstant.CLIENT_LIST_FAIL,
    });
  }
};
