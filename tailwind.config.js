module.exports = {
  purge: ["index.html", "./src/**/*.jsx"],  //va a buscar en el index.html, va a montar la app, y va a buscar y eliminar en todos los componentes los estilos que no se utilicen
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
