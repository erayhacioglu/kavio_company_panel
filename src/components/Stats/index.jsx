import "./stats.scss";

const Stats = ({data}) => {
    return(
        <div className="stats_container">
        {data.map((stat, index) => (
        <div className="stat_item" key={index}>
          <div className="stat_value">{stat.value}</div>
          <div className="stat_label">{stat.label}</div>
        </div>
      ))}
    </div>
    );
}

export default Stats;