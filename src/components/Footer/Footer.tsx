import { FC, DetailedHTMLProps, HTMLAttributes, forwardRef, useState } from 'react';
import cn from 'classnames';

import s from './Footer.module.css';

interface FooterProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'children'> {
  //
}

const Footer = forwardRef<HTMLDivElement, FooterProps>(({ className, ...props }, ref) => {
  const [date] = useState(new Date());

  return (
    <footer ref={ref} className={cn(s.container, className)} {...props}>
      <p>
        © Copyright by{' '}
        <a target="_blank" href="https://github.com/Juanestban">
          Juanestban
        </a>{' '}
        - {date.getFullYear()}
      </p>
    </footer>
  );
}) as FC<FooterProps>;

export default Footer;
export type { FooterProps };
