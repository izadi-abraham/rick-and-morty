import {axiosInstance} from "src/api";
import {FunctionComponent, h} from "preact";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import useEpisodeNames from "src/hooks/useEpisodeNames";
import './style.scss'


/**
 * @interface IProfileProps
 * @component Profile
 */
interface IProfileProps {
}


/**
 * @component Profile
 * @description Renders a specific character's profile
 * @param props: IProfileProps
 */
const Profile: FunctionComponent<IProfileProps> = (props: IProfileProps) => {
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
    const {data: locationQuery} = useQuery('location', () => axiosInstance.get(`/location/${locationId}`), {
        enabled: !!locationId
    })
    const episodeNames = episodes?.length && useEpisodeNames(episodes)
    const badgeBgColor = characterQuery?.data.status === 'Alive' ? 'bg-success' : characterQuery?.data.status === 'Dead' ? 'bg-danger' : 'bg-secondary'

    return (
        <>
            {characterLoading && <h1 className={"ram-profile-page-no-data container"}>Loading character's data...</h1>}
            {characterError && <h1 className={"ram-profile-page-no-data container"}>Something went wrong, please try refreshing</h1>}
            {characterQuery?.data &&
            <div className="ram-profile-page container">
                <div className="ram-profile-page-header">
                    <img className="ram-profile-page-header-image col-4" src={characterQuery.data.image}
                         alt="character-image"/>
                    <div className={"ram-profile-page-header-info col-4"}>
                        <h1 className="ram-profile-page__title">{characterQuery.data.name}</h1>
                        <div
                            className={`ram-profile-page__badge ${badgeBgColor} badge fs-5`}
                        >
                            {characterQuery.data.status}
                        </div>
                        <div className="mb-3">Gender: {characterQuery.data.gender}</div>
                        <div className="mb-3">Origin: {characterQuery.data.origin?.name}</div>
                        <div className="mb-3">Species: {characterQuery.data.species}</div>
                        <div className="">Created: {characterQuery.data.created}</div>
                    </div>
                    {locationQuery?.data &&
                    <div className={"ram-profile-page-header-location col-4"}>
                        <h2 className="ram-profile-page-header-location__title">Location</h2>
                        <h4 className="ram-profile-page-header-location__heading">{locationQuery.data.name}</h4>
                        <div className="mb-3">Type: {locationQuery.data.type}</div>
                        <div className="mb-3">Dimension: {locationQuery.data.dimension}</div>
                        <div className="mb-3">Number of residents: {locationQuery.data.residents.length}</div>
                        <div className="">Origin: {characterQuery.data.origin.name}</div>
                    </div>
                    }
                </div>
                {episodeNames?.length > 0 &&
                <div className="ram-profile-page-episodes">
                    <h2 className="ram-profile-page__title">Featured Episodes:</h2>
                    <div className={'ram-profile-page-episodes__names'}>{episodeNames.join(' // ')}</div>
                </div>
                }
            </div>
            }
        </>
    );
}

export default Profile