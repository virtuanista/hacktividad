# Hacktividad

Desmitificando la actividad: demostrar que los commits no miden el talento ni garantizan aciertos de contratación.

## Introducción

Este proyecto surge de la observación de que muchos departamentos de Recursos Humanos contratan basándose en la actividad de contribución en GitHub, lo cual no siempre refleja el verdadero talento o habilidades de un desarrollador.


## Compatibilidad

Este script debería ser compatible tanto para Windows, como para Linux.

## Requisitos

- Node.js
- Git

## Instalación

1. Clona este repositorio:

    ```bash
    git clone https://github.com/sabiopobre/hacktividad.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd hacktividad
    ```

3. Instala las dependencias:

    ```bash
    npm install
    ```

## Configuración

1. Configura git con el correo electrónico de tu cuenta de `GitHub` para que las contribuciones falsificadas aparezcan en tu perfil:

    ```bash
    git config --global user.email "TU_CORREO_ELECTRONICO"
    git config --global user.name "TU_NOMBRE_DE_USUARIO"
    ```

## Personalización

1. Puedes editar las constantes de configuración en `index.js` para ajustar la probabilidad y el rango de tiempo de los commits:

    ```javascript
    // Configuración de probabilidades y horarios de commits
    const PROBABILIDAD_DIA_LABORAL = 0.6; // 60% de probabilidad de hacer un commit en días laborales
    const PROBABILIDAD_FIN_DE_SEMANA = 0.3; // 30% en fines de semana
    const MIN_COMMITS = 1; // Mínimo de commits por día
    const MAX_COMMITS = 10; // Máximo de commits por día
    const HORA_MINIMA = '09:30'; // Hora más temprana para un commit
    const HORA_MAXIMA = '18:00'; // Hora más tardía para un commit
    ```

## Uso

1. Ejecuta el `script`:

    ```bash
    node .
    ```

2. Ingresa las `fechas de inicio y fin`:
    ```bash
    YYYY-MM-DD
    ```
    

3. `Añade los cambios` al repositorio:

    ```bash
    git add .
    ```

4. Realiza un `commit` para aplicar los cambios:

    ```bash
    git commit -m "Hackeando actividad de contribución"
    ```

5. `Empuja` el repositorio a GitHub:

    ```bash
    git push
    ```

## Dependencias

- [Moment.js](https://www.npmjs.com/package/moment): Para manejar fechas de manera sencilla.

## Licencia

<p align="center">
	Repositorio generado por <a href="https://github.com/sabiopobre" target="_blank">virtu 🎣</a>
</p>

<p align="center">
	<img src="https://soniditos.com/cat_footer.svg" />
</p>

<p align="center">
	Copyright &copy; 2025
</p>

<p align="center">
	<a href="/LICENSE"><img src="https://img.shields.io/static/v1.svg?style=for-the-badge&label=License&message=MIT&logoColor=d9e0ee&colorA=363a4f&colorB=b7bdf8"/></a>
</p>
