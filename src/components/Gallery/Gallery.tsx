import { useState, MouseEvent } from "react";
import cls from "./Gallery.module.scss";
import box from "../../assets/kik2.jpg";
import kickboxing from "../../assets/kik3.jpg";
import wrestling from "../../assets/kik4.jpg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useEffect } from "react";

export const Gallery = () => {
  const images = [wrestling, kickboxing, wrestling];
  const [currentIndex, setCurrentIndex] = useState(0);

  const changeImageIncrease = (e: MouseEvent<HTMLButtonElement>) => {
    // Увеличиваем индекс, если дошли до конца массива - сбрасываем на 0
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const changeImageReduce = (e: MouseEvent<HTMLButtonElement>) => {
    // Уменьшаем индекс, если дошли до начала массива - переходим к последнему элементу
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={cls.containerGallery}>
      <div className={cls.containerTitle}>
        <p className={cls.galleryTitle}>ГАЛЕРЕЯ</p>
      </div>

      {isMobile ? (
        <div className={cls.galerryContent}>
          <img
            className={cls.centerImage}
            src={images[currentIndex]}
            alt="Текущее изображение"
          />

          <div className={cls.buttons}>
            <button
              type="button"
              className={cls.buttonLeftMob}
              onClick={changeImageIncrease}
            >
              <ArrowBackIosIcon
                style={{ color: "rgba(255, 255, 255, 0.6)" }}
                fontSize="large"
              ></ArrowBackIosIcon>
            </button>
            <button
              type="button"
              className={cls.buttonRightMob}
              onClick={changeImageReduce}
            >
              <ArrowForwardIosIcon
                style={{ color: "rgba(255, 255, 255, 0.6)" }}
                fontSize="large"
              ></ArrowForwardIosIcon>
            </button>
          </div>
        </div>
      ) : (
        <div className={cls.galerryContent}>
          <img
            className={cls.imageSideRight}
            src={currentIndex >= 1 ? images[currentIndex - 1] : images[2]}
            alt="Предыдущее изображение"
          />

          <button
            type="button"
            className={cls.buttonLeft}
            onClick={changeImageIncrease}
          >
            <ArrowBackIosIcon
              style={{ color: "rgba(255, 255, 255, 0.6)" }}
              fontSize="large"
            ></ArrowBackIosIcon>
          </button>

          <img
            className={cls.centerImage}
            src={images[currentIndex]}
            alt="Текущее изображение"
          />

          <button
            type="button"
            className={cls.buttonRight}
            onClick={changeImageReduce}
          >
            <ArrowForwardIosIcon
              style={{ color: "rgba(255, 255, 255, 0.6)" }}
              fontSize="large"
            ></ArrowForwardIosIcon>
          </button>

          <img
            className={cls.imageSide}
            src={currentIndex < 2 ? images[currentIndex + 1] : images[0]}
            alt="Следующее изображение"
          />
        </div>
      )}
    </div>
  );
};
