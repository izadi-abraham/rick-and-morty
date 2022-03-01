import {FunctionComponent, h} from "preact";
import {useState} from "preact/hooks";
import CardSkeleton from "src/components/Card/skeleton";
import './style.scss'




/**
 * @interface ICardProps
 * @component Card
 */
interface ICardProps {
    character?: any,
    fallback?: boolean

}

/**
 * @component Card
 * @description Renders a specific character's card
 * @param props: ICardProps
 */
const Card = (props: ICardProps) => {
    const {character, fallback = false} = props
    const [imageLoaded, setImageLoaded] = useState<boolean>(false)
    const badgeBgColor = character?.status === 'Alive' ? 'bg-success' : character?.status === 'Dead' ? 'bg-danger' : 'bg-secondary'

    if (fallback) return <CardSkeleton/>

    return <>
        <div className={'ram-card'} style={{display: imageLoaded ? 'block' : 'none'}}>
            <div className={'ram-card__body'}>
                <img className={'ram-card__image'} src={character.image} onLoad={() => setImageLoaded(true)}
                     alt="card-image"/>
                <div className={'ram-card__content'}>
                    <div className="ram-card__title ram-card-name">{character.name}</div>
                    <div className="ram-card__text ram-card-splitter">{character.gender}</div>
                    <div className="ram-card__text">Last Location</div>
                    <div className="ram-card__title">{character.location.name}</div>
                </div>
            </div>
            <div className={`ram-card__badge badge ${badgeBgColor}`}>{character.status}</div>
        </div>
        {!imageLoaded && <CardSkeleton/>}
    </>
}

export default Card