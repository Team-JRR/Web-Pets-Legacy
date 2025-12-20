import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Skill from './Skill';

function SkillDashboard(props) {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    setSkills(props.skills);
  }, [props.skills]);

  // TODO: - this probably needs to be moved to device
  const refreshSkillData = function() {
    axios.get('/training')
      .then((response) => {
        setSkills(response.data);
      })
      .catch((error) => {
        console.error('Failed to get pet skill data:', error);
      });
  };

  return (
    <div>
      <h4>Skill Dashboard</h4>
      {skills.map((skill) => <Skill key={skill.name} skill={skill} />)}
    </div>
  );
}

export default SkillDashboard;
