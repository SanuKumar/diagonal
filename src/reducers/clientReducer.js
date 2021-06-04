import { clientConstant } from '../constant/clientConstant';

export const clientListReducer = (state = { clientData: [] }, action) => {
  switch (action.type) {
    case clientConstant.CLIENT_LIST_REQUEST:
      return { loding: true };
    case clientConstant.CLIENT_LIST_SUCCESS:
      return { loading: false, clientData: action.payload };
    case clientConstant.CLIENT_LIST_FAIL:
      return { loading: false, error: 'Client Not Found' };
    default:
      return state;
  }
};
