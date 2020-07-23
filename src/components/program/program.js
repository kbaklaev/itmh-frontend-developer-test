import React from "react";
import { Container, Row, Col, ProgressBar } from "react-bootstrap";

const URL = "http://192.168.0.7:3001";

const Program = ({ programs }) => {
  const getProgress = (startTime, endTime) => {
    const now = new Date().getTime();
    const duration =
      new Date(endTime).getTime() - new Date(startTime).getTime();
    return (now - new Date(startTime).getTime()) / duration * 100;
  };

  return (
    <Container className="mb-4">
      {programs.map((program) => (
        <Row key={program.id}>
          <Col>
            <img src={URL + program.icon} alt="" />
          </Col>
          <Col lg={6} className="mt-2">
            {program.name}
            <br />
            {new Date(program.program.current.startTime)
              .toTimeString()
              .substring(0, 5)}
            &nbsp;
            {program.program.current.name}
            <br />
            <ProgressBar
              now={getProgress(
                program.program.current.startTime,
                program.program.current.endTime
              )}
            />
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default Program;
