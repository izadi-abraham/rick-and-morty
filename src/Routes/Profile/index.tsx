import {useEffect, useState} from "preact/hooks";
import {axiosInstance} from "src/api";
import Card from "src/components/Card";
import {h} from "preact";
import { useParams } from "react-router-dom";


const Profile = () => {

    const { id } = useParams();
    const [character, setCharacter] = useState<any>(null)
    const [location, setLocation] = useState<any>(null)
    const getCharacterData = async () => await axiosInstance.get(`/character/${id}`)
    const getLocationData = async () => await axiosInstance.get(`/location/${locationId}`)
    const getEpisodeData = async (episodes) => await axiosInstance.get(`/episode/${episodes}`)
    const locationId = Number(character?.location.url.split('/').slice(-1))
    const episodes = character?.episode.map((episode) => Number(episode.split('/').slice(-1)))
    // console.log(episodes)

    useEffect(() => {
        getCharacterData().then((res) => setCharacter(res.data))
    }, [id])

    useEffect(() => {
        locationId && getLocationData().then((res) => setLocation(res.data))
    }, [locationId])

    useEffect(() => {
        if (episodes?.length) {

            let tempArray: string[],
                chunk: number = 30,
                result: [];
            const chunkedEpisodes = [];
            for (let i = 0, j = episodes.length; i < j; i += chunk) {
                tempArray = episodes.slice(i, i + chunk);
                // @ts-ignore
                chunkedEpisodes.push(tempArray);
            }
            let episodeNames = []
            chunkedEpisodes.forEach(async (episodes) => {
                let result = await getEpisodeData(episodes)
                // @ts-ignore
                episodeNames = [...episodeNames, ...result.data.map((episode) => episode.name)]
                console.log(episodeNames)
            })
        }
    }, [episodes])



    return (
        character && (
            <div className="container d-flex justify-content-center mb-5">
                <div className="d-flex flex-column gap-3">
                    <h1 className="text-center">{character.name}</h1>

                    <img className="img-fluid" src={character.image} alt="character-image" />
                    {(() => {
                        if (character.status === "Dead") {
                            return <div className="badge bg-danger fs-5">{character.status}</div>;
                        } else if (character.status === "Alive") {
                            return <div className=" badge bg-success fs-5">{character.status}</div>;
                        } else {
                            return <div className="badge bg-secondary fs-5">{character.status}</div>;
                        }
                    })()}
                    <div className="content">
                        <div className="">
                            <span className="fw-bold">Gender : </span>
                            {character.gender}
                        </div>
                        <div className="">
                            <span className="fw-bold">Origin: </span>
                            {character.origin?.name}
                        </div>
                        <div className="">
                            <span className="fw-bold">Species: </span>
                            {character.species}
                        </div>
                        {location &&
                            <div className="mt-3">
                                <div className="fw-bold">Location</div>
                                <div className="fw-bold">name: <span className={'fw-normal'}>{location.name}</span></div>
                                <div className="fw-bold">type: <span className={'fw-normal'}>{location.type}</span></div>
                                <div className="fw-bold">dimension: <span className={'fw-normal'}>{location.dimension}</span></div>
                                <div className="fw-bold">number of residents: <span className={'fw-normal'}>{location.residents.length}</span></div>
                                <div className="fw-bold">origin: <span className={'fw-normal'}>{character.origin.name}</span></div>
                            </div>}
                    </div>
                </div>
            </div>
        )
    );
}

export default Profile