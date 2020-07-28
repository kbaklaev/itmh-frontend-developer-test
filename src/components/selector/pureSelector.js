import React, { useState, useEffect } from "react";
// import './pureSelector.css'

const PureSelector = (props) => {
  const { groups, getSelectedGroup } = props;

  const [selectorValue, setSelectorValue] = useState(
    localStorage.getItem('group') || groups[0].name
  );

  useEffect(() => {
    getSelectedGroup(selectorValue);
    localStorage.setItem("group", selectorValue);
  }, [selectorValue, getSelectedGroup]);

  return (
    <div className="flex justify-center">
      <div className="m-4 inline-block relative w-4/5">
        <select
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          value={selectorValue}
          onChange={(e) => setSelectorValue(e.target.value)}
        >
          {groups.map((group) => (
            <option key={group.id}>{group.name}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  );
};

export default PureSelector;
