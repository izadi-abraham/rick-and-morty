import {h} from "preact";


/**
 * @component CardSkeleton
 * @description Skeleton for Card component
 */
const CardSkeleton = () => {
    return (
        <div className={"ram-card-skeleton-wrapper"}>
            <div className={"ram-card-skeleton ram-card-skeleton__img"}/>
            <div className={"ram-card-skeleton-body"}>
                <div className={"ram-card-skeleton ram-card-skeleton__title"}/>
                <div className={"ram-card-skeleton ram-card-skeleton__text ram-card-skeleton__short-text"}/>
                <div className={"ram-card-skeleton ram-card-skeleton__text"}/>
                <div className={"ram-card-skeleton ram-card-skeleton__title"}/>
            </div>
        </div>
    );
};

export default CardSkeleton