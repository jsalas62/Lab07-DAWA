const mongoose = require('mongoose');

const insumoSchema = new mongoose.Schema({
    idinsumo: {
        type: Number,
        required: true,
        unique: true
    },
    nominsumo: {
        type: String,
        required: true,
        maxlength: 150
    },
    idproveedor: {
        type: Number,
        required: true,
        ref: 'Proveedor' // Hace referencia a la colección de Proveedores
    },
    preUni: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Insumo', insumoSchema);
