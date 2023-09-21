import React from "react";
import styles from "../styles/feature.module.css";

const Features = () => {
  const items = [
    {
      title: "Rock Paper Scissors",
      description: "Game Bantung Gunting Kertas melawan computer",
      backgroundImage: '/images/rock-paper-scissor.jpg',
    },
    {
      title: "Head or Tails",
      description: "Mencoba menebak hasil dari lemparan coin",
      backgroundImage: '/images/coin.jpg',
    },
    {
      title: "Game Dadu",
      description: "Permainan lempar dadu melawan komputer",
      backgroundImage: '/images/dadu.jpg',
    },
  ];

  return (
    <section>
      <div className={styles.FeaturePageImage}>
        <div className={`py-12 md:py-20`}>
          {/* Section header */}
          <div className={`${styles["max-w-3xl"]} mx-auto text-center pb-12 md:pb-20`}>
            <h2 className={styles.featureTitle}>
              Game List
            </h2>
            <p className={styles.featureDescription}>
              Berbagai permainan yang bisa anda mainkan di website kami
            </p>
          </div>

          {/* Items */}
          <div className={styles.mderwSm}>
            {items.map((item, index) => (
              <div
                key={index}
                className={styles.rectangleItem}
                style={{ backgroundImage: `url(${item.backgroundImage})` }}
                data-aos="fade-up"
              >
                <div className={styles.rectangleItemContent}>
                  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    {/* Add SVG content here if needed */}
                  </svg>
                  <h2 className={`h4 mb-2`}>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
