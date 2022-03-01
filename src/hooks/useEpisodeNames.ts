import { useQueries } from 'react-query';
import {axiosInstance} from "src/api";


/**
 * @function
 * @param
 * @description
 */
export default function useEpisodeNames(episodes) {

    // this chunk logic here is to implement probable endpoint's limitation in accepting parameters. in such cases that episodes.length is too high
    let tempArray: string[], chunk: number = 30
    const chunkedEpisodes = [];
    for (let i = 0, j = episodes.length; i < j; i += chunk) {
        tempArray = episodes.slice(i, i + chunk);
        // @ts-ignore
        chunkedEpisodes.push(tempArray);
    }
    const queries = useQueries(
        chunkedEpisodes.map((episodes) => {
            return {
                queryKey: [`episodes${episodes[0]}`],
                queryFn: () => axiosInstance.get(`/episode/${episodes}`)
            };
        })
    );
    let result = [];
    queries.forEach((query) => {
        if (query.data) {
            // @ts-ignore
            result = [...result, ...query.data.data]
        }
    });
    // @ts-ignore
    return result.map((episode) => episode.name)
}
