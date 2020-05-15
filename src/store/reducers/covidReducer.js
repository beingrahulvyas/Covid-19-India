import * as actionTypes from '../actionTypes';

const initialState = {
  resources: null,
  indiaCases: {
    cases_time_series: null,
    statewise: null,
  },
  worldCases: null,
  state_district_wise: null,
  zones: null,
};

const covidReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_RESOURCES:
      return {
        ...state,
        resources: action.payload,
      };
    case actionTypes.FETCH_INDIA_CASES:
      const {cases_time_series, statewise} = action.payload;
      return {
        ...state,
        indiaCases: {
          cases_time_series,
          statewise,
        },
      };
    case actionTypes.FETCH_WORLD_CASES:
      return {
        ...state,
        worldCases: action.payload,
      };
    case actionTypes.FETCH_STATE_DISTRICT_WISE_CASES:
      return {
        ...state,
        state_district_wise: action.payload,
      };
    case actionTypes.FETCH_STATE_DISTRICT_WISE_ZONES:
      return {
        ...state,
        zones: action.payload,
      };
    default:
      return state;
  }
};

export default covidReducer;
