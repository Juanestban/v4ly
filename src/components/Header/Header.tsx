import { FC, DetailedHTMLProps, HTMLAttributes, forwardRef } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import { ROUTES } from '@v4ly/config/constants';

import s from './Header.module.css';

interface HeaderProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'children'> {
  //
}

const Header = forwardRef<HTMLDivElement, HeaderProps>(({ className, ...props }, ref) => {
  return (
    <header ref={ref} className={cn(s.container, className)} {...props}>
      <div className={s.wrapper}>
        <div className={s.wrapText}>
          <h1>v4ly</h1>
        </div>
        <nav className={s.nav}>
          <ul className={s.ul}>
            {ROUTES.map(({ title, link }) => (
              <li key={link}>
                <Link to={link}>{title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}) as FC<HeaderProps>;

export default Header;
export type { HeaderProps };
