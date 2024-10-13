import { About } from "../../components/About/About";
import { Coach } from "../../components/Coach/Coach";
import { Hero } from "../../components/Hero/Hero";
import { MartialArts } from "../../components/MartialArts/MartialArts";


const LandingPage = () => {
    
    return (
        <div>
            <Hero/>
            <About/>
            <Coach/>
            <MartialArts/>
        </div>
    );
};

export default LandingPage;