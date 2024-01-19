'use client'

import React, { useEffect, useState } from 'react'
import { fetchCached } from 'services/agent'
import Leftover from 'components/Leftover'

const Restes = () => {
  const [plannings, setPlannings] = useState([])
  useEffect(() => {
    fetchCached('/api/restes').then(setPlannings)
  }, [])

  return <Leftover plannings={plannings} />
}

export default Restes
