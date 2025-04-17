import CopyRight from "@/components/common/copy-right";
import Fooder from "@/components/shared/fooder";
import Navber from "@/components/shared/navber";

export interface childrenProps {
  children: React.ReactNode;
}

export default function CommonLayout({ children }: childrenProps) {
  return (
    <div>
      <Navber />
      {children}
      <Fooder />
      <CopyRight />
    </div>
  );
}
