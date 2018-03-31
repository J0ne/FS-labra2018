# FS-labra2018

Full Stack - websovelluskehitys - harjoitustyön repositorio

*Front end:*
https://github.com/J0ne/FS-labra2018/tree/master/front-end/ware_app

*Back end:* (todo)


Sovellus on eräänlainen lainauksien hallinta. 

### Lyhyesti:
Varastossa on n kpl erilaisia tuotteita. 
Asiakasrekisterissä on asiakkaat, jotka lainaavat tavaroita.
Lainaukset ovat siis toimenpiteitä, jotka liittyvät tuotteeseen ja asiakkaaseen.

Ohjelman käyttäjän tulee olla kirjautunut sovellukseen.
Käyttäjä voi kirjata lainauksia asiakkaalle. Ja (jos aika riittää, niin) hallinnoida sekä asiakkaita että tuotteita.

Lainauksen tallentaminen muuttaa varastossa olevan tuotteen kappalemäärää.

Esimerkkinä ohjelman käyttökohteellee voisi olla esimerkiksi armeijan varusvarasto.

---

### Tuntikirjanpitoa

| pvm	| aika (h)|kommentit  |
| ------|:-------:| ---------:|
|	12.3.|  1	| aloitusta, eka commit ym												|
|	13.3.|	1	| kirjastojen asennuksia, json-server, axios, productReducer, store, ja tilan initialisointi, UI semanticin tuonti ja testailua|
|	14.3.|	2	| lukemista: GraphQL, osan 7 materiaaleja	|
|	16.3.| 	2,5 | navigaatiota, SPA-hommia,dummy-dataa, UI-komponenttien testailua (mm. modal)
|   16.3 |  2   | datepicker-komponentti, moment.js + lokalisointi (fi), lainaus-form, Select2|
|   17.3.|  4,5   | Select2:n käyttöä, asiakkaiden haku: putkea kuntoon, service, reducer..., Select2 lazyna, jonka hylkäsin toistaiseksi, LendingForm: UIn hahmottelua (Semanticin Step-komponentti)|
|	19.3.|	4,5	| Select2:n korvaaminen UI Semanticin omalla dropdownilla (pajassa 2h), Steppien näkyvyydet,productForm-komponentti ja lendingForminparantelua |
|	24.3.| 5	| Lainauslomakkeen tekoa UI-säätöä, NumberPicker-komponentin kanssa painimista, tuotteiden tallennus: lomake, reducer ym.|
|	24.3.| 3	| Lainauslomake, yritystä saada dropdownin kautta oliot talteen, ei vain key/value, jäi kesken...|
|	25.3.| 4,5	| Lainauslomake: dropdown/select kondikseen; stateen oma taulukko olioita varten, tuotelistausta ja parantelua, uuden tuotteen lisäsys Toggalable-komponentin "taakse"|
|	26.3.| 3	| Oma numerokomponentti (paja 1h), lainauksen tallennusta |
|	26.3.| 3,5	| Lainauksen tallennus, numerokomponentin arvon kanssa säätöä|
|	27.3.| 2	| numerokomponentti|
|	30.3.| 4	| numerokomponentti, ratkaisu löytyi. lapsikomponentista kutsu: this.props.<handle> välitti arvon isäkomponentille |
|	30.3.| 1	| tuotteiden lukumäärät tallentuvat | 	
|	30.3.| 1	| tuotteiden lukumäärät tallentuvat | 																				|
|	31.3.| 3	| lainauksien listaus, päivämäärien vertailut vei aikaa, vielä uuden menulinkin active-tieto vähän pielessä | 	







