// const { initializeApp } = require('firebase-admin/app');
const admin = require('firebase-admin');
const serviceAccount = require('../firebase.json');
// const { applicationDefault } = require('firebase-admin/app');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://toeic-service.firebaseio.com'
});

function vertifyAccessToken(idToken) {
    var promise = new Promise(function (resolve, reject) {
        admin.auth().verifyIdToken(idToken).then(decodedIdToken => {
            console.log('ID Token correctly decoded', decodedIdToken);
            admin.auth().getUser(decodedIdToken.uid).then((userRecord) => {
                resolve({ user: userRecord })
            }).catch(error => {
                console.error('Error while getting Firebase User record:', error);
                reject({ user: null })
            });
        }).catch(error => {
            console.error('Error while verifying Firebase ID token:', error);
            reject({ user: null })
        });
    })
    return promise

}
admin.auth().listUsers()
    .then((userRecords) => {
        console.log(userRecords);
        userRecords.forEach((user) => {
            console.log(user.toJSON());
        });
    })
    .catch((error) => {
        console.log('Error fetching users:', error);
    });
module.exports = { admin, vertifyAccessToken }