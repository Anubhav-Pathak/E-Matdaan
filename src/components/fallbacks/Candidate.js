function CandidateFallback(){
    return (
        <div className="flex flex-col gap-4">
            <div className="skeleton h-12 w-72"></div>
            <div className="flex">
                <div className="skeleton h-8 w-36 mr-4"></div>
                <div className="skeleton h-8 w-36"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                    <div className="skeleton h-8 w-48"></div>
                    <div className="skeleton h-8 w-full"></div>
                    <div className="skeleton h-8 w-full"></div>
                    <div className="skeleton h-8 w-full"></div>
                    <div className="skeleton h-8 w-full"></div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="skeleton h-8 w-48"></div>
                    <div className="skeleton h-8 w-full"></div>
                    <div className="skeleton h-8 w-full"></div>
                    <div className="skeleton h-8 w-full"></div>
                    <div className="skeleton h-8 w-full"></div>
                </div>
                <div className="col-span-full skeleton w-full h-96"></div>
            </div>
        </div>
    )
}

export default CandidateFallback;