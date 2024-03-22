const Stats = ({title, value}) => {
    return (
        <div className="stat">
            <div className="stat-title">{title}</div>
            <div className="stat-value">{value}</div>
        </div>
    )
}

export default Stats