import Specialities from '@/components/views/specialities'
import HeroSec from '@/components/views/hero-sec'
import BestDoctors from '@/components/views/best-doctors'
import Works from '@/components/views/works'
import FeqQuestion from '@/components/views/feq-questions'
import OurPartners from '@/components/views/our-partners'
import NewsSubscribe from '@/components/common/news-subscribe'
import { toast } from 'sonner'


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