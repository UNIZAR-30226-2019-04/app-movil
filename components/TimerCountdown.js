import React, { Component } from "react";
import { View, Text } from "react-native";

class TimerCountdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: new Date(props.initialTime).getSeconds()
    };
  }

  componentDidMount() {
    var now = new Date();
    var date2 = new Date(this.props.initialTime).getTime();

    console.log(
      "Interval: ",
      this.state.timer,
      this.props.initialTime,
      date2,
      now,
      date2 - now
    );
    this.interval = setInterval(
      () => this.setState(prevState => ({ timer: prevState.timer - 1 })),
      1000
    );
  }

  componentDidUpdate() {
    if (this.state.timer === 1) {
      console.log("-------------------timer count down is leaking");
      clearInterval(this.interval);
      //this.props.onTimerElapsed();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    //this.props.onTimerElapsed();
  }

  render() {
    return <Text> {this.state.timer} </Text>;
  }
}

export default TimerCountdown;
