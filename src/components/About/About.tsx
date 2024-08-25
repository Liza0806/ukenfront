import { Text } from "../Text/Text";
import { Title } from "../Title/Title";
import cls from "./About.module.scss";

export const About = () => {
  return (
    <section className={cls.wrapper}>
      <div>
        <Title text="UKEN TEAM" classN={"large"} color={"orange"} />
        <Text
          text={
            "Приходите к нам в школу, мы хорошие ребята, всему научим"
          }
          color={"white"}
          classN={'large'}
        />
      </div>
    </section>
  );
};
