import React, { useState, useEffect } from 'react';
import axios from 'axios';
//https://akademija.teltonika.lt/api1/

function AddCountry({setNeedsAdd, setNeedsUpdate, setIsDatesAdded}) {
    const [name, setName] = useState(''); 
    const [area, setArea] = useState(0); 
    const [population, setPopulation] = useState(0);
    const [calling_code, setCalling_code] = useState('');

    const handleAddSubmit = () => {
        let caught = false;
        const postData = async () => {
            const result = await axios.post(
            `https://akademija.teltonika.lt/api1/countries`, newCountry(name,area,population,calling_code)
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

    const newCountry = (name, area, population, calling_code) => {
        let country = {
            name: name,
            area: area,
            population: population,
            calling_code: calling_code
        }
        return country;
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
                    <legend className="all-screen__whiteBackground__addCountry__field__legend">Šalies Tel. kodas</legend>
                    <input className="all-screen__whiteBackground__addCountry__field__input" type="text" onChange={ (e) => setCalling_code(e.target.value)}/>
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
export default AddCountry;