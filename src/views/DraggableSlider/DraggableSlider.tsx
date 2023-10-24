import { useState, useEffect, TouchEvent, MouseEvent, useRef } from 'react';
import cn from 'classnames';

import { DEFAULT_STATE_RADIOS } from '@v4ly/config/constants';

import s from './DraggableSlider.module.css';

let counter = 0;
let interval: null | number = null;
let initialX: number | undefined = undefined;
let finalX: number | undefined = undefined;
let slideDistance: number | undefined;
const threshold = 40;
const leftPost = -100;

export default function DraggableSlider() {
  const [slides, setSlides] = useState(DEFAULT_STATE_RADIOS);
  const [isDrag, setIsDrag] = useState(false);
  const ulRef = useRef<null | HTMLUListElement>(null);

  const moveSlide = () => {
    if (ulRef.current) {
      ulRef.current.style.left = `${leftPost * counter}%`;
    }
    setSlides(slides.map((slide) => ({ ...slide, isChecked: slide.id === counter + 1 })));
  };

  const animation = () => {
    if (isDrag) return;

    counter++;
    const conditionCounter = counter > slides.length - 1 ? 0 : counter;

    counter = conditionCounter;
    moveSlide();
    createInterval();
  };

  const handleNavigation = (id: number) => () => {
    counter = id - 1;
    moveSlide();
  };

  const handleDragStart = (e: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>) => {
    removeInterval();
    e.preventDefault();
    setIsDrag(true);

    if (e.type === 'touchstart') {
      initialX = (e as TouchEvent<HTMLElement>).touches[0].clientX;
    } else {
      initialX = (e as MouseEvent<HTMLElement>).clientX;
      document.onmousemove = dragging;
      document.onmouseup = dragStop;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dragging = (e: any) => {
    if (!isDrag) return;

    finalX =
      e.type === 'touchmove'
        ? (e as TouchEvent<HTMLElement>).touches[0].clientX
        : (e as MouseEvent<HTMLElement>).clientX;

    const currentPosition = counter * leftPost;
    const ul = ulRef.current;
    const widthOfset = ul?.offsetWidth;

    slideDistance =
      (((initialX as number) - finalX) / ((widthOfset as number) / slides.length)) * 100;

    if (Math.abs(slideDistance) < threshold) {
      if (ul) {
        ul.style.left = `${currentPosition - slideDistance}%`;
      }
    }
  };

  const dragStop = () => {
    const _finalX = finalX as number;
    const _initialX = initialX as number;
    const _slideDistance = slideDistance as number;

    if (_finalX < _initialX && counter < slides.length - 1 && _slideDistance >= threshold) {
      counter++;
    } else if (_finalX > _initialX && counter > 0 && -_slideDistance >= threshold) {
      counter--;
    }

    moveSlide();
    createInterval();
    initialX = undefined;
    finalX = undefined;
    setIsDrag(false);
    document.onmousemove = null;
    document.onmouseup = null;
  };

  const createInterval = () => {
    if (!interval) {
      interval = window.setInterval(animation, 5000);
    }
  };

  const removeInterval = () => {
    interval && window.clearInterval(interval);
    interval = null;
  };

  useEffect(() => {
    createInterval();

    return () => {
      removeInterval();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.container}>
      <section
        className={s.slider}
        style={{ cursor: isDrag ? 'grabbing' : 'grab', transition: isDrag ? '0.5s' : '0.8s' }}
        onMouseDown={handleDragStart}
        onMouseMove={dragging}
        onMouseUp={dragStop}
      >
        <ul ref={ulRef} className={cn(s.slides, counter > slides.length - 1 && s.noAnimation)}>
          {slides.map(({ id, isChecked, backgroundColor }) => (
            <li key={id} className={s.slide} style={{ backgroundColor }}>
              <input type="radio" name="radio-btn" id={`radio${id}`} defaultChecked={isChecked} />
              <h2>{id}</h2>
            </li>
          ))}
        </ul>

        <div className={s.navigation}>
          {slides.map(({ id, isChecked }) => (
            <label
              key={id}
              id={id.toString()}
              className={cn(s.label, isChecked && s.selected)}
              htmlFor={`radio${id}`}
              onClick={handleNavigation(id)}
            ></label>
          ))}
        </div>
      </section>
    </div>
  );
}
