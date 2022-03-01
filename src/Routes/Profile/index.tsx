import {useEffect, useState} from "preact/hooks";
import {axiosInstance} from "src/api";
import Card from "src/components/Card";
import {FunctionComponent, h} from "preact";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import useEpisodeNames from "src/hooks/useEpisodeNames";


const Profile: FunctionComponent = () => {
    const {id} = useParams();
    const {
        isLoading: characterLoading,
        isError: characterError,
        data: characterQuery
    } = useQuery('character', () => axiosInstance.get(`/character/${id}`), {
        enabled: !!id
    })
    const episodes = characterQuery?.data.episode.map((episode) => Number(episode.split('/').slice(-1)))
    const locationId = Number(characterQuery?.data.location.url.split('/').slice(-1))
    const {
        isLoading: locationLoading,
        isError: locationError,
        data: locationQuery
    } = useQuery('location', () => axiosInstance.get(`/location/${locationId}`), {
        enabled: !!locationId
    })

    const episodeNames = episodes?.length && useEpisodeNames(episodes)

    return (
        characterLoading ? <div>Loading character\'s data</div> :
            characterQuery?.data ? (
                    <div className="container d-flex justify-content-center mb-5">
                        <div className="d-flex flex-column gap-3">
                            <h1 className="text-center">{characterQuery.data.name}</h1>

                            <img className="img-fluid" src={characterQuery.data.image} alt="character-image"/>
                            {characterQuery.data.status === "Dead" ?
                                <div className="badge bg-danger fs-5">{characterQuery.data.status}</div> :
                                characterQuery.data.status === "Alive" ?
                                    <div className=" badge bg-success fs-5">{characterQuery.data.status}</div> :
                                    <div className="badge bg-secondary fs-5">{characterQuery.data.status}</div>
                            }
                            <div className="content">
                                <div className="">
                                    <span className="fw-bold">Gender : </span>
                                    {characterQuery.data.gender}
                                </div>
                                <div className="">
                                    <span className="fw-bold">Origin: </span>
                                    {characterQuery.data.origin?.name}
                                </div>
                                <div className="">
                                    <span className="fw-bold">Species: </span>
                                    {characterQuery.data.species}
                                </div>
                                {locationQuery?.data &&
                                <div className="mt-3">
                                    <div className="fw-bold">Location</div>
                                    <div className="fw-bold">name: <span
                                        className={'fw-normal'}>{locationQuery.data.name}</span></div>
                                    <div className="fw-bold">type: <span
                                        className={'fw-normal'}>{locationQuery.data.type}</span></div>
                                    <div className="fw-bold">dimension: <span
                                        className={'fw-normal'}>{locationQuery.data.dimension}</span></div>
                                    <div className="fw-bold">number of residents: <span
                                        className={'fw-normal'}>{locationQuery.data.residents.length}</span></div>
                                    <div className="fw-bold">origin: <span
                                        className={'fw-normal'}>{characterQuery.data.origin.name}</span></div>
                                </div>
                                }
                                {episodeNames &&
                                <div className="mt-3" style={{maxWidth: '300px'}}>
                                    <div className="fw-bold">Featured Episodes:</div>
                                    <span className={'fw-normal'}>{episodeNames.join(', ')}</span>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                ) :
                <div>Something went wrong, please try refreshing</div>
    );
}

export default Profile