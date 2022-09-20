import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
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
      icon = <TrendingUpOutlinedIcon />;
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
