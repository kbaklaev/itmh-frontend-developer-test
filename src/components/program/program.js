import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Container, Row, Col, ProgressBar } from "react-bootstrap";

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
    fetch();
  }, [fetch, program.id]);

  useEffect(() => {
    setTimeout(() => {
      new Date().getTime() < new Date(currentProgram.endTime).getTime() + 500
        ? setCurrentPosition(new Date().getTime())
        : fetch();
    }, 500);
  }, [currentPosition, currentProgram.endTime, fetch]);

  return (
    <Container className="mb-4">
      <Row key={program.id}>
        <Col sm={4}>
          <img src={URL + program.icon} alt={program.id} />
        </Col>
        <Col sm={8} className="mt-2">
          <h6 className="font-weight-bold">{program.name}</h6>
          {new Date(currentProgram.startTime).toTimeString().substring(0, 5)}
          &nbsp;
          {currentProgram.name}
          <br />
          <ProgressBar
            min={new Date(currentProgram.startTime).getTime()}
            max={new Date(currentProgram.endTime).getTime()}
            now={currentPosition}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Program;
