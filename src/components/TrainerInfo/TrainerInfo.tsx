import React from 'react';
import cls from './TrainerInfo.module.scss';

export const TrainerInfo = () => {
  return (
    <div className={cls.trainerInfo}>
      <div className={cls.services}>
        <div className={cls.serviceItem}>
          <span className={cls.icon}>★</span> Групповые тренировки
        </div>
        <div className={cls.serviceItem}>
          <span className={cls.icon}>★</span> Индивидуальные тренировки
        </div>
      </div>
      <p className={cls.description}>
        Гарантую результат та задоволення від тренувального процесу. На наших тренуваннях ти зможеш удосконалити свої фізичні якості, покращити зовнішній вигляд та стан здоров'я.
      </p>

      <div className={cls.description}>
        <span className={cls.icon}>🎓</span> Переяслав-Хмельницький державний педагогічний університет імені Григорія Сковороди. Дипломований спеціаліст в галузі фізичного виховання і спорту.
      </div>

      <div className={cls.description}>
        <span className={cls.icon}>🏆</span> Призер змагань з гирьового спорту.
      </div>

      <div className={cls.description}>
        <span className={cls.icon}>💪</span> Тренуйся сильніше. Не здавайся там, де здаються інші. І переможеш там, де не можна перемогти.
      </div>
    </div>
  );
};

