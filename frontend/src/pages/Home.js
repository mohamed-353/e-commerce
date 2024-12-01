import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'
import { useEffect } from 'react'
import ToTop from '../components/ToTop'

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth', duration: 1000 });
  }, []);

  return (
    <div>
      <CategoryList />
      <BannerProduct />

      <HorizontalCardProduct category={"airpods"} heading={"Top's Airpodes"} />
      <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"} />

      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
      <VerticalCardProduct category={"televisions"} heading={"Televisions"} />
      <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"} />
      <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"} />
      <VerticalCardProduct category={"camera"} heading={"Camera & Photography"} />
      <VerticalCardProduct category={"mouse"} heading={"Mouse"} />
      <VerticalCardProduct category={"laptop"} heading={"Laptop"} />
      {/* <VerticalCardProduct category={"bed"} heading={"Bed"} /> */}
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />

      <ToTop />
    </div>
  )
}

export default Home