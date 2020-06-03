import React, { useState, useEffect } from 'react';
import axios from 'axios';
//https://akademija.teltonika.lt/api1/

function EditCountry({setNeedsEdit, setNeedsUpdate, editID}) {
    const [name, setName] = useState(''); 
    const [area, setArea] = useState(0); 
    const [population, setPopulation] = useState(0);
    const [calling_code, setCalling_code] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
            `https://akademija.teltonika.lt/api1/countries/${editID}`,
            );
            setName(result.data.name); setArea(result.data.area); setPopulation(result.data.population); setCalling_code(result.data.calling_code);
        };
        fetchData();
      }, []);

    const newCountry = (name, area, population, calling_code) => {
        let country = {
            name: name,
            area: area,
            population: population,
            calling_code: calling_code
        }
        return country;
    }

    const handleEditSubmit = () => {
        const putData = async () => {
            const result = await axios.put(
            `https://akademija.teltonika.lt/api1/countries/${editID}`, newCountry(name,area,population,calling_code)
            );
  
            console.log(result.data.message);
        };
       
        putData().then(setNeedsEdit(false)).then(setNeedsUpdate(true));
    }
    return (
        <div className="all-screen__whiteBackground">
            <div className="all-screen__whiteBackground__addCountry rectangle">
                <div className="all-screen__whiteBackground__addCountry__title">
                    PRIDĖTI ŠALĮ
                </div>

                <fieldset className="all-screen__whiteBackground__addCountry__field">
                    <legend className="all-screen__whiteBackground__addCountry__field__legend">Pavadinimas</legend>
                    <input className="all-screen__whiteBackground__addCountry__field__input" type="text" value={name} onChange={ (e) => setName(e.target.value)}/>
                </fieldset>
                <fieldset className="all-screen__whiteBackground__addCountry__field">
                    <legend className="all-screen__whiteBackground__addCountry__field__legend">Užimamas plotas</legend>
                    <input className="all-screen__whiteBackground__addCountry__field__input" type="text" value={area} onChange={ (e) => setArea(e.target.value)}/>
                </fieldset>
                <fieldset className="all-screen__whiteBackground__addCountry__field">
                    <legend className="all-screen__whiteBackground__addCountry__field__legend">Gyventojų skaičius</legend>
                    <input className="all-screen__whiteBackground__addCountry__field__input" type="text" value={population} onChange={ (e) => setPopulation(e.target.value)}/>
                </fieldset>
                <fieldset className="all-screen__whiteBackground__addCountry__field">
                    <legend className="all-screen__whiteBackground__addCountry__field__legend">Šalies Tel. kodas</legend>
                    <input className="all-screen__whiteBackground__addCountry__field__input" type="text" value={calling_code} onChange={ (e) => setCalling_code(e.target.value)}/>
                </fieldset>

                <a className="all-screen__whiteBackground__addCountry__submit rectangle" onClick={handleEditSubmit}>
                    <div className="all-screen__whiteBackground__addCountry__submit__text">
                        Saugoti
                    </div>
                </a>
            </div>
        </div>
    );

    }
export default EditCountry;