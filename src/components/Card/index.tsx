import {h} from "preact";
import './style.scss'

export interface IProfileProps {
    character: any

}


const Card = (props: IProfileProps) => {
    const { character } = props
    const badgeBgColor = character.status === 'Alive' ? 'bg-success' : character.status === 'Dead' ? 'bg-danger' : 'bg-secondary'
    return (
        <div className={'col-lg-4 col-md-6 col-sm-6 col-12 mb-4 position-relative'}>
            <div
                className={'character-card d-flex flex-column justify-content-center text-dark'}
            >
                <img className={'character-card-image '} src={character.image} alt="character-image"/>
                <div className={'character-card-content'}>
                    <div className="fs-5 fw-bold">{character.name}</div>
                   <div className={'mb-3'}>
                       <span className="fs-6 ">{character.species}</span>
                       {' - '}
                       <span className="fs-6 ">{character.gender}</span>
                   </div>
                    <div className="">
                        <div className="fs-6 fw-normal">Last Location</div>
                        <div className="fs-5">{character.location.name}</div>
                    </div>
                </div>
            </div>
            <div className={`character-card-badge position-absolute badge ${badgeBgColor}`}>{character.status}</div>
        </div>
    )
}

export default Card