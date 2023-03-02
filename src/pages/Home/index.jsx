import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TourCard from "../../components/TourCard";
import style from "./home.module.css";
import SearchInput from "./SearchInput";
import Men from '../../assets/home/men.png'
import CarouselHome from "./CarouselHome";


export default function Home() {
  const state = useSelector((state) => state);
  const { products } = state.shopping;

  return (
    <div className="Home">
      <header className={style.background}>
        <div className={style.titleContainer}>
          <p>Conheça o</p>
          <span>RIO</span>
          <p>com nossos</p>
          <span>Roteiros</span>
        </div>
        <div className={style.creativeContainer}>
          <img src={Men} alt="Criatvo Homem Rasgando a Tela" />
        </div>
      </header>
      <section className={style.searchInputContainer}>
        <SearchInput />
      </section>
      <section className={style.servicesContainer}>
        <h3>Passeios mais <span>Populares</span></h3>
        <div className={style.servicesSlider}>
          
        </div>
        <CarouselHome setClass={style.servicesSlider} 
          children={products.slice(1,10).map((tour) => (
            <TourCard 
              key={tour.id}
              id={tour.id} 
              title={tour.name} 
              location={tour.located} 
              price={tour.price} 
              image={tour.imagens[0]}
              />
            ))
          }/>
        <h3>Passeios em <span>Nome da Região</span></h3>
        <div className={style.servicesColumns}>
          {products.map((tour) => (
            <TourCard 
              key={tour.id} 
              id={tour.id} 
              title={tour.name} 
              location={tour.located} 
              price={tour.price} 
              image={tour.imagens[0]}
              />
            ))
          }
        </div>
      </section>
    </div>
  );
}
