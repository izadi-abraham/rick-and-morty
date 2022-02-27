import {useEffect, useState} from "preact/hooks";
import {axiosInstance} from "src/api";
import Card from "src/components/Card";
import {h} from "preact";
import {Link} from "react-router-dom";


const Home = () => {
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
                    <Link
                        to={`profile/${character.id}`}
                        style={{ textDecoration: "none" }}
                        key={character.id}
                        className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4 position-relative text-dark"
                    >
                        <Card character={character}/>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Home