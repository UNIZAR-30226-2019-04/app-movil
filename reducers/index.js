import { combineReducers } from "redux";
import tags from "./tags";
import visibilityFilter from "./visibilityFilter";

export default combineReducers({
  tags,
  visibilityFilter
});
