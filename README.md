# Ionic Burguer Queen


Es una aplicación de pruebas, siguiendo el curso de https://www.udemy.com/course/aprende-ionic-con-proyectos-practicos, en este caso es una app similar a la de uber, es decir una app para hacer pedidos de comida.
Y necesita tener levantado el mongodb y el backend de otro proyecto creado por el instructor del curso: https://github.com/mjriveraknowmad/burguer-queen-nestjs

Es una aplicación básica de Ionic con Angular 19, para aprender. Para ello lo que se ejecutó:

`npm install -g @ionic/cli`

`ionic start 08-ionic-burguer-queen` y se fue respondiendo: Angular, blank y standalone


Ejecutar `ionic serve` dentro del directorio de la aplicación para ver tu app en el navegador

Ejecutar `ionic capacitor build android` para crear la aplicación de android y se abra el android studio

Ejecutar `npm run generate-icons-android` para crear los iconos

Usa  `cordova-res --skip-config --copy` para generar el icono de tu app y pantallas de presentación


Ejecutar `ionic capacitor run android -l --external` para actualizar automáticamente en android, aunque hay que pulsar el reload en el Android Studio, la primera vez

## Añadir plugins de capacitor
Por ejemplo, para traer información del móvil
`npm install @capacitor/device`

O para generar los iconos:
`npm install @capacitor/assets --save-dev`

O para comprobar si el móvil tiene internet
`npm install @capacitor/network@7`
Una vez integrado el código, si no tenemos red, redirigirá a /not-network , para comprobarlo podemos ir al chrome > herramientas de desarrollador > Network conditions > En el selector de Network seleccionar offline

## Instalar librería para translates
`npm i @ngx-translate/core@16`
`npm i @ngx-translate/http-loader@16` 

## Generar páginas
`ionic g page pages/categories`
`ionic g page pages/products`
`ionic g page pages/pay`
`ionic g page pages/not-network`

## Generar componentes
`ionic g c components/toolbar`
`ionic g c components/footer`

## Generar servicio
`ionic g s services/Categories`

## Generar pipe
`ionic g pipe pipes/imageUrl`

## Generar iconos
Se añadieron los scripts correspondientes en el package.json, y las imagenes en la carpeta resources

`npm run generate-icons-android`
`npm run generate-icons-ios`
`npm run generate-icons-pwa`

Más info sobre el script y las dimensiones necesarias de las imágenes: [https://capacitorjs.com/docs/v7/guides/splash-screens-and-icons](https://capacitorjs.com/docs/v7/guides/splash-screens-and-icons)


`ionic capacitor build android` 

## Levantar el docker con el backend
`docker compose -p="burguer-queen" up -d`
luego podemos ver el swagger en localhost:3000/doc
Otra opción es descargarse el proyecto del backend, hacer un npm install y luego `npm run start:dev` 

## Más documentación
https://ionic-docs-lq0if04rc-ionic1.vercel.app/docs/v7/intro/cli
https://ionic-docs-lq0if04rc-ionic1.vercel.app/docs/v7/components
https://ionicframework.com/docs
