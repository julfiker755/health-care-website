import NewsSubscribe from "@/components/common/news-subscribe";
import Specialities from "@/components/views/specialities";
import BestDoctors from "@/components/views/best-doctors";
import FeqQuestion from "@/components/views/feq-questions";
import OurPartners from "@/components/views/our-partners";
import Testimonials from "@/components/views/testimonials";
import HeroSec from "@/components/views/hero-sec";
import Works from "@/components/views/works";

function landingpage() {
  return (
    <>
      <HeroSec />
      <Specialities />
      <BestDoctors />
      <Works />
      <FeqQuestion />
      <Testimonials />
      <OurPartners />
      <NewsSubscribe />
    </>
  );
}

export default landingpage;
