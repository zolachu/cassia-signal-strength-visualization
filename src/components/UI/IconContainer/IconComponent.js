import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import HistoryIcon from "@mui/icons-material/History";
import InsightsIcon from "@mui/icons-material/Insights";
import FunctionsIcon from "@mui/icons-material/Functions";
import styles from "./IconComponent.module.css";

const IconComponent = (props) => {
  let color = `${styles.iconContainer} `;
  let icon = "";
  switch (props.icon) {
    case "live":
      color += `${styles.live}`;
      icon = <TrendingUpOutlinedIcon />;
      break;
    case "record":
      color += `${styles.record}`;
      icon = <HistoryIcon />;
      break;
    case "preview":
      color += `${styles.preview}`;
      icon = <InsightsIcon />;
      break;
    case "statistics":
      color += `${styles.statistics}`;
      icon = <FunctionsIcon />;
      break;
    default:
  }

  return (
    <div className={styles.title}>
      <span className={color}>{icon}</span>
      <h4>{props.title}</h4>
    </div>
  );
};

export default IconComponent;
