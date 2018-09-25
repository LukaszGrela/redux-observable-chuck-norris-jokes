import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchJokes, cancelFetchingJokes } from '../store/actions/jokes-action';
import SVGIcon from './SVGIcons';
import './JokeController.css';

export class JokeController extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPolling: props.isPolling || false,
    };
  }
  clickHandler = event => {
    this.setState(
      prevState => ({
        isPolling: !prevState.isPolling,
      }),
      () => {
        const { fetchJokes, cancelFetchingJokes } = this.props;
        if (!this.state.isPolling) {
          // previously was polling - stop
          cancelFetchingJokes();
        } else {
          // previously was not polling - start
          fetchJokes();
        }
      }
    );
  };
  render = () => {
    const { isPolling } = this.state;
    return (
      <div className="JokeController">
        {isPolling ? (
          <button
            type="button"
            onClick={this.clickHandler}
            className="JokeController__button-stop">
            <SVGIcon type="pause" />
          </button>
        ) : (
          <button
            type="button"
            onClick={this.clickHandler}
            className="JokeController__button-start">
            <SVGIcon type="play" />
          </button>
        )}
      </div>
    );
  };
}

JokeController.propTypes = {
  fetchJokes: PropTypes.func.isRequired,
  cancelFetchingJokes: PropTypes.func.isRequired,
  isPolling: PropTypes.bool,
};

const mapStateToProps = ({ orders }) => ({ ...orders });
const mapDispatchToProps = dispatch => ({
  fetchJokes: () => dispatch(fetchJokes()),
  cancelFetchingJokes: () => dispatch(cancelFetchingJokes()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JokeController);
