import {useEffect, useState, useRef} from "preact/hooks";
import {axiosInstance} from "src/api";
import Card from "src/components/Card";
import {h} from "preact";
import {Link} from "react-router-dom";
import {useInfiniteQuery} from "react-query";
import useIntersectionObserver from "src/hooks/useIntersectionObserver";
import './style.scss'


const Home = () => {
    const {
        data,
        isError,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery(
        'characters',
        async ({pageParam = '?page=1'}) => {
            const res = await axiosInstance.get('/character/' + pageParam)
            return res.data
        },
        {
            getNextPageParam: lastPage => lastPage.info.next?.split('/').slice(-1) ?? false,
        }
    )


    const loadMoreRef = useRef(null)

    useIntersectionObserver({
        target: loadMoreRef,
        onIntersect: fetchNextPage,
        enabled: !!hasNextPage,
    })


    return (
        <div className={'ram-home-page container'}>
            <>
                {isFetching || isFetchingNextPage &&
                <Card fallback={true}/>
                }
                {data && data.pages.map((page) =>
                    page.results.map((character) =>
                        <Link
                            to={`profile/${character.id}`}
                            style={{textDecoration: "none"}}
                            key={character.id}
                            className="ram-home-page__card-link"
                        >
                            <Card character={character}/>
                        </Link>
                    ))
                }
                {!isFetching && !isError && !hasNextPage &&
                    <div className={"ram-home-page__end-of-page"}>
                    Nothing more to load
                    </div>
                }
                {isError &&
                    <div className={"ram-home-page__error"}>
                    Something went wrong
                    </div>
                }
                <div
                    ref={loadMoreRef}
                    className={"ram-home-page load-more"}
                >
                </div>
            </>
        </div>
    )
}

export default Home