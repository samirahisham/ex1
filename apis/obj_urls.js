const express = require('express');
const { createObj, listObj, getCustomObj, updateCustomObj, softDeleteCustomObj, deleteCustomObj } = require('./crud');

const router = express.Router();

router.post('/create', createObj); // done
router.get('/all', listObj); // done
router.get('/get/:pk', getCustomObj); // done
router.put('/update/:pk', updateCustomObj); // done
router.delete('/soft/delete/:pk', softDeleteCustomObj); // done
router.delete('/delete/:pk', deleteCustomObj); // done


module.exports = router;
