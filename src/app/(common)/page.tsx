import Navber from '@/components/common/shared/Navber'
import Specialities from '@/components/specialities'
import HeroSec from '@/components/hero-sec'
import BestDoctors from '@/components/best-doctors'
import Works from '@/components/works'
import React from 'react'
import FeqQuestion from '@/components/feq-questions'


function landingpage() {
  return (
    <>
        <Navber/>
        <HeroSec/>
        <Specialities/>
        <BestDoctors/>
        <Works/>
        <FeqQuestion/>
    </>
  )
}

export default landingpage