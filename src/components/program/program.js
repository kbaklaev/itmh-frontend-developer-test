import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ProgressBar } from "react-bootstrap";
import Loader from "../loader/loader";

import './program.css'

const URL = "http://192.168.0.7:3001";

const Program = ({ program }) => {
  const [currentProgram, setCurrentProgram] = useState({});
  const [currentPosition, setCurrentPosition] = useState(0);

  const fetch = useCallback(async () => {
    await axios
      .get(`${URL}/channel/${program.id}/program`)
      .then((data) => setCurrentProgram(data.data.current))
      .catch((err) => {
        console.log(err);
      });
  }, [program.id]);

  useEffect(() => {
    !program.id
      ? fetch()
      : setTimeout(() => {
          new Date().getTime() <
          new Date(currentProgram.endTime).getTime() + 1000
            ? setCurrentPosition(new Date().getTime())
            : fetch();
        }, 500);
  }, [currentPosition, currentProgram.endTime, fetch, program.id]);

  return currentPosition ? (
    <div className="flex justify-center">
      <div className="m-2 w-4/5">
        <div
          key={program.id}
          className="flex w-full"
        >
          <div className="w-1/4 flex">
            <img
              className="inline-flex m-auto"
              src={URL + program.icon}
              alt={program.id}
            />
          </div>
          <div className="w-3/4 m-2">
            <h6 className="mb-2 font-weight-bold">{program.name}</h6>
            {new Date(currentProgram.startTime).toTimeString().substring(0, 5)}
            &nbsp;
            {currentProgram.name}
            <br />
            <div className="progress-bar mt-2">
              <ProgressBar
                min={new Date(currentProgram.startTime).getTime()}
                max={new Date(currentProgram.endTime).getTime()}
                now={currentPosition}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="loader__container">
      <div className="loader__position">
        <Loader />
      </div>
    </div>
  );
};

export default Program;
