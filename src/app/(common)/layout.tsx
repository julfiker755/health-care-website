import CopyRight from '@/components/common/copy-right'
import Fooder from '@/components/shared/fooder'
import Navber from '@/components/shared/navber'


export default function CommonLayout({children}:{children:React.ReactNode}) {
  return (
    <div>
      <Navber/>
      {children}
      <Fooder/>
      <CopyRight/>
    </div>
  )
}
