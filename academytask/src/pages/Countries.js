import React from 'react';
import addButton from '../images/addButton.png';
import searchButton from '../images/searchButton.png';

function Header() {

    const handleRedirect = () => {
        
    }

    return (
        <div className="Page">

            <div className="Page__intro flex-row">
                <div className="Page__intro__title">
                    Šalys
                </div>  
                <a className="Page__intro__add" onClick={ () => { handleRedirect('/') } }>
                    <img src={addButton} alt="Logo" className="add-button"/>
                </a>
            </div>

            <div className="Page__SearchNav flex-row">
                <div className="Page__SearchNav__inputWrapper flex-row rectangle">
                    <input className="Page__SearchNav__inputWrapper__input" type="text" placeholder="Search.."/>
                    <a className="Page__SearchNav__inputWrapper__search" onClick={ () => { handleRedirect('/') } }>
                        <img src={searchButton} alt="search Button" className="search-button"/>
                    </a>
                </div>
                <div className="Page__SearchNav__selectWrap rectangle">
                    <select className="Page__SearchNav__selectWrap__select" name="date">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
                
            </div>

            <div className="Page__CountriesContainer rectangle">
                <div className="Page__CountriesContainer__row flex-row noTop">
                    <div className="Page__CountriesContainer__row__text first colTitle">
                        pavadinimas
                    </div>
                    <div className="Page__CountriesContainer__row__text colTitle">
                        UŽIMAMAS PLOTAS
                    </div>
                    <div className="Page__CountriesContainer__row__text colTitle">
                        GYVENTOJŲ SKAIČIUS
                    </div>
                    <div className="Page__CountriesContainer__row__text colTitle">
                        šALIES TEL. KODAS
                    </div>
                    <div className="Page__CountriesContainer__row__text last colTitle">
                        veiksmai
                    </div>
                </div>
                <div className="Page__CountriesContainer__row flex-row">
                    <p className="Page__CountriesContainer__row__text first">
                        pavadinimas
                    </p>
                    <p className="Page__CountriesContainer__row__text">
                        UŽIMAMAS PLOTAS
                    </p>
                    <p className="Page__CountriesContainer__row__text">
                        GYVENTOJŲ SKAIČIUS
                    </p>
                    <p className="Page__CountriesContainer__row__text">
                        šALIES TEL. KODAS
                    </p>
                    <p className="Page__CountriesContainer__row__options last flex-row">
                        <a className="Page__CountriesContainer__row__options__item right-border" onClick={ () => { handleRedirect('/') } }>
                            <img src={searchButton} alt="search Button" className="search-button"/>
                        </a>
                        <a className="Page__CountriesContainer__row__options__item" onClick={ () => { handleRedirect('/') } }>
                            <img src={searchButton} alt="search Button" className="search-button"/>
                        </a>     
                    </p>
                </div>
            </div>

        </div>
        );
    }

export default Header;