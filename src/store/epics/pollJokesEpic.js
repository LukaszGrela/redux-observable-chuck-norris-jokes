import { ofType } from 'redux-observable';
import {
  delay,
  map,
  takeUntil,
  repeat,
} from 'rxjs/operators';
import {
  JOKES_RECEIVED,
  FETCH_JOKES_CANCELLED,
  FETCH_JOKES_ERROR,
  fetchJokes,
} from '../actions/jokes-action';
import { POLL_INTERVAL } from '../../constants';

const pollJokes = (action$, state$) => {
  return action$.pipe(
    ofType(JOKES_RECEIVED, FETCH_JOKES_ERROR),
    delay(POLL_INTERVAL),
    map(action => {
      console.log('pollJokes.map', action);
      return fetchJokes();
    }),
    takeUntil(action$.pipe(ofType(FETCH_JOKES_CANCELLED))),
    repeat()
  );
};
export default pollJokes;
