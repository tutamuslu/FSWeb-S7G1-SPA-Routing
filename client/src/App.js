import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilmListesi from './Filmler/FilmListesi';
import Film from './Filmler/Film';
import { Route, Switch } from 'react-router-dom';

import KaydedilenlerListesi from './Filmler/KaydedilenlerListesi';

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get('http://localhost:5001/api/filmler') // Burayı Postman'le çalışın
        .then(response => {
          // Bu kısmı log statementlarıyla çalışın
          // ve burdan gelen response'u 'movieList' e aktarın
          setMovieList(response.data)
          console.log(response);

        })
        .catch(error => {
          console.error('Sunucu Hatası', error);
        });
    }
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = (film) => {
    console.log("kaydedidenler", saved)
    const varMi = saved.find(x => x.id == film.id)
    console.log(film);
    if (varMi == null){
      setSaved([...saved, film])
      console.log("ada")
    }
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
  };

  return (
    <div>
      <KaydedilenlerListesi list={saved} />
      <Switch>
        <Route exact path="/">
          <FilmListesi movies={movieList} />
        </Route>
        <Route path="/filmler/:id">
          <Film KaydedilenlerListesineEkle = {KaydedilenlerListesineEkle}/>
        </Route>
      </Switch>
    </div>
  );
}
