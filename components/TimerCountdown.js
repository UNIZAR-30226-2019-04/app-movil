import React, { Component } from "react";
import { View, Text } from "react-native";
import moment from "moment";

class TimerCountdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //timer: props.initialTime,
      time: "",
      msg: ""
    };
  }

  timeLeft = () => {
    var a = moment(this.state.time);
    //console.log("-- Moment: ", this.state.time, a);

    var b = moment([]);
    var c = Math.abs(a.diff(b));
    let dd = moment.duration(c).as("days");
    dd = Number(dd.toFixed(0));
    let hh = moment.duration(c).as("hours") % 24;
    hh = Number(hh.toFixed(0));
    let mm = moment.duration(c).as("minutes") % 60;
    mm = Number(mm.toFixed(0));
    let ss = moment.duration(c).as("seconds") % 60;
    ss = Number(ss.toFixed(0));
    let msg2 = dd + " dias  " + hh + " h " + mm + "m " + ss + "s ";
    this.setState({ msg: msg2 });
    //this.msg = msg2;
  };

  componentDidMount() {
    let time = this.props.fechaexpiracion;
    list = time.split(" ");
    let date = list[0].split("/");
    //let date = date.replace(",", "");
    date = date[2].replace(",", "") + "-" + date[1] + "-" + date[0];

    time = date + " " + list[1];
    this.setState({ time });
    //console.log("-- Interval: ", time);
    this.interval = setInterval(() => this.timeLeft(), 1000);
  }
  longToDate = millisec => {
    //var length = millisec.length - 7;
    //var date = parseInt(millisec.substring(6, length));
    return new Date(millisec).toUTCString();
  };
  /*   componentDidUpdate() {
    if (this.state.timer === 1) {
      //console.log("-------------------timer count down is leaking");
      clearInterval(this.interval);
      //this.props.onTimerElapsed();
    }
  } */

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
        <Text
          style={{
            paddingRight: 60,
            paddingLeft: 10,

            color: "grey",
            marginVertical: 10
          }}
        >
          {this.state.msg}
        </Text>
      </View>
    );
  }
}

export default TimerCountdown;
