import { useEffect, useState } from "react";
import "../styles/components/Carousel.style.css";
import Icon from "./Icon";

interface CarouselProps {
  imgList: File[] | string[];
  auto?: boolean;
}

export default function Carousel({ imgList, auto = true }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const clickNext = (ev: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    ev.stopPropagation();
    if (imgList && activeIndex === imgList.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  const clickPrev = (ev: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    ev.stopPropagation();
    if (imgList && activeIndex === 0) {
      setActiveIndex(imgList.length - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };

  const clickDot = (
    ev: React.MouseEvent<HTMLLabelElement, MouseEvent>,
    id: number
  ) => {
    ev.stopPropagation();
    setActiveIndex(id);
  };

  /**
   * 현재 index에 따라 classname에 active 붙여주는 함수
   * id : img의 id
   */
  const indexClassName = (id: number) => {
    return id === activeIndex
      ? "carousel__img-box-active"
      : "carousel__img-box";
  };

  // 5초뒤에 이미지의 index +1 해주기
  useEffect(() => {
    if (auto) {
      const interval = setInterval(() => {
        if (imgList) {
          setActiveIndex(() =>
            activeIndex === imgList.length - 1 ? 0 : activeIndex + 1
          );
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activeIndex]);

  return (
    <>
      <div className="carousel">
        <div className="carousel__controls">
          <span
            className="carousel__slide-prev"
            onClick={(ev) => clickPrev(ev)}
          >
            <Icon name="IconLeft" size={24} />
          </span>
          <span
            className="carousel__slide-next"
            onClick={(ev) => clickNext(ev)}
          >
            <Icon name="IconRight" size={24} />
          </span>
        </div>

        <div className="carousel__img">
          {imgList &&
            imgList.map((img, i) => (
              <div className={indexClassName(i)} key={i}>
                <img
                  src={typeof img === "string" ? img : URL.createObjectURL(img)}
                  alt={`img-${i}`}
                />
              </div>
            ))}
        </div>

        <div className="carousel__dots">
          {imgList &&
            imgList.map((el, i) => (
              <label
                key={i}
                onClick={(ev) => clickDot(ev, i)}
                className={
                  activeIndex === i ? "carousel__dot-active" : "carousel__dot"
                }
              ></label>
            ))}
        </div>
      </div>
    </>
  );
}
