const functions = require('firebase-functions');
const admin = require('firebase-admin');

const cors = require('cors')({origin: true});

//initialize the admin app
admin.initializeApp();

//initialize the db instance
const db = admin.firestore();

//function to validate the user JWT token

exports.validateUserJWTToken = functions.https.onRequest(async(req, res) => {
    //enaling the cors
    cors(req, res, async() => {
        const authorizationHeader = req.get("Authorization");

        if(!authorizationHeader || !authorizationHeader.startsWith("Bearer ")){
            return res.status(401).json({error: "Unauthorized"})
        }

        const token = authorizationHeader.split('Bearer ')[1];

        try{
            let userData;
            const decodedToken = await admin.auth().verifyIdToken(token);
            if(decodedToken){
                const docRef = db.collection("users").doc(decodedToken.uid);
                const doc = await docRef.get()
                if(!doc.exists){
                    const userRef = await db.collection("users").doc(decodedToken.uid);
                    userData = decodedToken
                    userData.role = 'member'
                    await userRef.set(userData);
                    return res.status(200).json({success: true, user: userData});
                }else{
                    return res.status(200).json({success: true, user: doc.data()});
                }
            }
        }catch(err){
            console.log(`Error on validating: ${err}`)
            return res.status(401).json({error: err.message, status: "un-Authorized"})
        }
    })
})

//function to save the app data on the cloud

exports.createNewApp = functions.https.onRequest(async(req, res) => {
    cors(req, res, async() => {
        try{
            const data = req.body;
            const docRef = db.collection("apps").doc(req.body._id)
            await docRef.set(data)

            //retrieve the data from the cloud

            const appDetail = await docRef.get();
            res.status(200).json({_id: docRef.id, data: appDetail.data() })

        }catch(err){
            return res.status(402).json({error: err.message});
        }
    })
})

//get all apps 
exports.getAllApps = functions.https.onRequest((req, res) => {
    cors(req, res, async() => {
        try{
            const apps = []
            const unsubscribe = db
            .collection("apps")
            .orderBy('timestamp', "desc")
            .onSnapshot((snapShot) => {
                apps.length = 0;
                snapShot.forEach(doc => {
                    apps.push(doc.data());
                });
    
                res.json(apps)
            });
    
            res.on('finish', unsubscribe)
        } catch(error) {
            return res.status(402).json({error: error.message});
        }
    });
});

exports.deleteAnApp = functions.https.onRequest(async(req, res) => {
    cors(req, res, async() => {
        try{
            const {id} = req.query;
            if(!id){
                return res.status(400).json({error: "App ID is missing"})
            }

            await db.collection("apps").doc(id).delete();
            return res.status(200).json({message: "App Deleted"})
        }catch(error){
            return res.status(402).json({error: error.message});
        }
    })
})

exports.getAllUsers = functions.https.onRequest(async(req, res) => {
    cors(req, res, async() => {
        try{
            const snapShot = await db.collection("users").get();

            const users = []
            snapShot.forEach(doc => {
                users.push(doc.data())
            })

            return res.status(200).json(users);
        }catch(error){
            return res.status(402).json({error: error.message})
        }
    })
})

exports.updateTheUser = functions.https.onRequest(async(req, res) => {
    cors(req, res, async() => {
        try{
            const {_id, ...data} = req.body;
            await db.collection("users").doc(_id).update(data)

            return res.status(200).json({message: "User Updated"});
        }catch (error){
            return res.status(402).json({error: error.message})
        }
    })
})