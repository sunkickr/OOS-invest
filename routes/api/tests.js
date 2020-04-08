const express = require('express');
const router = express.Router();

// Item Model
const Test = require('../../models/Test')

// @route GET api/items
// @desc Get ALL Items
// @access Public

router.get('/',(req, res) => {
    Test.find()
        .sort({ date: -1 })
        .then(tests => res.json(tests))
});

// @route POST api/items
// @desc Get ALL Items
// @access Public

router.post('/',(req, res) => {
    const newTest = new Test({
        name: req.body.name
    })

    newTest.save().then(test => res.json(test));
});

// @route DELETE api/items/:id
// @desc DELETE A Item
// @access Public

router.delete('/:id',(req, res) => {
    Test.findById(req.params.id)
        .then(test => test.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({ success: false }));
})




module.exports = router;