import React, { useState, useEffect } from "react";
import './pureSelector.css'

const PureSelector = (props) => {
  const { groups, getSelectedGroup } = props;

  const [selectorValue, setSelectorValue] = useState(
    localStorage.getItem('group') || groups[0].name
  );

  useEffect(() => {
    getSelectedGroup(selectorValue);
    localStorage.setItem("group", selectorValue);
  }, [selectorValue]);

  return (
    <select
      value={selectorValue}
      onChange={(e) => setSelectorValue(e.target.value)}
    >
      {groups.map((group) => (
        <option key={group.id}>{group.name}</option>
      ))}
    </select>
  );
};

export default PureSelector;
