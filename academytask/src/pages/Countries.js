import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCountry from './AddCountry';
import EditCountry from './EditCountry';
import Paginate from './Paginate';
import addButton from '../images/addButton.png';
import searchButton from '../images/searchButton.png';
import trashButton from '../images/trash.png';
import editButton from '../images/edit.png';
import topArrow from '../images/topArrow.png';
import downArrow from '../images/downArrow.png';
//https://akademija.teltonika.lt/api1/

function Countries() {
    const [countries, setCountries] = useState([]);
    const [needsUpdate, setNeedsUpdate] = useState(false);
    const [needsAdd, setNeedsAdd] = useState(false);
    const [needsEdit, setNeedsEdit] = useState(false);
    const [editID, setEditID] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [orderBy, setOrderBy] = useState('desc');

    useEffect(() => {
        let counter = 0;
        const fetchData = async () => {
          const result = await axios.get(
            `https://akademija.teltonika.lt/api1/countries?page=${currentPage}&order=${orderBy}&text=${searchText}`,
          );

          setCountries([...result.data.countires]);
        };

        const fetchMoreData = async () => {
            let moreResult;
            let update = true;
            while (await update) {
                moreResult = await axios.get(
                    `https://akademija.teltonika.lt/api1/countries?page=${counter + 1}&text=${searchText}`,
                );
                if (await moreResult.data.count > 0) {
                    counter += 1;
                } else {
                    update = false;
                }
            }
            setPageCount(counter);
        };
        fetchData()
        setNeedsUpdate(false);
        fetchMoreData();
    }, [needsUpdate]);

    const handleRedirect = () => {
        
    }

    const handleDelete = (id) => {
        const fetchData = async () => {
            const result = await axios.delete(
            `https://akademija.teltonika.lt/api1/countries/${id}`,
            );
            console.log(result.data.message);
        };
       
        fetchData().then(setNeedsUpdate(true));
    }

    const nextPage = (nr) => {
        setCurrentPage(nr);
        setNeedsUpdate(true);
    }
    
    return (
        <div className="Page">

            <div className="Page__intro flex-row">
                <div className="Page__intro__title">
                    Šalys
                </div>  
                <a className="Page__intro__add" onClick={ () => { setNeedsAdd(true) } }>
                    <img src={addButton} alt="Add Button" className="add-button"/>
                </a>
            </div>
            {
                needsAdd && 
                    <AddCountry setNeedsAdd={() => setNeedsAdd(false)} setNeedsUpdate={() => setNeedsUpdate(true)} />                    
            }
            {
                needsEdit && 
                    <EditCountry setNeedsEdit={() => setNeedsEdit(false)} setNeedsUpdate={() => setNeedsUpdate(true)} editID={editID}/>
            }
            <div className="Page__SearchNav flex-row">
                <div className="Page__SearchNav__inputWrapper flex-row rectangle">
                    <input className="Page__SearchNav__inputWrapper__input" type="text" value={searchText} onChange={ (e) => setSearchText(e.target.value) }/>
                    <a className="Page__SearchNav__inputWrapper__search" onClick={ () => { setNeedsUpdate(true) } }>
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
                    <div className="Page__CountriesContainer__row__text first colTitle flex-row">
                        pavadinimas
                        <div className="Page__CountriesContainer__row__text__orderButtons flex-column">
                            <a className={`Page__CountriesContainer__row__text__orderButtons__arrow ${orderBy === 'asc' ? 'active' : ''}`} onClick={ () => { setOrderBy('asc'); setNeedsUpdate(true); } }>
                                <img src={topArrow} alt="left arrow" className="Page__CountriesContainer__row__text__orderButtons__arrow__button"/>
                            </a>
                            <a className={`Page__CountriesContainer__row__text__orderButtons__arrow ${orderBy === 'desc' ? 'active' : ''}`} onClick={ () => { setOrderBy('desc'); setNeedsUpdate(true); } }>
                                <img src={downArrow} alt="left arrow" className="Page__CountriesContainer__row__text__orderButtons__arrow__button"/>
                            </a>
                        </div>
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
                                    <a className="Page__CountriesContainer__row__options__item" onClick={ () => { setEditID(country.id); setNeedsEdit(true); } }>
                                        <img src={editButton} alt="edit Button"/>
                                    </a>     
                                </p>
                            </div>
                        );
                    })
                }
            </div>
            <Paginate currentPage={currentPage} nextPage={nextPage} pageCount={pageCount}/>
        </div>
        );
    }
export default Countries;