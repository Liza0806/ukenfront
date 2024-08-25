import cls from "./Title.module.scss";

type TytleTypeProps = {
  classN?: "large" | "medium" | "small";
  color?: "orange" | "white" | "grey";
  text: string;
};

export const Title = (props: TytleTypeProps) => {
  const { classN, text, color } = props;
  return <p className={`${cls[classN || ""]} ${cls[color || ""]}`}>{text}</p>;
};
