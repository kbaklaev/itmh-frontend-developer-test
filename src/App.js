import React, { useState, useEffect } from "react";
import axios from "axios";

// import Selector from './components/selector/selector'
import Program from "./components/program/program";
import PureSelector from "./components/selector/pureSelector";
import Loader from "./components/loader/loader";

const groupUrl = "http://192.168.0.7:3001/group/";

const App = () => {
  const [groups, setGroups] = useState([]);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(groupUrl)
        .then((data) => setGroups(data.data))
        .catch((err) => {
          throw err;
        });
    };
    fetch();
  }, []);

  const getSelectedGroup = async (group) => {
    await axios
      .get(`${groupUrl}${group}/channel`)
      .then((data) => setPrograms(data.data))
      .catch((err) => {
        throw err;
      });
  };

  return groups.length ? (
    <div className="container mt-4">
      <PureSelector groups={groups} getSelectedGroup={getSelectedGroup} />
      {programs.map((program) => (
        <Program key={program.id} program={program} />
      ))}
    </div>
  ) : (
    <div className="loader__container">
      <div className="loader__position">
        <Loader />
      </div>
    </div>
  );
};

export default App;
