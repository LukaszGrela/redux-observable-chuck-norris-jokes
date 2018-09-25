import { combineEpics } from 'redux-observable';
import fetchJokesEpic from './fetchJokesEpic';
import pollJokes from './pollJokesEpic';

const epics = combineEpics(fetchJokesEpic, pollJokes);

export default epics;
