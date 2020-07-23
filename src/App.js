import React, { useState, useEffect } from 'react';
import axios from 'axios'

import Selector from './components/selector/selector'
import Program from './components/program/program'

const groupUrl = 'http://192.168.0.7:3001/group'

const App = () => {
  const [groups, setGroups] = useState([])
  const [programs, setPrograms] = useState([])

  useEffect(() => {
    axios
      .get(groupUrl)
      .then(data => setGroups(data.data))
      .catch(err => {throw err})
  }, [])

  const getSelectedGroup = async (group) => {
    await axios
      .get(`http://192.168.0.7:3001/group/${group}/channel?withProgram`)
      .then(data => setPrograms(data.data))
      .catch(err => {throw err})
  }

  return (
    <div className="container mt-4">
      <Selector groups={groups} getSelectedGroup={getSelectedGroup} />
      <Program programs={programs} />
    </div>
  );
}

export default App;
