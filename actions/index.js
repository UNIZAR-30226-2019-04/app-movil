import * as actionTypes from "./actionTypes";
import * as api from "../config.js";

export const getPoints = mapId => dispatch => {
  dispatch({ type: actionTypes.GET_POINTS });
  return fetch(api.API_BASE + "/map/" + mapId + "/points")
    .then(response => response.json())
    .then(data => {
      dispatch({
        type: actionTypes.INIT_POINTS,
        mapId: mapId,
        payload: {
          type: "POINTS",
          data: data
        }
      });
    })
    .catch(err => dispatch({ type: "ERROR_GETTING_POINTS" }));
};

export const getLines = mapId => dispatch => {
  dispatch({ type: actionTypes.GET_LINES });
  return fetch(api.API_BASE + "/map/" + mapId + "/lines")
    .then(response => response.json())
    .then(data =>
      dispatch({
        type: actionTypes.INIT_LINES,
        mapId: mapId,
        payload: {
          type: "LINES",
          data: data
        }
      })
    )
    .catch(err => dispatch({ type: "ERROR_GETTING_LINES" }));
};

export const getPolygons = mapId => dispatch => {
  dispatch({ type: "GETTING_POLYGONS" });
  return fetch(api.API_BASE + "/map/" + mapId + "/polygons")
    .then(response => response.json())
    .then(data =>
      dispatch({
        type: actionTypes.INIT_POLYGONS,
        mapId: mapId,
        payload: {
          type: "POLYGONS",
          data: data
        }
      })
    )
    .catch(err => dispatch({ type: "ERROR_GETTING_POLYGONS" }));
};

export const getPanels = mapId => dispatch => {
  dispatch({ type: actionTypes.GET_PANELS });
  return fetch(api.API_BASE + "/map/" + mapId + "/panels")
    .then(response => response.json())
    .then(data =>
      dispatch({
        type: actionTypes.INIT_PANELS,
        mapId: mapId,
        payload: {
          type: "PANELS",
          data: data
        }
      })
    )
    .catch(err => dispatch({ type: "ERROR_GETTING_POLYGONS" }));
};

export const getPMs = mapId => dispatch => {
  dispatch({ type: actionTypes.GET_PANELS });
  return fetch(api.API_BASE + "/map/" + mapId + "/pms")
    .then(response => response.json())
    .then(data =>
      dispatch({
        type: actionTypes.INIT_PMS,
        mapId: mapId,
        payload: {
          type: "PMS",
          data: data
        }
      })
    )
    .catch(err => dispatch({ type: "ERROR_GETTING_PMS" }));
};

export const getMapLayers = mapId => dispatch => {
  dispatch({ type: actionTypes.GET_LAYERS });
  dispatch(getPolygons(mapId));
  dispatch(getLines(mapId));
  dispatch(getPoints(mapId));
  dispatch(getPanels(mapId));
  dispatch(getPMs(mapId));
};

export const getInitialViewState = mapId => dispatch => {
  dispatch({ type: "GETTING_VIEWSTATE" });
  return fetch(api.API_BASE + "/viewstate/" + mapId)
    .then(response => response.json())
    .then(data =>
      dispatch({
        type: actionTypes.SET_INITIAL_VIEWSTATE,
        mapId: mapId,
        payload: data
      })
    );
};

export const updateViewState = (mapId, viewState) => {
  return {
    type: actionTypes.UPDATE_VIEWSTATE,
    mapId: mapId,
    payload: viewState
  };
};
export const deleteMap = mapId => {
  return {
    type: actionTypes.DELETE_MAP,
    mapId: mapId
  };
};

export const initDevices = id => dispatch => {
  dispatch({ type: "GETTING DEVICES" });
  return fetch(api.API_BASE + "/devices/")
    .then(response => response.json())
    .then(data =>
      dispatch({ type: actionTypes.UPDATE_DEVICES, payload: data })
    );
};

export const updatePanels = () => dispatch => {
  dispatch({ type: "UPDATING PANELS" });
  return fetch(api.API_BASE + "/panels")
    .then(response => response.json())
    .then(data => {
      dispatch({ type: actionTypes.UPDATE_PANELS, payload: data });
    });
};

export const updatePMs = () => dispatch => {
  dispatch({ type: "UPDATING PMS" });
  return fetch(api.API_BASE + "/pms")
    .then(response => response.json())
    .then(data => {
      dispatch({ type: actionTypes.UPDATE_PMS, payload: data });
    });
};

export const hooverItem = item => ({
  type: actionTypes.HOOVER_ITEM,
  payload: item
});
