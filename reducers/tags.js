let nextId = 0;
const tags = (state = [], action) => {
  //console.log("TAG REDUCER", action);

  switch (action.type) {
    case "ADD_TAG":
      const duplicate = state.filter(tag => {
        //console.log(tag);
        return tag.ctype === action.ctype;
      });

      //console.log("duplicate", duplicate, state);

      const new_state = state.filter(tag => tag.ctype !== action.ctype);

      return [
        ...new_state,
        {
          id: nextId++,
          name: action.name,
          ctype: action.ctype
        }
      ];

    case "DELETE_TAG":
      return state.filter(tag => tag.name !== action.name);

    default:
      return state;
  }
};

export default tags;
