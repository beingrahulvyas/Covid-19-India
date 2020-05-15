import * as actionTypes from '../actionTypes';

export const fetchIndiaData = () => {
  return dispatch => {
    fetch('https://api.covid19india.org/data.json')
      .then(response => response.json())
      .then(value => {
        return dispatch({
          type: actionTypes.FETCH_INDIA_CASES,
          payload: {
            cases_time_series: value.cases_time_series,
            statewise: value.statewise,
          },
        });
      });
  };
};

export const fetchWorldData = () => {
  return dispatch => {
    fetch('https://api.covid19api.com/summary')
      .then(response => {
        return response.json();
      })
      .then(value => {
        return dispatch({type: actionTypes.FETCH_WORLD_CASES, payload: value});
      });
  };
};

export const fetchStateData = () => {
  return dispatch => {
    fetch('https://api.covid19india.org/v2/state_district_wise.json')
      .then(response => {
        return response.json();
      })
      .then(value => {
        return fetch('https://api.covid19india.org/zones.json')
          .then(response => {
            return response.json();
          })
          .then(zones => {
            dispatch({
              type: actionTypes.FETCH_STATE_DISTRICT_WISE_CASES,
              payload: value,
            });
            dispatch({
              type: actionTypes.FETCH_STATE_DISTRICT_WISE_ZONES,
              payload: zones.zones,
            });
          });
      });
  };
};

export const fetchResources = () => {
  return dispatch => {
    fetch('https://api.covid19india.org/resources/resources.json')
      .then(response => {
        return response.json();
      })
      .then(value => {
        return dispatch({
          type: actionTypes.FETCH_RESOURCES,
          payload: value.resources,
        });
      });
  };
};
