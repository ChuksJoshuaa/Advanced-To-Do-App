import {
  START_LOADING,
  END_LOADING,
  FETCH_TASK,
  CREATE,
  UPDATE,
  DELETE,
  SEARCH,
} from "../contants/actionTypes";

export default (state = { isLoading: true, tasks: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_TASK:
      return {
        ...state,
        tasks: action.payload.data,
      };
    case CREATE:
      return { ...state, tasks: [action.payload] };
    case SEARCH:
      return { ...state, tasks: action.payload };
    case UPDATE:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case DELETE:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    default:
      return state;
  }
};
