import React, { Component } from "react";
import { View, Text } from "react-native";
import * as moment from "moment";

class TimerCountdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: props.initialTime
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
  longToDate = millisec => {
    //var length = millisec.length - 7;
    //var date = parseInt(millisec.substring(6, length));
    return new Date(millisec).toUTCString();
  };
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
    //var day = moment.unix(this.state.timer).utc();

    var fecha = "";
    //`${dias}d  ${h}h ${m}m ${s}s`;

    return (
      <View>
        <Text>{fecha}</Text>
        <Text>{this.state.timer}</Text>
      </View>
    );
  }
}

export default TimerCountdown;
