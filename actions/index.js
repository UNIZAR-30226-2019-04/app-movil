import { ADD_TAG, DELETE_TAG } from "./actionTypes";

let nextId = 0;
export const addTag = (name, ctype) => {
  console.log("Action", name, ctype);

  return {
    type: ADD_TAG,
    id: nextId++,
    name,
    ctype
  };
};

export const deleteTag = name => ({
  type: DELETE_TAG,
  name
});
