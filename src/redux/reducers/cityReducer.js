import {
  FETCH_CITIES,
  FETCH_CITIES_SUCCESS,
  SET_CITIES_ERROR,
} from "../actions/cityActions.js";

let initialState = {
  selected: [],
  viewport: {
    width: "100%",
    height: "100%",
    longitude: -96.7,
    latitude: 38.55,
    zoom: 3.55,
    minZoom: 3.5,
    maxZoom: 10,
    trackResize: true,
  },
};

export default function cityReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
