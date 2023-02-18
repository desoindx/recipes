import Leftover from 'components/Leftover';
import React, { useEffect, useState } from 'react';

const Restes = () => {
  const [plannings, setPlannings] = useState([]);
  useEffect(() => {
    fetch('/api/restes')
      .then((response) => response.json())
      .then(setPlannings);
  }, []);

  return <Leftover plannings={plannings} />;
};

export default Restes;
