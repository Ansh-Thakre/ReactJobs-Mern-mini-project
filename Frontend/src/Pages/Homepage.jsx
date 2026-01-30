import React from "react";
import Hero from "../components/Hero";
import HomeCard from "../components/HomeCard";
import Joblistings from "../components/Joblistings";
import Alljobs from "../components/Alljobs";

const Homepage = () => {
  return (
    <>
      <Hero />
      <HomeCard />
      <Joblistings isHome ={true} />
      <Alljobs />
    </>
  );
};

export default Homepage;
