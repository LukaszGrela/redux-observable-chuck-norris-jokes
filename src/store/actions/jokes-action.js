export const FETCH_JOKES = 'FETCH_JOKES';
export const JOKES_RECEIVED = 'JOKES_RECEIVED';
export const FETCH_JOKES_CANCELLED = 'FETCH_JOKES_CANCELLED';
export const FETCH_JOKES_ERROR = 'FETCH_JOKES_ERROR';
// start fetch orders polling
export const fetchJokes = (length = 0) => ({
  type: FETCH_JOKES,
  length,
});

export const jokesReceived = (payload, success = true) => ({
  type: JOKES_RECEIVED,
  success,
  payload,
});

export const cancelFetchingJokes = () => ({
  type: FETCH_JOKES_CANCELLED,
});

export const jokesFetchFailed = error => ({
  type: FETCH_JOKES_ERROR,
  error,
});
