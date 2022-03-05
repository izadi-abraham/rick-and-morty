import { useQueries } from 'react-query';
import {axiosInstance} from "src/api";


/**
 * @function useEpisodeNames
 * @param episodes
 * @description gets the id of episodes as an array and returns an array of episode's name
 */
export default function useEpisodeNames(episodes : []) {

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
    let result = []
    queries.forEach((query) => {
        if (query.data?.data) {
            // if the episodes query response's length is more than 1 the data field is an array of objects(episode's data) so we spread it
            // but when the query response's length is 1 the data field is only an object which can't be spread
            // @ts-ignore
            if (query.data?.data?.length > 1) result = [...result, ...query.data.data]
            // @ts-ignore
            else result.push(query.data.data)
        }
    });
    // @ts-ignore
    if (result) return result.map((episode) => episode.name)
}
