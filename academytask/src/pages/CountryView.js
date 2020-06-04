import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import AddCity from './AddCity';
import EditCity from './EditCity';
import Paginate from './Paginate';
import addButton from '../images/addButton.png';
import searchButton from '../images/searchButton.png';
import trashButton from '../images/trash.png';
import editButton from '../images/edit.png';
import topArrow from '../images/topArrow.png';
import downArrow from '../images/downArrow.png';
//https://akademija.teltonika.lt/api1/

function CountryView( {history, countryID, countryName} ) {
    const [cities, setCities] = useState([]);
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
            `https://akademija.teltonika.lt/api1/cities/${countryID}?page=${currentPage}&order=${orderBy}${searchText !== '' ? '&text=' + searchText : ''}${dateFilter !== 'DATE FILTER' ? '&date=' + dateFilter : ''}`,
          );
          setCities(result.data);
        };
        // counts pageCount and all possible dates
        let counter = 0;
        let dates = [];
        const fetchMoreData = async () => {
            let moreResult;
            let update = true;
            while (update) {
                moreResult = await axios.get(
                    `https://akademija.teltonika.lt/api1/cities/${countryID}?page=${counter + 1}&order=${orderBy}${searchText !== '' ? '&text=' + searchText : ''}${dateFilter !== 'DATE FILTER' ? '&date=' + dateFilter : ''}`,
                );
                // gets all possible creation dates
                if (isDatesAdded === false) {
                    // eslint-disable-next-line no-loop-func
                    moreResult.data.forEach((city) => {
                        let date = city.created_at;
                        date = date.substr(0, date.indexOf(' '));
                        if (dates.includes(date) === false) {
                            dates.push(date);
                        }
                    });
                }
                //---------------------------------
                // counts pages
                if (await moreResult.data.length > 0) {
                    counter += 1;
                } else {
                    update = false;
                }
                //---------------------------------
            }
            setPageCount(counter);
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

    const handleRedirect = (page) => {
        history.push(page);
    }

    const handleDelete = (id) => {
        let caught = false;
        const fetchData = async () => {
            const result = await axios.delete(
            `https://akademija.teltonika.lt/api1/cities/${id}`,
            ).catch((e) => {alert("Country was not added, check if table is filled correctly."); caught = true;});
            if(caught === false && await result.status === 200) {
                alert(result.data.message);

                const moreResult = await axios.get(
                    `https://akademija.teltonika.lt/api1/cities/${countryID}?page=${currentPage}&order=${orderBy}${searchText !== '' ? '&text=' + searchText : ''}${dateFilter !== 'DATE FILTER' ? '&date=' + dateFilter : ''}`,
                );
                if (moreResult.data.length === 0) {
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

    const nextPage = (nr) => {
        setCurrentPage(nr);
        setNeedsUpdate(true);
    }
    
    return (
        <div className="Page">
            <div className="Page__intro flex-row">
                <div className="Page__intro__title">
                    {countryName}
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
                        miesto pašto KODAS
                    </div>
                    <div className="Page__CountriesContainer__row__text last colTitle">
                        EDIT
                    </div>
                </div>
                {
                    cities.map((city) => {
                        return (
                            <div className="Page__CountriesContainer__row flex-row" key={city.id}>
                                <p className="Page__CountriesContainer__row__text first">
                                    {city.name}
                                </p>
                                <p className="Page__CountriesContainer__row__text">
                                    {city.area}
                                </p>
                                <p className="Page__CountriesContainer__row__text">
                                    {city.population}
                                </p>
                                <p className="Page__CountriesContainer__row__text">
                                    {city.postcode}
                                </p>
                                <p className="Page__CountriesContainer__row__options last flex-row">
                                    <a className="Page__CountriesContainer__row__options__item" onClick={ () => { handleDelete(city.id) } }>
                                        <img src={trashButton} alt="trash Button"/>
                                    </a>
                                    <a className="Page__CountriesContainer__row__options__item" onClick={ () => { setEditID(city.id); setNeedsEdit(true); } }>
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
                    <AddCity setNeedsAdd={() => setNeedsAdd(false)} setNeedsUpdate={() => setNeedsUpdate(true)} setIsDatesAdded={() => setIsDatesAdded(false)} countryID={countryID} />                    
            }
            {
                needsEdit && 
                    <EditCity setNeedsEdit={() => setNeedsEdit(false)} setNeedsUpdate={() => setNeedsUpdate(true)} editID={editID} countryID={countryID}/>
            }
            <Paginate currentPage={currentPage} nextPage={nextPage} pageCount={pageCount}/>
        </div>
        );
    }
export default withRouter(CountryView);