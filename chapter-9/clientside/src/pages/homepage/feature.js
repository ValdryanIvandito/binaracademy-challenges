import React from "react";
import "../../styles/feature.css";
import Image1 from "../../assets/images/rock-paper-scissor.jpg";
import coinHeadsImg from '../../assets/images/coin.jpg';
import dadu from '../../assets/images/dadu.jpg';

export default function Features() {
  const items = [
    {
      title: "Rock Paper Scissor",
      description: "Game Bantung Gunting Kertas melawan computer",
      backgroundImage: Image1,
    },
    {
      title: "Head or Tails",
      description: "Mencoba menebak hasil dari lemparan coin",
      backgroundImage: coinHeadsImg,
    },
    {
      title: "Game Dadu",
      description: "Permainan lempar dadu melawan komputer",
      backgroundImage: dadu,
    },
  ];

  const fontSize = { fontSize: '16px' }

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 FeaturePage-img">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4 feature-title">
              Game List 
            </h2>
            <p className="text-xl feature-description">
              Berbagai permainan yang bisa anda mainkan di website kami
            </p>
          </div>

          {/* Items */}
          <div className="mderw-sm mx-auto flex flex-wrap gap-8 md:max-w-2xl lg:max-w-none">
            {items.map((item, index) => (
              <div
                key={index}
                className="rectangle-item"
                style={{ backgroundImage: `url(${item.backgroundImage})` }}
                data-aos="fade-up"
              >
                <div className="rectangle-item-content">
                  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  </svg>
                  <h2 className="h4 mb-2">{item.title}</h2>
                  <p style={fontSize}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
