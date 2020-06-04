import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import AddCountry from './AddCountry';
import EditCountry from './EditCountry';
import Paginate from '../Paginate';
import addButton from '../../images/addButton.png';
import searchButton from '../../images/searchButton.png';
import trashButton from '../../images/trash.png';
import editButton from '../../images/edit.png';
import topArrow from '../../images/topArrow.png';
import downArrow from '../../images/downArrow.png';
//https://akademija.teltonika.lt/api1/

function Countries( {history, countryToView} ) {
    const [countries, setCountries] = useState([]);
    const [creationDates, setCreationDates] = useState([]);
    const [isDatesAdded, setIsDatesAdded] = useState(false);
    const [needsUpdate, setNeedsUpdate] = useState(false);
    const [needsAdd, setNeedsAdd] = useState(false);
    const [needsEdit, setNeedsEdit] = useState(false);
    const [editID, setEditID] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTextNotConfirmed, setSearchTextNotConfirmed] = useState('');
    const [searchText, setSearchText] = useState('');
    const [orderBy, setOrderBy] = useState('desc');
    const [dateFilterNotConfirmed, setDateFilterNotConfirmed] = useState('DATE FILTER');
    const [dateFilter, setDateFilter] = useState('DATE FILTER');

    useEffect(() => {
        const fetchData = async () => {
          const result = await axios.get(
            `https://akademija.teltonika.lt/api1/countries?page=${currentPage}&order=${orderBy}${searchText !== '' ? '&text=' + searchText : ''}${dateFilter !== 'DATE FILTER' ? '&date=' + dateFilter : ''}`,
          );

          setCountries([...result.data.countires]);
        };
        // counts pageCount and all possible dates
        let counter = 0;
        let dates = [];
        const fetchMoreData = async () => {
            let moreResult;
            let moreResultDates;
            let updatePages = true;
            let updateDates = true;
            while (updatePages) {
                moreResult = await axios.get(
                    `https://akademija.teltonika.lt/api1/countries?page=${counter + 1}&order=${orderBy}${searchText !== '' ? '&text=' + searchText : ''}${dateFilter !== 'DATE FILTER' ? '&date=' + dateFilter : ''}`,
                );
                // counts pages
                if (await moreResult.data.count > 0) {
                    counter += 1;
                } else {
                    updatePages = false;
                }
                //---------------------------------
            }
            setPageCount(counter);
            counter = 0;
            while (updateDates) {
                // gets all possible creation dates
                if (isDatesAdded === false) {
                    moreResultDates = await axios.get(
                        `https://akademija.teltonika.lt/api1/countries?page=${counter + 1}`,
                    );
                    // eslint-disable-next-line no-loop-func
                    [...moreResultDates.data.countires].forEach((country) => {
                        let date = country.created_at;
                        date = date.substr(0, date.indexOf(' '));
                        if (dates.includes(date) === false) {
                            dates.push(date);
                        }
                    });
                    if (await moreResultDates.data.count > 0) {
                        counter += 1;
                    } else {
                        updateDates = false;
                    }
                } else updateDates = false;
            }
            
            if (isDatesAdded === false) {
                dates = dates.sort();
                setCreationDates(dates);
                setIsDatesAdded(true);
            }
        };
        //-----------------------------
        fetchData()
        setNeedsUpdate(false);
        fetchMoreData();
    }, [needsUpdate]);

    const handleDelete = (id) => {
        let caught = false;
        const fetchData = async () => {
            const result = await axios.delete(
            `https://akademija.teltonika.lt/api1/countries/${id}`,
            ).catch((e) => {alert("Country was not added, check if table is filled correctly."); caught = true;});
            if(caught === false && await result.status === 200) {
                alert(result.data.message);

                //checks if the deleted country was last in the page, if yes resets to main page
                const moreResult = await axios.get(
                    `https://akademija.teltonika.lt/api1/countries?page=${currentPage}&order=${orderBy}${searchText !== '' ? '&text=' + searchText : ''}${dateFilter !== 'DATE FILTER' ? '&date=' + dateFilter : ''}`,
                );
                if (moreResult.data.count === 0) {
                    setCurrentPage(1);
                    setIsDatesAdded(false);
                    setDateFilter('DATE FILTER');
                    setDateFilterNotConfirmed('DATE FILTER');
                }
                setNeedsUpdate(true);
            }
        };
       
        fetchData();
    }

    const handleRedirect = (page) => {
        history.push(page);
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
                <a className="Page__intro__add" onClick={ () => { setNeedsAdd(true); } }>
                    <img src={addButton} alt="Add Button" className="add-button"/>
                </a>
            </div>

            <div className="Page__SearchNav flex-row">
                <div className="Page__SearchNav__inputWrapper flex-row rectangle">
                    <input className="Page__SearchNav__inputWrapper__input" type="text" value={searchTextNotConfirmed} onChange={ (e) => setSearchTextNotConfirmed(e.target.value) }/>
                    <a className="Page__SearchNav__inputWrapper__search" onClick={ () => {  setCurrentPage(1); setSearchText(searchTextNotConfirmed); setNeedsUpdate(true); setDateFilter(dateFilterNotConfirmed); } }>
                        <img src={searchButton} alt="search Button" className="search-button"/>
                    </a>
                </div>
                <div className="Page__SearchNav__selectWrap rectangle">
                    <select className="Page__SearchNav__selectWrap__select" onChange={ (e) => setDateFilterNotConfirmed(e.target.value) }>
                        <option className="Page__SearchNav__selectWrap__select__option" value='DATE FILTER'>DATE FILTER</option>
                        {
                            creationDates.map((date) => {
                                return (
                                    <option className="Page__SearchNav__selectWrap__select__option" key={creationDates.indexOf(date)} value={date}>{date}</option>
                                );
                            })
                        }
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
                                    <a className="Page__CountriesContainer__row__text__country" onClick={ () => { countryToView(country.id, country.name); handleRedirect("/CountryView"); } }>
                                        {country.name}
                                    </a>
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
            {
                needsAdd && 
                    <AddCountry setNeedsAdd={() => setNeedsAdd(false)} setNeedsUpdate={() => setNeedsUpdate(true)} setIsDatesAdded={() => setIsDatesAdded(false)} />                    
            }
            {
                needsEdit && 
                    <EditCountry setNeedsEdit={() => setNeedsEdit(false)} setNeedsUpdate={() => setNeedsUpdate(true)} editID={editID}/>
            }
            <Paginate currentPage={currentPage} nextPage={nextPage} pageCount={pageCount}/>
        </div>
        );
    }
export default withRouter(Countries);