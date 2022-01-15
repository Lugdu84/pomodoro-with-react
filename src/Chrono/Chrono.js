import React, {useState, useEffect, useReducer} from 'react'
import "./Chrono.css"
import PauseImg from "../Images/pause.svg"
import PlayImg from "../Images/play.svg"
import ResetImg from "../Images/reset.svg"

export default function Chrono() {

  const [sessionTime, setSessionTime] = useState(1500)
  const [sessionTimeFixed, setSessionTimeFixed] = useState(1500)
  const [breakTime, setBreakTime] = useState(300)
  const [breakTimeFixed, setBreakTimeFixed] = useState(300)
  const [workingChrono, setWorkingChrono] = useState(false)
  const [state, dispatch] = useReducer(reducer)

  function reducer(state, action){
    switch (action.type) {
      case 'TICK':
        if (sessionTime >= 0) {
          setSessionTime(sessionTime - 1)
        } else if (breakTime >= 1) {
          setBreakTime(breakTime - 1)
        } else if (breakTime <= 0 && sessionTime <= 0) {
          setSessionTime(sessionTimeFixed)
          setBreakTime(breakTimeFixed)
        }
        break;

      default:
        break;
    }
  }

  const playPause = () => {
    setWorkingChrono(!workingChrono)
  }

  useEffect(() => {
    let timer;

    if (workingChrono) {
      timer = setInterval(() => {
        dispatch({type: 'TICK'})
      }, 1000)
    }
    return () => {
      clearInterval(timer)
    }
  }, [workingChrono])


  const handleSession = e => {
    const el = e.target;
    if (el.classList.contains('minus')){
      if (sessionTime / 60 > 1) {
        setSessionTime(sessionTime - 60)
        setSessionTimeFixed(sessionTimeFixed - 60)
      }
    } else if (el.classList.contains('plus')) {
      setSessionTime(sessionTime + 60);
      setSessionTimeFixed(sessionTimeFixed + 60);
    }
  }

  const handleBreak = e => {
    const el = e.target;

    if (el.classList.contains('minus')) {
      if (breakTime / 60 > 1) {
        setBreakTime(breakTime - 60)
        setBreakTimeFixed(breakTimeFixed - 60)
      }
    } else if (el.classList.contains("plus")) {
      setBreakTime(breakTime + 60);
      setBreakTimeFixed(breakTimeFixed + 60);
    }
  }

  return (
    <div className="container-chrono">
      <div className="container-config">
        <div className="box-btns session">
          <button onClick={handleSession} className="minus">
            -
          </button>
          <span>{sessionTimeFixed / 60}</span>
          <button onClick={handleSession} className="plus">
            +
          </button>
        </div>
        <div className="box-btns break">
          <button onClick={handleBreak} className="minus">
            -
          </button>
          <span>{breakTimeFixed / 60}</span>
          <button onClick={handleBreak} className="plus">
            +
          </button>
        </div>
      </div>
      <h1>
        {sessionTime >= 0 ? (
          <span>
            {`${Math.trunc(sessionTime / 60)} : ${
              sessionTime % 60 < 10 ? `0${sessionTime % 60}` : sessionTime % 60
            }`}
          </span>
        ) : (
          <span>
            {`${Math.trunc(sessionTime / 60)} : ${
              breakTime % 60 < 10 ? `0${breakTime % 60}` : breakTime % 60
            }`}
          </span>
        )}
      </h1>
      <div className="container-controllers">
        <button onClick={playPause}>
          <img src={workingChrono ? PauseImg : PlayImg} alt="" />
        </button>
        <button>
          <img src={ResetImg} alt="" />
        </button>
      </div>
    </div>
  );
}
