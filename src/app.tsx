import {h} from "preact";
import {Logo} from './logo'
import { axiosInstance } from 'src/api'
import Card from 'src/components/Card'
import {useEffect, useState} from "preact/hooks";



export function App() {
    const [characters, setCharacters] = useState(null)
    const getData = async () => await axiosInstance.get('/character')

    useEffect(() => {
        getData().then((res) => setCharacters(res.data.results))
    }, [])
    console.log(characters)
    return (
        <div className={'container'}>
            <div className={'row'}>

            {characters &&
            //@ts-ignore
            characters.map((character) =>
                <Card character={character}/>
            )}
            </div>
        </div>
    )
}
