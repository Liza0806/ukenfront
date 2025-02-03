import React from 'react'
import { About } from "../../components/About/About";
import { Coach } from "../../components/Coach/Coach";
import { Hero } from "../../components/Hero/Hero";
import { Gallery } from "../../components/Gallery/Gallery";
import { Schedule } from "../../components/Schedule/Schedule";
import { Futer } from "../../components/Futer/Futer";


const LandingPage = () => {
    
    return (
        <div>
            <Hero/>
            <About/>
            <Coach/>
            <Gallery/>
            <Schedule/>
            <Futer/> 
        </div>
    );
};

export default LandingPage;