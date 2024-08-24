import cls from './Hero.module.scss'
import heroImage from '../../assets/ufc-sport-mix-fight-draki-boi-bez-pravil-594108.jpg'; 
export const Hero = () => {
    return(
        <section className={cls.hero} style={{ backgroundImage: `url(${heroImage})` }}>
  <div className={cls.heroOverlay}></div>
  <div className={cls.heroContent}>
    <h1>Welcome to Uken</h1>
    <p>Master the art of combat with professional training in Boxing, MMA, Wrestling, and more!</p>
    <a href="#signup" className={cls.ctaButton}>Sign Up for a Trial Class</a>
  </div>
</section>
    )
}