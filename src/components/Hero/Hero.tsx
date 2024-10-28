import cls from './Hero.module.scss'
import heroImage from '../../assets/ufc-sport-mix-fight-draki-boi-bez-pravil-594108.jpg'; 

import { Container } from '../Container/Container';

export const Hero = () => {
    return(
       <Container isCentre={false} containerImage={heroImage}>

  <div className={cls.heroContent}>
    <h1 className={cls.title}>UKEN TEAM</h1>

    <button className={cls.buttonJoin}><a href="#signup">ПРИЄДНАТИСЯ</a></button>
  
  </div>
</Container>
    )
}