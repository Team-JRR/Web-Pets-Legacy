import React from 'react';

function Skill(props) {
  const { name, stat } = props.skill;
  console.log(props.skill);

  const handleClick = (event) => {
    console.log('click');
  };

  return (
    <div>
      <p>{name}</p>
      <meter max='100' value={stat}></meter>
      <button onClick={handleClick}>Train {name}</button>
    </div>
  );
}

export default Skill;
