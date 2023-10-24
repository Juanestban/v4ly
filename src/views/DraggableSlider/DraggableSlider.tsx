import { FC, DetailedHTMLProps, HTMLAttributes, forwardRef } from 'react';
import cn from 'classnames';

import s from './DraggableSlider.module.css'
  
interface DraggableSliderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  //
}
  
const DraggableSlider = forwardRef<HTMLDivElement, DraggableSliderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(s.container, className)} {...props}>
        {children}
      </div>
    );
  }
) as FC<DraggableSliderProps>;
  
export default DraggableSlider;
export type { DraggableSliderProps }

