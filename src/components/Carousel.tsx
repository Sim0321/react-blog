import { Fragment, useEffect, useState } from "react";

export default function Carousel() {
  const [activeImg, setActiveImg] = useState(0);

  const imgArr = [
    {
      img: "https://images.unsplash.com/photo-1706539214505-5cb21db70d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcwNzY1OTg1Mw&ixlib=rb-4.0.3&q=80&w=1080",
      id: 0,
    },
    {
      img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      id: 1,
    },
    // {
    //   img: "https://plus.unsplash.com/premium_photo-1667340456421-e39b77a25217?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcwNzY1OTkwMg&ixlib=rb-4.0.3&q=80&w=1080",
    //   id: 2,
    // },
    // {
    //   img: "https://images.unsplash.com/photo-1606117331085-5760e3b58520?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    //   id: 3,
    // },
    // {
    //   img: "https://images.unsplash.com/photo-1704975986930-0c09f513c985?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcwNzY2MDY5Mw&ixlib=rb-4.0.3&q=80&w=1080",
    //   id: 4,
    // },
  ];

  const clickNext = (
    ev: React.MouseEvent<HTMLLabelElement, MouseEvent>,
    id: number
  ) => {
    console.log("눌림");
    ev.stopPropagation();
    if (id === imgArr.length - 1) {
      setActiveImg(0);
    } else {
      setActiveImg(activeImg + 1);
    }
  };
  const clickPrev = (
    ev: React.MouseEvent<HTMLLabelElement, MouseEvent>,
    id: number
  ) => {
    ev.stopPropagation();
    if (id === 0) {
      setActiveImg(imgArr.length - 1);
    } else {
      setActiveImg(activeImg - 1);
    }
  };

  const clickDot = (
    ev: React.MouseEvent<HTMLLabelElement, MouseEvent>,
    id: number
  ) => {
    console.log("눌림");
    ev.stopPropagation();
    setActiveImg(id);
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setActiveImg(() => (activeImg === imgArr.length - 1 ? 0 : activeImg + 1));
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [activeImg]);

  return (
    <>
      <div className="carousel">
        <ul className="carousel__slides">
          {imgArr.map((el) => (
            <Fragment key={el.id}>
              <input
                type="radio"
                name="radio-buttons"
                // id="img-1"
                checked={activeImg === el.id}
                readOnly
              />
              <li className="carousel__slide-container">
                <div className="carousel__slide-img">
                  <img alt={`scenery${el.id}`} src={el.img} />
                </div>
                <div className="carousel__controls">
                  <label
                    onClick={(ev) => clickPrev(ev, el.id)}
                    className="carousel__slide-prev"
                  >
                    <span>&lsaquo;</span>
                  </label>
                  <label
                    onClick={(ev) => clickNext(ev, el.id)}
                    className="carousel__slide-next"
                  >
                    <span>&rsaquo;</span>
                  </label>
                </div>
              </li>
            </Fragment>
          ))}

          <div className="carousel__dots">
            {imgArr.map((el) => (
              <label
                key={el.id}
                onClick={(ev) => clickDot(ev, el.id)}
                className={
                  activeImg === el.id ? "carousel__dot-active" : "carousel__dot"
                }
                // id="img-dot-1"
              ></label>
            ))}
          </div>
        </ul>
      </div>
    </>
  );
}
