import React, { useContext, useEffect } from "react";
import style from"./services.module.css"; 
import { NavBarContext } from "../../context/NavBarContext";

function ServicePage(){
  const { setBgColor } = useContext(NavBarContext);

  useEffect(() => {
    // para subir a ao topo após renderizar a página
    window.scrollTo(0, 0);
    // para alterar cor do background de acordo com a página
    setBgColor(true);
  }, []);

    return(
        <div className={style.servPage}>
            <header className={style.fundoPage}>
                <div className={style.contaIner}>
                    <section className={style.banNer}>
                        <div className={style.bannerText}>
                            <p>Confira os Serviços que preparamos especialmente para você!</p>
                            <a href="" className={style.btnLink}>Central de Atendimento</a>
                        </div>
                    </section>
                </div>
            </header>
            {/*Primeira sessão wwhite*/}
            <section className={style.guiaBranco}>
                <div className={style.guiaContainer}>
                    <div className="guiaTexto">
                        <h3>Guias Turisticos</h3>
                            <p>
                            Possuímos profissionais treinados e qualificados para acompanhar a sua viagem e 
                            transformar seu passeio na melhor experiência possível, digno de uma memória inesquecível.
                            </p>
                            <a className={style.btnBlue} href="">Saiba Mais.</a>
                    </div>
                    <div className={style.brancoImage}>
                        <img src="https://www.vidadeturista.com/wp-content/uploads/2016/05/guia-de-turismo-profissao.jpg" alt="" />
                    </div>
                </div>
            </section>
            {/* fim da sessão*/}
            {/*Primeira sessão Blue*/}
            <section className={style.guiaTuristico}>
                <div className={style.guiaContainer}>
                <div className={style.guiaImage}>
                         <img src="https://www.melhoresdestinos.com.br/wp-content/uploads/2021/07/melhores-restaurantes-mundo-2021-capa.jpg"walt="" />
                    </div>
                    <div className="guiaText">
                        <h3>Melhores Restaurantes</h3>
                            <p> 
                                Em nossos passeios com parada para almoço, 
                                você irá desfrutar do melhor da culinária carioca nos melhores restaurantes que o rio pode oferecer, prepare seu paladar.
                            </p>
                            <a className={style.btnGuia} href="">Saiba Mais.</a>
                    </div>
                </div>
            </section>
            {/*fim segunda sessão*/}
            {/* Segunda sessão White*/}
            <section className={style.guiaBranco}>
                <div className={style.guiaContainer}>
                    <div className="guiaTexto">
                        <h3>Trânsporte</h3>
                            <p> A Nossa frota possui veículos novos, confortáveis , 
                                totalmente legalizados e seguros . Nossos motoristas são treinados e capacitados. Buscamos você em seu hotel.
                            </p>
                            <a className={style.btnBlue} href="">Saiba Mais.</a>
                    </div>
                    <div className={style.brancoImage}>
                        <img src="https://www.otempo.com.br/image/contentid/policy:1.2765706:1668340122/frota-5-jpg.jpg?f=3x2&w=1224" alt="" />
                    </div>
                </div>
            </section>
            {/*fim sessão*/}
            {/*segunda sessão Blue*/}
            <section className={style.guiaTuristico}>
                <div className={style.guiaContainer}>
                <div className={style.guiaImage}>
                        <img src="https://www.ilhagrande.com.br/wp-content/uploads/2015/06/passeio-barco-lopes-mendes-ilha-grande-41.jpg" alt="" />
                    </div>
                    <div className="guiaText">
                        <h3>Passeios de Barcos</h3>
                            <p> Trabalhamos com as melhores agências
                                de turismo marinho com escunas 100% seguras e com manutenção rigorosamente rígida 
                                para seu maior conforto e segurança.
                            </p>
                            <a className={style.btnGuia} href="">Saiba Mais.</a>
                    </div>
                </div>
            </section>
            {/*fim da quarta sessão*/}
        </div>
    )
}

export default ServicePage