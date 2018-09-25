import {
  map,
  catchError,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import {
  FETCH_JOKES,
  jokesReceived,
  FETCH_JOKES_CANCELLED,
  jokesFetchFailed,
} from '../actions/jokes-action';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';

const getJokes = () =>
  ajax.getJSON('http://api.icndb.com/jokes/random?escape=javascript');

const fetchJokesEpic = action$ => {
  return action$.pipe(
    ofType(FETCH_JOKES),
    switchMap(() =>
      getJokes().pipe(
        map(response => jokesReceived(response)),
        catchError((err, act) => of(jokesFetchFailed(err))),
        takeUntil(action$.pipe(ofType(FETCH_JOKES_CANCELLED)))
      )
    ),
  );
};

export default fetchJokesEpic;
