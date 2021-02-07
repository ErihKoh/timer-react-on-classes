import { Component } from 'react';

class Timer extends Component {
  state = {
    time: 0,
    isOn: false,
    start: 0,
    count: 1,
  };

  startTimer = () => {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time,
    });
    this.timer = setInterval(
      () =>
        this.setState({
          time: Date.now() - this.state.start,
        }),
      1,
    );
  };
  stopTimer = () => {
    this.setState({ isOn: false });
    clearInterval(this.timer);
  };
  resetTimer = () => {
    this.setState({ time: 0, isOn: false });
  };

  getTimeComponents = time => {
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { hours, mins, secs };
  };

  pad = value => {
    return String(value).padStart(2, '0');
  };

  dbClick = () => {
    this.setState(() => ({ count: this.state.count + 1 }));
    const timeForClick = setTimeout(() => {
      this.setState({ count: 1 });
    }, 300);
    if (this.state.count === 2) {
      this.stopTimer();
      clearTimeout(timeForClick);
    }
  };

  render() {
    const { time, isOn } = this.state;
    const { hours, mins, secs } = this.getTimeComponents(time);

    return (
      <div>
        <h3>
          {hours} : {mins} : {secs}
        </h3>
        {time === 0 && <button onClick={this.startTimer}>start</button>}
        {time === 0 || isOn ? null : (
          <button onClick={this.startTimer}>resume</button>
        )}
        {time === 0 || !isOn ? null : (
          <button onClick={this.dbClick}>stop</button>
        )}
        {time === 0 || isOn ? null : (
          <button onClick={this.resetTimer}>reset</button>
        )}
      </div>
    );
  }
}

export default Timer;
