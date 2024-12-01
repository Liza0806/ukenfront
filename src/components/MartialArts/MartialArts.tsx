import { MartialArtCard } from '../MartialArtCard/MartialArtCard'
import cls from './MartialArts.module.scss'

export const MartialArts = () => {
    return (
        <div className={cls.martialArts}>
<MartialArtCard/>
<MartialArtCard/>
<MartialArtCard/>
<MartialArtCard/>
        </div>
    )
}