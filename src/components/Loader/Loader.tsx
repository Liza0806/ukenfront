import loaderPng from "../../assets/loader.png";
import cls from "./Loader.module.scss";

export const Loader = () => {
  return (
    <div className={cls.loaderWrapper}>
      <img className={cls.loader} src={loaderPng} alt="Loading..." />
    </div>
  );
};
