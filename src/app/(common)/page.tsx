import NewsSubscribe from "@/components/common/news-subscribe";
import Specialities from "@/components/views/specialities";
import BestDoctors from "@/components/views/best-doctors";
import FeqQuestion from "@/components/views/feq-questions";
import OurPartners from "@/components/views/our-partners";
import HeroSec from "@/components/views/hero-sec";
import Works from "@/components/views/works";

async function landingpage() {
  return (
    <>
      <HeroSec />
      <Specialities />
      <BestDoctors />
      <Works />
      <FeqQuestion />
      <OurPartners />
      <NewsSubscribe />
    </>
  );
}

export default landingpage;
