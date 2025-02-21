#!/usr/bin/env node

// Importamos los módulos necesarios
const { execSync } = require('child_process'); // Para ejecutar comandos en la terminal
const readline = require('readline'); // Para interactuar con el usuario en la terminal
const moment = require('moment'); // Para manejar fechas de manera sencilla
const os = require('os'); // Para detectar el sistema operativo
const fs = require('fs'); // Para trabajar con el sistema de archivos

// Configuramos la interfaz de entrada y salida en la terminal
const prompter = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Configuración de probabilidades y horarios de commits
const PROBABILIDAD_DIA_LABORAL = 0.6; // 60% de probabilidad de hacer un commit en días laborales
const PROBABILIDAD_FIN_DE_SEMANA = 0.3; // 30% en fines de semana
const MIN_COMMITS = 1; // Mínimo de commits por día
const MAX_COMMITS = 10; // Máximo de commits por día
const HORA_MINIMA = '09:30'; // Hora más temprana para un commit
const HORA_MAXIMA = '18:00'; // Hora más tardía para un commit

// Variables para almacenar las fechas de inicio y fin
let FECHA_INICIO = '';
let FECHA_FIN = '';

// Limpiamos la consola y mostramos un mensaje de bienvenida
console.clear();
console.log('RELLENA LOS DATOS PARA HACKEAR TU ACTIVIDAD:');
console.log('');

// Función para ejecutar comandos en la terminal de forma sincronizada
const ejecutarComando = comando => {
    console.log(comando);
    try {
        const salida = execSync(comando);
        console.log(String(salida));
    } catch (error) {
        console.error(String(error));
    }
};

// Función para crear directorios si no existen
const crearCarpetaSiNoExiste = (ruta) => {
    if (!fs.existsSync(ruta)) {
        fs.mkdirSync(ruta, { recursive: true }); // Crea el directorio y subdirectorios si no existen
    }
};

// Función para crear archivos vacíos de forma compatible entre Windows y Linux
const crearArchivoVacio = (ruta) => {
    if (os.platform() === 'win32') {
        // En Windows, usamos fs.writeFileSync para crear un archivo vacío
        fs.writeFileSync(ruta, '');
    } else {
        // En Linux, usamos touch
        ejecutarComando(`touch ${ruta}`);
    }
};

// Función para generar actividad en un día específico
const generarActividadParaFecha = fecha => {
    const carpeta = fecha.format('YYYYMMDD');
    crearCarpetaSiNoExiste(`./fixtures/${carpeta}`); // Verificamos si la carpeta existe

    // Generamos commits dentro del rango permitido
    for (let i = 0; i < MIN_COMMITS || (i < MAX_COMMITS && Math.random() < 0.75); i++) {
        const [horaMin, minMin] = HORA_MINIMA.split(':');
        const [horaMax, minMax] = HORA_MAXIMA.split(':');

        // Generamos una hora aleatoria dentro del rango
        const hora = String(Math.floor(Math.random() * (+horaMax - +horaMin + 1) + +horaMin)).padStart(2, '0');
        const minuto = String(Math.floor(Math.random() * (+minMax - +minMin + 1) + +minMin)).padStart(2, '0');

        const momentoCommit = moment(`${fecha.format('YYYY-MM-DD')}T${hora}:${minuto}`);
        const nombreArchivo = `${momentoCommit.format('YYYYMMDDHHmm')}_${i + 1}`;

        // Crear un archivo vacío con la fecha de commit
        crearArchivoVacio(`./fixtures/${carpeta}/${nombreArchivo}`);

        // Añadirlo al repositorio y hacer el commit
        ejecutarComando(`git add ./fixtures/${carpeta}/${nombreArchivo}`);
        ejecutarComando(`git commit --date="${momentoCommit.format('X')}" -m "Añadir ${nombreArchivo}"`);
    }
};

// Función principal para simular actividad en el historial de Git
const hackear = () => {
    const fechaInicio = moment(FECHA_INICIO);
    const fechaFin = moment(FECHA_FIN);

    // Validamos que las fechas sean correctas
    if (fechaInicio.isBefore(fechaFin)) {
        console.log(`\nHackeando tu actividad desde ${FECHA_INICIO} hasta ${FECHA_FIN} 😈\n`);

        // Recorremos cada día en el rango de fechas
        for (let m = fechaInicio; m.diff(fechaFin, 'days') <= 0; m.add(1, 'days')) {
            // Decidimos si se generará actividad en ese día
            if (m.format('dddd') !== 'Saturday' && m.format('dddd') !== 'Sunday' && Math.random() < PROBABILIDAD_DIA_LABORAL) {
                generarActividadParaFecha(m);
            } else if (Math.random() < PROBABILIDAD_FIN_DE_SEMANA) {
                generarActividadParaFecha(m);
            }
        }

        console.log('\nListo. ');
        console.log('\nEjecuta "git push" para completar 😈\n');
    } else {
        console.log(`Rango de fechas inválido: "${FECHA_INICIO}" - "${FECHA_FIN}" .`);
        console.log('Inténtalo de nuevo...\n');
    }
};

// Validaciones de fecha
const FORMATO_FECHA = 'YYYY-MM-DD';
const REGEX_FECHA = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
const esFechaValida = fecha => typeof fecha === 'string' && REGEX_FECHA.test(fecha);

// Preguntas para el usuario
const preguntaFechaInicio = `¿Desde qué fecha quieres generar commits? (${FORMATO_FECHA}) `;
const preguntaFechaFin = `¿Hasta qué fecha quieres generar commits? (${FORMATO_FECHA}) `;
const mensajeErrorFecha = `Por favor, introduce una fecha válida con el formato ${FORMATO_FECHA}. `;

// Manejo de la respuesta de la fecha final
const manejarRespuestaFechaFin = fecha => {
    if (esFechaValida(fecha)) {
        FECHA_FIN = fecha;
        hackear();
        console.log('');
        prompter.close();
    } else {
        console.log(`\n${mensajeErrorFecha}\n`);
        prompter.question(preguntaFechaFin, manejarRespuestaFechaFin);
    }
};

// Manejo de la respuesta de la fecha de inicio
const manejarRespuestaFechaInicio = fecha => {
    if (esFechaValida(fecha)) {
        FECHA_INICIO = fecha;
        console.log('');
        prompter.question(preguntaFechaFin, manejarRespuestaFechaFin);
    } else {
        console.log(`\n${mensajeErrorFecha}\n`);
        prompter.question(preguntaFechaInicio, manejarRespuestaFechaInicio);
    }
};

// Iniciamos la interacción con el usuario
prompter.question(preguntaFechaInicio, manejarRespuestaFechaInicio);

// Evento al cerrar la terminal
prompter.on('close', () => {
    console.log("\n¡HASTA LA PRÓXIMA! ✌️\n");
    process.exit(0);
});