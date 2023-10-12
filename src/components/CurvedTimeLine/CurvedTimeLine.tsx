import { FC } from 'react';
import { CurvedTimeLineProps } from './CurvedTimeLine.types';

import s from './CurvedTimeLine.module.css';

const CurvedTimeLine: FC<CurvedTimeLineProps> = ({ messages = 3 }) => {
  return (
    <div className={s.timeline}>
      <div className={s.outer}>
        {Array.from({ length: messages }).map((_, index) => (
          <div key={index} className={s.card}>
            <div className={s.info}>
              <h3 className={s.title}>Title {index + 1}</h3>
              <p className={s.text}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur ipsum, nihil
                sequi ad atque temporibus accusantium accusamus deleniti unde officiis, officia sunt
                at vitae beatae voluptate doloremque cumque, corporis debitis?
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurvedTimeLine;
