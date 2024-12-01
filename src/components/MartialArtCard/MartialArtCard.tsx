import cls from "./MartialArtCard.module.scss";

export const MartialArtCard = () => {
  return (
    <div className={cls.flipCard}>
      <div className={cls.flipCardInner}>
        <div className={cls.flipCardFront}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi laboriosam aliquid omnis, odit dolores, fuga inventore sed sunt quia excepturi ducimus aperiam, ratione sequi praesentium exercitationem officia quis? Voluptate, suscipit.
        </div>
        <div className={cls.flipCardBack}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, impedit.</div>
      </div>
    </div>
  );
};
