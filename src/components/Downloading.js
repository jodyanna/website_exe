import React from "react";
import styles from "../styles/modules/Downloading.module.css";

import frame1 from "../img/anim/download/download_1.png";
import frame2 from "../img/anim/download/download_2.png";
import frame3 from "../img/anim/download/download_3.png";
import frame4 from "../img/anim/download/download_4.png";
import frame5 from "../img/anim/download/download_5.png";


class Downloading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      status: "Downloading",
      frame: frame1
    }
    this.filename = "SUGOI_virus-kun.exe";
    this.source = "skynet.net.you_lose";
    this.destination = "C://Users/win32/bin/private/cpu"
    this.aniGen = this.animate();
  }

  componentDidMount() {
    this.timer = setInterval(this.incrementProgress, 300);
  }

  incrementProgress = () => {
    let currentProgress = this.state.progress + 1;
    if (currentProgress === 100) {
      clearInterval(this.timer)
      this.setState({progress: currentProgress, status: "Completed", frame: this.aniGen.next().value});
    } else {
      this.setState({progress: currentProgress, status: "Downloading", frame: this.aniGen.next().value});
    }
  }

  *animate() {
    while (true) {
      yield frame1;
      yield frame2;
      yield frame3;
      yield frame4;
      yield frame5;
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <Toolbar progress={this.state.progress} filename={this.filename} status={this.state.status}/>
        <AniFrame frame={this.state.frame}/>
        <Overview filename={this.filename} source={this.source}/>
        <ProgressBar progress={this.state.progress}/>
        <Status progress={this.state.progress} destination={this.destination} fileSize={"677 KB"}/>
      </div>
    )
  }
}


function Toolbar(props) {
  return (
    <div className={styles.toolbar}>
      <span>{props.progress}% of {props.filename} {props.status}</span>
      <div className={styles.buttonContainer}>
        <WindowButton label={"_"}/>
        <WindowButton label={"square"}/>
        <WindowButton label={"X"}/>
      </div>
    </div>
  )
}


function WindowButton(props) {
  const determineLabel = () => {
    if (props.label.localeCompare("_") === 0) return styles.buttonMini
    else if (props.label.localeCompare("X") === 0) return  styles.buttonClose
    else return styles.buttonMax
  }
  return <button type={"button"} className={determineLabel()}/>
}


function AniFrame(props) {
  return (
    <div className={styles.animation}>
      <img src={props.frame} alt="downloading.png" className={styles.aniFrame}/>
    </div>
  )
}


function Overview(props) {
  return (
    <div>
      <span>Saving:</span><br/>
      <span>{props.filename} from {props.source}</span>
    </div>
  )
}


class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parts: [],
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.progress % 4 === 0) {
      this.setState({parts: [...prevState.parts, <div className={styles.barPart} />]})
    }
  }

  render() {
    return (
      <div className={styles.progressBar}>
        {this.state.parts}
      </div>
    )
  }
}


class Status extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: "Calculating...",
      downloaded: "0 KB",
      rate: ""
    };
    this.transferRates = [
      ""
    ];
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  render() {
    return (
      <div>
        <span>Estimated time left:   {this.state.countdown} ({this.state.downloaded} of {this.props.fileSize})</span><br/>
        <span>Download to: {this.props.destination}</span><br/>
        <span>Transfer rate: {this.state.rate} KB/Sec</span>
      </div>
    )
  }
}


function Button(props) {
  return (
    <button disabled/>
  )
}


export default Downloading;