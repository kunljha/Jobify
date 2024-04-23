import React from 'react'
import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'
import Statitem from './Statitem'

const StatsContainer = ({defaultStatus}) => {
  const stats = [
    {
      title: 'pending applications',
      count: defaultStatus?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#f59e0b',
      bcg: '#fef3c7',
    },
    {
      title: 'interviews scheduled',
      count: defaultStatus?.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'jobs declined',
      count: defaultStatus?.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ]
  return (
    <Wrapper>
      {
        stats.map((item) => {
          return <Statitem key={item.title} {...item} />
        })
      }
    </Wrapper>
  )
}

export default StatsContainer
