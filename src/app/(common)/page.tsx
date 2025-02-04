import Specialities from '@/components/view/specialities'
import HeroSec from '@/components/view/hero-sec'
import BestDoctors from '@/components/view/best-doctors'
import Works from '@/components/view/works'
import FeqQuestion from '@/components/view/feq-questions'
import OurPartners from '@/components/view/our-partners'
import NewsSubscribe from '@/components/common/news-subscribe'


function landingpage() {
  return (
    <>
        <HeroSec/>
        <Specialities/>
        <BestDoctors/>
        <Works/>
        <FeqQuestion/>
        <OurPartners/>
        <NewsSubscribe/>
    </>
  )
}

export default landingpage