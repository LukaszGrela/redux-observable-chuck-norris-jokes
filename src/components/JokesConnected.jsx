import React from 'react';
import { connect } from 'react-redux';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './JokesConnected.css';
import './joke-animation.css';
import { UPDATE_TIMER_INTERVAL, POLL_INTERVAL } from '../constants';

class Joke extends React.Component {
  tickerId = -1;
  progressStep = 0;
  state = {
    progress: 0,
  };
  componentDidMount() {
    this.progressStep = 100 / (POLL_INTERVAL / UPDATE_TIMER_INTERVAL);
    this.tickerId = setInterval(this.updateTimer, UPDATE_TIMER_INTERVAL);
  }

  componentWillUnmount() {
    if (this.tickerId > -1) {
      clearInterval(this.tickerId);
    }
  }
  getNewProgress = prevProgress => {
    return prevProgress + this.progressStep;
  };
  updateTimer = () => {
    this.setState(prevState => ({
      progress: Math.min(this.getNewProgress(prevState.progress), 100),
    }));
  };

  render = () => {
    const { joke } = this.props;
    return (
      <blockquote className="Joke">
        <span className="Joke__text">{joke}</span>
        <div className="Joke__timeout">
          <span
            className="Joke__bar"
            style={{ width: `${this.state.progress}%` }}
          />
        </div>
      </blockquote>
    );
  };
}

const JokesList = ({ jokes }) => (
  <TransitionGroup className="JokesList__list">
    {jokes.map(joke => (
      <CSSTransition
        timeout={{ enter: 600, exit: 600 }}
        key={`transition-${joke.id}`}
        classNames="joke-animation">
        <Joke key={joke.id} {...joke} />
      </CSSTransition>
    ))}
  </TransitionGroup>
);

const mapStateToProps = state => ({
  jokes: state.jokes.list,
});
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JokesList);
