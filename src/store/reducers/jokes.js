import { JOKES_RECEIVED, FETCH_JOKES_ERROR } from '../actions/jokes-action';

/**
 * Returns list of jokes to add taht are nto present in current list
 * @param {array} currentList previous list of jokes
 * @param {object|array} jokes joke object or list of joke objects to add
 */
const addNewJoke = (currentList, jokes) => {
  if (!(jokes instanceof Array)) {
    jokes = [jokes];
  }
  return jokes.filter(joke => !currentList.find(({ id }) => id === joke.id));
};

const DEFAULT = {
  loading: false,
  error: null,
  list: [],
};

const jokesReducer = (state = DEFAULT, action) => {
  switch (action.type) {
    case JOKES_RECEIVED: {
      const { success, payload } = action;
      if (success && payload.type === 'success')
        return {
          loading: false,
          error: null,
          list: [/*...state.list,*/ ...addNewJoke(state.list, payload.value)].slice(-10),
        };

      return { ...state, loading: false, error: payload };
    }
    case FETCH_JOKES_ERROR:
      return { ...state, loading: false, error: action.error };
    default:
      return { ...state };
  }
};

export default jokesReducer;
