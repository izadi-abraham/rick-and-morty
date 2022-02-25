import {h} from "preact";
import {Logo} from './logo'
import { axiosInstance } from 'src/api'
import Profile from 'src/components/Profile'


const data = axiosInstance.get('/character').then((res) => console.log(res))

export function App() {
    return (
        <>
            <Logo/>
            <Profile/>
            <p>Hello Vite + Preact!</p>
            <p>
                <a
                    class="link"
                    href="https://preactjs.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn Preact
                </a>
            </p>
        </>
    )
}
