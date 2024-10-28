import { About } from "../../components/About/About";
import { Coach } from "../../components/Coach/Coach";
import { Hero } from "../../components/Hero/Hero";
import LogoImage from '../../assets/Logo.gif'; 

const LandingPage = () => {
    
    return (
        <div>
            <Hero/>
           
            <About/>
            <Coach/>
        </div>
    );
};

export default LandingPage;