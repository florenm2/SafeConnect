var config = require('config.json');
var express = require('express');
var router = express.Router();
var purchaseHistoryService = require('services/purchaseHistory.service');

// routes
router.post('/authenticate', authenticatePurchaseHistory);
router.post('/register', registerPurchaseHistory);
router.get('/current', getCurrentPurchaseHistory);
router.put('/:_id', updatePurchaseHistory);
router.delete('/:_id', deletePurchaseHistory);

module.exports = router;

function authenticatePurchaseHistory(req, res) {
    purchaseHistoryService.authenticate(req.body.purchaseHistoryname, req.body.password)
        .then(function (token) {
            if (token) {
                // authentication successful
                res.send({ token: token });
            } else {
                // authentication failed
                res.sendStatus(401);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function registerPurchaseHistory(req, res) {
    purchaseHistoryService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrentPurchaseHistory(req, res) {
    purchaseHistoryService.getById(req.params.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updatePurchaseHistory(req, res) {
    var purchaseHistoryId = req.purchaseHistory.sub;
    if (req.params._id !== purchaseHistoryId) {
        // can only update own account
        return res.status(401).send('You can only update your own account');
    }

    purchaseHistoryService.update(purchaseHistoryId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deletePurchaseHistory(req, res) {
    var purchaseHistoryId = req.purchaseHistory.sub;
    if (req.params._id !== purchaseHistoryId) {
        // can only delete own account
        return res.status(401).send('You can only delete your own account');
    }

    purchaseHistoryService.delete(purchaseHistoryId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}