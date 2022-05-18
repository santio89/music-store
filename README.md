<h1 align="center">MUSIC-STORE | REACT PROJECT 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/music-store" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/music-store.svg">
  </a>
</p>

<h2>REACT | PROYECTO FINAL CODERHOUSE</h2>
<p>E-Commerce desarrollado en React y conectado a Firebase</p>

### 🏠 [Repo](https://github.com/santio89/music-store)
### ✨ [Demo](https://music-store-firebase.web.app/)

## Instalar

```sh
git clone https://github.com/santio89/music-store.git
cs music-store
npm install
generar .env file con api keys*
npm start


*Crear archivo .env en el root del proyecto, con las claves indicadas:

REACT_APP_FIREBASE_APIKEY
REACT_APP_FIREBASE_AUTHDOMAIN
REACT_APP_FIREBASE_PROJECTID
REACT_APP_FIREBASE_STORAGEBUCKET 
REACT_APP_FIREBASE_MESSAGINGSENDERID
REACT_APP_FIREBASE_APPID 
REACT_APP__FIREBASE_MEASUREMENTID
REACT_APP_DISCOGS_TOKEN
REACT_APP_DISCOGS_KEY
REACT_APP_DISCOGS_SECRET 
REACT_APP_SPOTIFY_ID
REACT_APP_SPOTIFY_SECRET
REACT_APP_SPOTIFY_REFRESH
REACT_APP_SPOTIFY_TOKEN
REACT_APP_RECAPTCHA_KEY

Para generarlas, ver la documentación: 
Firebase - (https://firebase.google.com/)
Discogs - (https://www.discogs.com/developers#page:authentication)
Spotify - (https://developer.spotify.com/documentation/general/guides/authorization/app-settings/)
Recaptcha - (https://developers.google.com/recaptcha/intro)

```

## Funcionalidades

>· Leer productos de una api y crearlos en una base de datos. En caso de no exisitir el producto en la base de datos, lo crea; en caso de ya exisitir, le actualiza el precio según la api pero mantiene el stock desde la base datos.
><br/>· Listado de productos actualizados desde Discogs.
><br/>· Manejo de stock desde Firebase.
><br/>· Conectar con api de Spotify para escuchar los albums (en detalle de item).
><br/>· Manejar carro de compras (agregar, modificar, eliminar) y enviar la información a Firebase.
><br/>· Mostrar categorías de productos y navegar entre ellas.
><br/>· Filtrado, búsqueda y paginación de productos.
><br/>· Modo oscuro/claro.
><br/>· Local storage con persistencia entre ventanas.
><br/>· Manejo de usuarios desde Firebase con login de Google.
><br/>· Carro de compras y Wishlist de usuario.
><br/>· Modificación de datos de usuario.


## Librerías y recursos utilizados

```sh
react
react-router-dom
react-google-recaptcha
framer-motion
bulma css
bootstrap icons
google fonts
```


## Autor

👤 **Santi Olais**

* Website: https://santiweb.netlify.app/
* Github: [@santio89](https://github.com/santio89)
* LinkedIn: [@https:\/\/www.linkedin.com\/in\/santiago-olais-829542b9\/](https://linkedin.com/in/https:\/\/www.linkedin.com\/in\/santiago-olais-829542b9\/)

