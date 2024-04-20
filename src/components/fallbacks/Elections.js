import { CardSkeleton } from "./skeletons"

function ElectionsFallback(){
    return (
        <div className="flex">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </div>
    )
}

export default ElectionsFallback