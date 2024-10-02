const express = require('express');
const mongoose = require('mongoose');
const Proveedor = require('./models/Proveedor'); // Importar modelo Proveedor
const Insumo = require('./models/Insumo');       // Importar modelo Insumo

const app = express();
const ejs = require('ejs');
const fs = require('fs');

// Conexión a MongoDB
mongoose.connect('mongodb://localhost/Negocio2024')
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.log('Error al conectar a MongoDB:', err));


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/proveedores', async (req, res) => {
    const proveedores = await Proveedor.find();
    res.render('layout', {
        title: 'Listado de Proveedores',
        content: ejs.render(fs.readFileSync('views/proveedores.ejs', 'utf-8'), { proveedores })
    });
});

app.get('/insumos', async (req, res) => {
    const insumos = await Insumo.find();
    res.render('layout', {
        title: 'Listado de Insumos',
        content: ejs.render(fs.readFileSync('views/insumos.ejs', 'utf-8'), { insumos })
    });
});


// Ruta para agregar proveedor
app.get('/agregar-proveedor', async (req, res) => {
    const nuevoProveedor = new Proveedor({
        idproveedor: 1,
        nombrecia: 'Empresa XYZ'
    });
    await nuevoProveedor.save();
    res.send('Proveedor agregado');
});

// Ruta para agregar insumo
app.get('/agregar-insumo', async (req, res) => {
    const nuevoInsumo = new Insumo({
        idinsumo: 1,
        nominsumo: 'Insumo ABC',
        idproveedor: 1, // Referencia al proveedor
        preUni: 50.00,
        stock: 100
    });
    await nuevoInsumo.save();
    res.send('Insumo agregado');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
