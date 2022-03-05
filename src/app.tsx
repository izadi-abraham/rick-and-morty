import {h} from "preact";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from 'src/routes/Home'
import Profile from 'src/routes/Profile'
import Navbar from "src/components/Navbar";
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'

const queryClient = new QueryClient()

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/profile/:id" element={<Profile/>}/>
                </Routes>
            </Router>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
