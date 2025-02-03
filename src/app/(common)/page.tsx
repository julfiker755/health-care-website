import Navber from '@/components/shared/navber'
import Specialities from '@/components/view/specialities'
import HeroSec from '@/components/view/hero-sec'
import BestDoctors from '@/components/view/best-doctors'
import Works from '@/components/view/works'
import FeqQuestion from '@/components/view/feq-questions'
import React from 'react'
import OurPartners from '@/components/view/our-partners'
import Fooder from '@/components/shared/fooder'
import CopyRight from '@/components/common/copy-right'
import NewsSubscribe from '@/components/common/news-subscribe'


function landingpage() {
  return (
    <>
        <Navber/>
        <HeroSec/>
        <Specialities/>
        <BestDoctors/>
        <Works/>
        <FeqQuestion/>
        <OurPartners/>
        <NewsSubscribe/>
        <Fooder/>
        <CopyRight/>
    </>
  )
}

export default landingpage