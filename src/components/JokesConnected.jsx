import React, { forwardRef, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./JokesConnected.css";
import "./joke-animation.css";
import { UPDATE_TIMER_INTERVAL, POLL_INTERVAL } from "../constants";

/**
{
    "categories": [
        "explicit"
    ],
    "created_at": "2020-01-05 13:42:30.177068",
    "icon_url": "https://api.chucknorris.io/img/avatar/chuck-norris.png",
    "id": "9HfAFHoJQXGwWpKuFwv4yQ",
    "updated_at": "2020-01-05 13:42:30.177068",
    "url": "https://api.chucknorris.io/jokes/9HfAFHoJQXGwWpKuFwv4yQ",
    "value": "Ever notice just how much Chuck Norris' asshole and your face resemble each other?"
}
 */
const Joke = forwardRef(({ joke }, ref) => {
  const [progress, setProgress] = useState(0);
  const tickerIdRef = useRef(-1);
  const progressStep = 100 / (POLL_INTERVAL / UPDATE_TIMER_INTERVAL);

  useEffect(() => {
    tickerIdRef.current = setInterval(() => {
      setProgress((prevProgress) => Math.min(prevProgress + progressStep, 100));
    }, UPDATE_TIMER_INTERVAL);

    return () => {
      if (tickerIdRef.current > -1) {
        clearInterval(tickerIdRef.current);
      }
    };
  }, [progressStep]);

  return (
    <blockquote className="Joke" ref={ref}>
      <span className="Joke__text">{joke.value}</span>
      <div className="Joke__timeout">
        <span className="Joke__bar" style={{ width: `${progress}%` }} />
      </div>
    </blockquote>
  );
});

const JokesList = ({ jokes }) => {
  const nodeRef = useRef(null);
  return (
    <TransitionGroup className="JokesList__list">
      {jokes.map((joke) => {
        console.log("joke", joke);
        return (
          <CSSTransition
            timeout={{ enter: 600, exit: 600 }}
            key={`transition-${joke.id}`}
            classNames="joke-animation"
            nodeRef={nodeRef}
          >
            <Joke key={joke.id} joke={joke} ref={nodeRef} />
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

const mapStateToProps = (state) => ({
  jokes: state.jokes.list,
});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(JokesList);
