import styles from "./SmallCard.module.css";

const SmallCard = (props) => {
  return (
    <div className={`${props.className} ${styles.smallCard}`}>
      {props.children}
    </div>
  );
};

export default SmallCard;
