import {
  FETCH_JOKES,
  FETCH_JOKES_CANCELLED,
  jokesReceived,
  jokesFetchFailed,
} from '../actions/jokes-action';
import {
  map,
  catchError,
  exhaustMap,
  takeUntil,
  switchMap,
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { timer, of } from 'rxjs';
import { ofType } from 'redux-observable';
import { ENDPOINT, POLL_INTERVAL } from '../../constants';

const pollFetchJokesEpic = action$ =>
  action$.pipe(
    ofType(FETCH_JOKES),
    switchMap(() =>
      timer(0, POLL_INTERVAL).pipe(
        takeUntil(action$.ofType(FETCH_JOKES_CANCELLED)),
        exhaustMap(() =>
          ajax.getJSON(ENDPOINT).pipe(
            // 1. See below
            map(res => jokesReceived(res)),
            catchError(error => of(jokesFetchFailed(error)))
          )
        )
      )
    )
  );

export default pollFetchJokesEpic;
