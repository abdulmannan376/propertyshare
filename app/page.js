"use client"
import dynamic from "next/dynamic";
import Carousel from "@/components/landing-page/carousel";
import SectionAboutUs from "@/components/landing-page/section-aboutus";
import SectionContact from "@/components/landing-page/section-contactus";
import SectionFeaturedProperty from "@/components/landing-page/section-featured-property";
const SectionMap = dynamic(
  () => import("@/components/landing-page/section-map"),
  { ssr: false }
);
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { updateDropdrownStatus } from "./redux/features/navbarSlice";

export default function Home() {
  const dispatch = useDispatch();
  return (
    <main
      className=""
      onClick={() => dispatch(updateDropdrownStatus({ field: "close all" }))}
    >
      <Carousel />
      <SectionMap />
      <SectionFeaturedProperty />
      <SectionAboutUs />
      <SectionContact />
    </main>
  );
}
