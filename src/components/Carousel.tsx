import { useEffect, useState } from "react";
import "../styles/components/Carousel.style.css";
import Icon from "./Icon";

const imgArr = [
  {
    url: "https://images.unsplash.com/photo-1706539214505-5cb21db70d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcwNzY1OTg1Mw&ixlib=rb-4.0.3&q=80&w=1080",
    id: 0,
  },
  {
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    id: 1,
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1667340456421-e39b77a25217?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcwNzY1OTkwMg&ixlib=rb-4.0.3&q=80&w=1080",
    id: 2,
  },
  {
    url: "https://images.unsplash.com/photo-1606117331085-5760e3b58520?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    id: 3,
  },
  {
    url: "https://images.unsplash.com/photo-1704975986930-0c09f513c985?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcwNzY2MDY5Mw&ixlib=rb-4.0.3&q=80&w=1080",
    id: 4,
  },
];

// interface ImageProps {
//   url: string;
//   id: number;
// }

interface CarouselProps {
  // imgList?: ImageProps[] | File[];
  imgList?: File[];
  auto?: boolean;
}

export default function Carousel({ imgList, auto = true }: CarouselProps) {
  // console.log(imgList);
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
          console.log("imgList 있음");
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
                <img src={URL.createObjectURL(img)} alt={`img-${i}`} />
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
