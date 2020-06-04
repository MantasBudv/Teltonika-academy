import React, { useState, useEffect } from 'react';
import axios from 'axios';
//https://akademija.teltonika.lt/api1/

function EditCity({setNeedsEdit, setNeedsUpdate, editID, countryID}) {
    const [name, setName] = useState(''); 
    const [area, setArea] = useState(0); 
    const [population, setPopulation] = useState(0);
    const [postcode, setPostcode] = useState('');

    useEffect(() => {
        let counter = 0;
        const fetchData = async () => {
            let update = true;
            while (update) {
                const result = await axios.get(
                    `https://akademija.teltonika.lt/api1/cities/${countryID}?page=${counter + 1}`,
                );
                // eslint-disable-next-line no-loop-func
                result.data.forEach( (e) => {
                    if (e.id === editID) {
                        setName(e.name); setArea(e.area); setPopulation(e.population); setPostcode(e.postcode);
                        update = false;
                    }
                });
                counter++;
            }
        };
        fetchData();
      }, []);

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

    const handleEditSubmit = () => {
        let caught = false;
        const putData = async () => {
            const result = await axios.put(
            `https://akademija.teltonika.lt/api1/cities/${editID}`, newCity(name,area,population,postcode)
            ).catch((e) => {alert("Country was not added, check if table is filled correctly."); caught = true;});
  
            if(caught === false && await result.status === 200) {
                alert(result.data.message);
                setNeedsEdit(false);
                setNeedsUpdate(true);
            }
        };
        putData();
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
                    <legend className="all-screen__whiteBackground__addCountry__field__legend">Miesto pašto kodas</legend>
                    <input className="all-screen__whiteBackground__addCountry__field__input" type="text" value={postcode} onChange={ (e) => setPostcode(e.target.value)}/>
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
export default EditCity;