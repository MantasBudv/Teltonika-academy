import React, { useState, useEffect } from 'react';
import axios from 'axios';
import addButton from '../images/addButton.png';
import searchButton from '../images/searchButton.png';
import trashButton from '../images/trash.png';
import editButton from '../images/edit.png';
//https://akademija.teltonika.lt/api1/

function Countries() {
    const [countries, setCountries] = useState([]);
    const [needsUpdate, setNeedsUpdate] = useState(true);
    const [needsAdd, setNeedsAdd] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
          const result = await axios.get(
            `https://akademija.teltonika.lt/api1/countries`,
          );

          setCountries([...result.data.countires]);
        };
     
        fetchData();
        setNeedsUpdate(false);
      }, [needsUpdate]);

    const handleRedirect = () => {
        
    }
    const handleAdd = () => {
        console.log("Background is white");
        return (
            <div className="all-screen__whiteBackground">
                <div className="all-screen__whiteBackground__addCountry rectangle">
                    <div className="all-screen__whiteBackground__addCountry__title">
                        PRIDĖTI ŠALĮ
                    </div>

                    <fieldset className="all-screen__whiteBackground__addCountry__field">
                        <legend className="all-screen__whiteBackground__addCountry__field__legend">Pavadinimas</legend>
                        <input className="all-screen__whiteBackground__addCountry__field__input" type="text"/>
                    </fieldset>
                    <fieldset className="all-screen__whiteBackground__addCountry__field">
                        <legend className="all-screen__whiteBackground__addCountry__field__legend">Užimamas plotas</legend>
                        <input className="all-screen__whiteBackground__addCountry__field__input" type="text"/>
                    </fieldset>
                    <fieldset className="all-screen__whiteBackground__addCountry__field">
                        <legend className="all-screen__whiteBackground__addCountry__field__legend">Gyventojų skaičius</legend>
                        <input className="all-screen__whiteBackground__addCountry__field__input" type="text"/>
                    </fieldset>
                    <fieldset className="all-screen__whiteBackground__addCountry__field">
                        <legend className="all-screen__whiteBackground__addCountry__field__legend">Šalies Tel. kodas</legend>
                        <input className="all-screen__whiteBackground__addCountry__field__input" type="text"/>
                    </fieldset>

                    <a className="all-screen__whiteBackground__addCountry__submit rectangle" onClick={ () => { handleSubmit() } }>
                        <div className="all-screen__whiteBackground__addCountry__submit__text">
                            Saugoti
                        </div>
                    </a>  
                </div>
            </div>
        );
    }
    const handleSubmit = () => {

    }
    const handleDelete = (id) => {
        const fetchData = async () => {
            const result = await axios.delete(
            `https://akademija.teltonika.lt/api1/countries/${id}`,
            );
  
            console.log(result.data.message);
        };
       
        fetchData();
    }
    const handleEdit = () => {
        
    }


    return (
        <div className="Page">

            <div className="Page__intro flex-row">
                <div className="Page__intro__title">
                    Šalys
                </div>  
                <a className="Page__intro__add" onClick={ () => { setNeedsAdd(true) } }>
                    <img src={addButton} alt="Logo" className="add-button"/>
                </a>
            </div>
            {
                needsAdd && 
                    handleAdd()
            }

            <div className="Page__SearchNav flex-row">
                <div className="Page__SearchNav__inputWrapper flex-row rectangle">
                    <input className="Page__SearchNav__inputWrapper__input" type="text"/>
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
                {
                    countries.map((country) => {
                        return (
                            <div className="Page__CountriesContainer__row flex-row" key={country.id}>
                                <p className="Page__CountriesContainer__row__text first">
                                    {country.name}
                                </p>
                                <p className="Page__CountriesContainer__row__text">
                                    {country.area}
                                </p>
                                <p className="Page__CountriesContainer__row__text">
                                    {country.population}
                                </p>
                                <p className="Page__CountriesContainer__row__text">
                                    {country.calling_code}
                                </p>
                                <p className="Page__CountriesContainer__row__options last flex-row">
                                    <a className="Page__CountriesContainer__row__options__item" onClick={ () => { handleDelete(country.id) } }>
                                        <img src={trashButton} alt="trash Button"/>
                                    </a>
                                    <a className="Page__CountriesContainer__row__options__item" onClick={ () => { handleEdit(country.id) } }>
                                        <img src={editButton} alt="edit Button"/>
                                    </a>     
                                </p>
                            </div>
                        );
                    })
                }
            </div>
        </div>
        );
    }
export default Countries;