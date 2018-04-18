# FS-labra2018

Full Stack - websovelluskehitys - harjoitustyön repositorio

*Front end:*
https://github.com/J0ne/FS-labra2018/tree/master/front-end/ware_app

*Back end:* 
https://github.com/J0ne/FS-labra2018/tree/master/backend


Sovellus on pieni toiminnanohjaussofta, joka on erikoistunut lainauksien hallintaan. 

### Lyhyesti:
Varastossa on n kpl erilaisia tuotteita. 
Asiakasrekisterissä on asiakkaat, jotka lainaavat tavaroita.
Lainaukset ovat siis toimenpiteitä, jotka liittyvät tuotteeseen ja asiakkaaseen.

Ohjelman käyttäjän tulee olla kirjautunut sovellukseen. (TODO)
Käyttäjä voi kirjata lainauksia asiakkaalle. Toiminnallisuus etenee seuraavasti:
1. käyttäjä valitsee asiakkaan
2. käyttäjä valitsee tuotteita ja liittää ne lainaukseen
3. käyttäjä voi muuttaa tuotteiden kappalemääriä 
4. käyttäjä valitsee palautuspäivän, jolloin tuotteen on palautettava. 
5. käyttäjän täytyy merkitä kuittaus suoritetuksi ennen lainaustapahtuman tallennusta. Tämä simuloi asiakkaan allekirjoitusta / kuittausta
6. käyttäjä tallentaa lainauksen. Näin lainaus on päätynyt aktiivisena järjestelmään.

todo: ns. aktiivisten lainauksien kuittaus...

Lainauksen tallentaminen muuttaa varastossa olevan tuotteen kappalemäärää.

Esimerkkinä ohjelman käyttökohteelle voisi olla esimerkiksi armeijan varusvarasto.

Ohjelma näyttää etusivulla listauksen lainauksista.

---

### Tuntikirjanpitoa

| pvm	| aika (h)|kommentit  |
| ------|:-------:| ---------:|
|	12.3.|  1	| aloitusta, eka commit ym												|
|	13.3.|	1	| kirjastojen asennuksia, json-server, axios, productReducer, store, ja tilan initialisointi, UI semanticin tuonti ja testailua|
|	14.3.|	2	| lukemista: GraphQL, osan 7 materiaaleja	|
|	16.3.| 	2,5 | navigaatiota, SPA-hommia,dummy-dataa, UI-komponenttien testailua (mm. modal)
|   16.3 |  2   | datepicker-komponentti, moment.js + lokalisointi (fi), lainaus-form, Select2|
|   17.3.|  4,5 | Select2:n käyttöä, asiakkaiden haku: putkea kuntoon, service, reducer..., Select2 lazyna, jonka hylkäsin toistaiseksi, LendingForm: UIn hahmottelua (Semanticin Step-komponentti)|
|	19.3.|	4,5	| Select2:n korvaaminen UI Semanticin omalla dropdownilla (pajassa 2h), Steppien näkyvyydet,productForm-komponentti ja lendingForminparantelua |
|	24.3.| 5	| Lainauslomakkeen tekoa UI-säätöä, NumberPicker-komponentin kanssa painimista, tuotteiden tallennus: lomake, reducer ym.|
|	24.3.| 3	| Lainauslomake, yritystä saada dropdownin kautta oliot talteen, ei vain key/value, jäi kesken...|
|	25.3.| 4,5	| Lainauslomake: dropdown/select kondikseen; stateen oma taulukko olioita varten, tuotelistausta ja parantelua, uuden tuotteen lisäsys Toggalable-komponentin "taakse"|
|	26.3.| 3	| Oma numerokomponentti (paja 1h), lainauksen tallennusta |
|	  "  | 3,5	| Lainauksen tallennus, numerokomponentin arvon kanssa säätöä|
|	27.3.| 2	| numerokomponentti|
|	30.3.| 4	| numerokomponentti, ratkaisu löytyi. lapsikomponentista kutsu: this.props.<handle> välitti arvon isäkomponentille |
| 	  "	 | 1	| tuotteiden lukumäärät tallentuvat | 																					|
|	31.3.| 3	| lainauksien listaus, päivämäärien vertailut vei aikaa, vielä uuden menulinkin active-tieto vähän pielessä |
|	1.4. | 2,5	| UI - asiaa: lainauksen palautus, kuittaus-modal, tallennuksesta ajastettu message-komponentti, ohjeiden (read.me) päivitystä |	
|	 "	 | 1,5	| UI-muutoksia, perehtymistä: listaukseen/raporttinäkymään mahdollinen komponentti: https://react-table.js.org/#/story/simple-table		|
|	 "   | 3,5	| Backendin toteutusta, aloitusta, pakkausten asentelua, index.js, mongoose, tietokanta mLabiin |
|	2.4. | 1,5	| React Nativen tutkailua (Expo, ehkä n. 0,5h), backendiin alustava toteutus: getAll ja createNew, putki toimii kantaan asti  |
|	4.4. | 1,5	| Backendin kehitystä, Product schema mongooseen ja pientä refaktorointia |
|	6.4. | 2	| lainauksen kuittaus |
|	7.4. | 1	| JavaScript-opiskelua: Jeremy Fairbank: https://www.youtube.com/watch?v=HvMemAgOw6I |
|	 "	 | 2	| backendiin perusoperaatiot (haut ja tallennukset, format-funktiot ym) frontend käyttämään backendiä db.jsonin/test serverin sijaan|
|	8.4  | 3,5	| korjauksia ja refaktorointia  (väliaikatietoa: tunteja yhteensä 64)|
|	9.4. | 3	| Päivämääräkorjauksia, client-puolelle varaston tavaramäärien päivitys [yhteensä 67h] |
|  10.4. | 1	| DatePickerin kanssa painimista; value/selected yhtäaikaa sotkivat muotoilun, lainauslistan päivitys reduxin kautta vielä kesken |
|  12.4. |	2	| Käyttäjienhallintaa backendin puolelle	[ yhteensä 70h ]]	|
|   "	 |	2,5	| käyttäjienhallintaa fronttiin. userreducer ym. UI-asioita, mm. kirjautuneen käyttäjän näyttäminen [yhteensä 72.5h]|
|  14.4  |	1,5	| UI-asioita: loginForm ym. UI:n käyttäytymistä testUserilla, login/logout  (yhteensä 74h)|
|	"	 |	1	| UI-asioita: admin-näkymän hahmottelua	|
|	16.4 |	2,5	| Käyttäjienhallintaa, korjauksia (paja) Yhteensä 77.5h	|
|	17.4 |	3	| Vihdoin kondikseen asiakkaan populointi lainauksella, rekisteröintilomake ja pientä tappelua salasanavertailuiden kanssa (miksi pw1 != pw2...) (80,5h)	|
|	18.4 |  3	| Login toimii, aikaa kului kohtuuttoman kauan ihmettelyyn, miksi statesta ei saanu loginData. -> bind(this) auttoi... 83,5h|



