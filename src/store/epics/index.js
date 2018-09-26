import { combineEpics } from 'redux-observable';
import pollFetchJokesEpic from './pollFetchJokesEpic';

const epics = combineEpics(pollFetchJokesEpic);

export default epics;
