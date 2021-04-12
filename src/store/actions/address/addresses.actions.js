import * as actions from '../../types';
import https from '../../../helpers/https';


// fetch Provinces
export const handleFetchProvinces = () => (dispatch) => {
    console.log("fetch province")
  dispatch({
    type: actions.HANDLE_FETCH_PROVINCES,
  });
  return https.get(`/addresses/provinces`,{ headers: {'Authorization' : `Basic ${localStorage.token}` } }).then((res) => {
    dispatch({
      type: actions.HANDLE_FETCH_PROVINCES_SUCCESS,
      payload: res.data,
    })
  }).catch( (error) => {
    dispatch({
      type: actions.HANDLE_FETCH_PROVINCES_FAIL,
      payload: error,
    });
  })
}

//fetch districts
export const handleFetchDistricts = (province) => (dispatch) => {
  console.log("fetch districts of province" , province)
dispatch({
  type: actions.HANDLE_FETCH_DISTRICTS,
});
return https.get(`/addresses/districts/${province}`,{ headers: {'Authorization' : `Basic ${localStorage.token}` } }).then((res) => {
  dispatch({
    type: actions.HANDLE_FETCH_DISTRICTS_SUCCESS,
    payload: res.data,
  })
}).catch( (error) => {
  dispatch({
    type: actions.HANDLE_FETCH_DISTRICTS_FAIL,
    payload: error,
  });
})
}


//fetch villages
export const handleFetchVillages = () => (dispatch) => {
  dispatch({
    type: actions.HANDLE_FETCH_VILLAGES,
  });
  return https.get(`/addresses/villages`,{ headers: {'Authorization' : `Basic ${localStorage.token}` } }).then((res) => {
    dispatch({
      type: actions.HANDLE_FETCH_VILLAGES_SUCCESS,
      payload: res.data,
    })
  }).catch( (error) => {
    dispatch({
      type: actions.HANDLE_FETCH_VILLAGES_FAIL,
      payload: error,
    });
  })
}