import Carousel from "@/components/landing-page/carousel";
import SectionMap from "@/components/landing-page/section-map";
import Image from "next/image";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <main className="">
      <Carousel/>
      <SectionMap/>
    </main>
  );
}
