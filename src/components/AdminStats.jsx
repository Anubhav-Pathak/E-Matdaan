import data from "@/data.json"
import Stats from "./ui/Stats"

const AdminStats = () => {
  return (
    <div className="stats stats-vertical shadow">
      {data.stats.map((stat, index) => <Stats key={index} title={stat.title} value={stat.value} />)}
    </div>
  )
}

export default AdminStats