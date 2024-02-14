import { useEffect, useState } from "react";

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

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

  const clickNext = (ev: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    ev.stopPropagation();
    if (activeIndex === imgArr.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  const clickPrev = (ev: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    ev.stopPropagation();
    if (activeIndex === 0) {
      setActiveIndex(imgArr.length - 1);
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
    const interval = setInterval(() => {
      setActiveIndex(() =>
        activeIndex === imgArr.length - 1 ? 0 : activeIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <>
      <div className="carousel">
        <div className="carousel__controls">
          <span
            className="carousel__slide-prev"
            onClick={(ev) => clickPrev(ev)}
          >
            &lsaquo;
          </span>
          <span
            className="carousel__slide-next"
            onClick={(ev) => clickNext(ev)}
          >
            &rsaquo;
          </span>
        </div>

        <div className="carousel__img">
          {imgArr.map((img) => (
            <div className={indexClassName(img.id)} key={img.id}>
              <img src={img.url} alt={`img-${img.id}`} />
            </div>
          ))}
        </div>

        <div className="carousel__dots">
          {imgArr.map((el) => (
            <label
              key={el.id}
              onClick={(ev) => clickDot(ev, el.id)}
              className={
                activeIndex === el.id ? "carousel__dot-active" : "carousel__dot"
              }
            ></label>
          ))}
        </div>
      </div>
    </>
  );
}
