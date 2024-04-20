import {ContentSkeleton} from "./skeletons";

function StatsFallback(){
    return (
        <div className="stats stats-vertical shadow">
            <ContentSkeleton />
            <ContentSkeleton />
            <ContentSkeleton />
            <ContentSkeleton />
        </div>
    )
}

export default StatsFallback