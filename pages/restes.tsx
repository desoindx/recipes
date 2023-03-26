import Leftover from 'components/Leftover';
import React, { useEffect, useState } from 'react';
import { fetchCached } from 'services/agent';

const Restes = () => {
  const [plannings, setPlannings] = useState([]);
  useEffect(() => {
    fetchCached('/api/restes').then(setPlannings);
  }, []);

  return <Leftover plannings={plannings} />;
};

export default Restes;
