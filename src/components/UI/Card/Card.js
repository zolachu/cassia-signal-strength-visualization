import styles from "./Card.module.css";
import IconComponent from ".././IconContainer/IconComponent";

import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";

const Card = (props) => {
  return (
    <div className={`${props.className} ${styles.card}`}>
      <IconComponent title={props.title} icon={props.icon}>
        <TrendingUpOutlinedIcon />
      </IconComponent>
      {props.children}
    </div>
  );
};

export default Card;
