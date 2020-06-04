import React, { useState, useEffect } from 'react';
import axios from 'axios';
//https://akademija.teltonika.lt/api1/

function AddCity({setNeedsAdd, setNeedsUpdate, setIsDatesAdded, countryID}) {
    const [name, setName] = useState(''); 
    const [area, setArea] = useState(0); 
    const [population, setPopulation] = useState(0);
    const [postcode, setPostcode] = useState('');

    const handleAddSubmit = () => {
        let caught = false;
        const postData = async () => {
            const result = await axios.post(
            `https://akademija.teltonika.lt/api1/cities`, newCity(name,area,population,postcode)
            ).catch((e) => {alert("Country was not added, check if table is filled correctly."); caught = true;});
            if(caught === false && await result.status === 200) {
                alert(result.data.message);
                setNeedsAdd(false);
                setNeedsUpdate(true);
                setIsDatesAdded(false);
            }
        };
        postData();
    }

    const newCity = (name, area, population, postcode) => {
        let city = {
            name: name,
            area: area,
            population: population,
            postcode: postcode,
            country_id: countryID
        }
        return city;
    }
    return (
        <div className="all-screen__whiteBackground">
            <div className="all-screen__whiteBackground__addCountry rectangle">
                <div className="all-screen__whiteBackground__addCountry__title">
                    PRIDĖTI ŠALĮ
                </div>

                <fieldset className="all-screen__whiteBackground__addCountry__field">
                    <legend className="all-screen__whiteBackground__addCountry__field__legend">Pavadinimas</legend>
                    <input className="all-screen__whiteBackground__addCountry__field__input" type="text" onChange={ (e) => setName(e.target.value)} required/>
                </fieldset>
                <fieldset className="all-screen__whiteBackground__addCountry__field">
                    <legend className="all-screen__whiteBackground__addCountry__field__legend">Užimamas plotas</legend>
                    <input className="all-screen__whiteBackground__addCountry__field__input" type="text" onChange={ (e) => setArea(e.target.value)}/>
                </fieldset>
                <fieldset className="all-screen__whiteBackground__addCountry__field">
                    <legend className="all-screen__whiteBackground__addCountry__field__legend">Gyventojų skaičius</legend>
                    <input className="all-screen__whiteBackground__addCountry__field__input" type="text" onChange={ (e) => setPopulation(e.target.value)}/>
                </fieldset>
                <fieldset className="all-screen__whiteBackground__addCountry__field">
                    <legend className="all-screen__whiteBackground__addCountry__field__legend">Miesto pašto kodas</legend>
                    <input className="all-screen__whiteBackground__addCountry__field__input" type="text" onChange={ (e) => setPostcode(e.target.value)}/>
                </fieldset>

                <a className="all-screen__whiteBackground__addCountry__submit rectangle" onClick={handleAddSubmit}>
                    <div className="all-screen__whiteBackground__addCountry__submit__text">
                        Saugoti
                    </div>
                </a>
            </div>
        </div>
    );
    }
export default AddCity;