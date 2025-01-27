import Navber from '@/components/shared/navber'
import Specialities from '@/components/view/specialities'
import HeroSec from '@/components/view/hero-sec'
import BestDoctors from '@/components/view/best-doctors'
import Works from '@/components/view/works'
import FeqQuestion from '@/components/view/feq-questions'
import React from 'react'


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