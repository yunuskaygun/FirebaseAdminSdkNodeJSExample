var sys = require("util");

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp(
{        
      credential: admin.credential.cert(
            serviceAccount
      ),
      databaseURL: "https://<yourdbname>.firebaseio.com"
});
var say = 0;

//setCustomUserClaims("uId");

function setCustomUserClaims(uid) {
      admin.auth().setCustomUserClaims(uid, {roleId: 1}).then(() => {
            console.log("İşlem Tamam: " + uid);      
      });
}
createUser();
function createUser() {
      admin.auth().createUser(
            {
                  email: "user@example.com",
                  emailVerified: false,
                  phoneNumber: "+11234567890",
                  password: "123456",
                  displayName: "John Doe",
                  photoURL: "http://www.example.com/12345678/photo.png",
                  disabled: false,
                  customClaims: { roleId: 1 }
                }

      ).then(() => {
            console.log("İşlem Tamam: ");      
      });
}

function DoSomething(uid){
      setTimeout(function() { setCustomUserClaims(uid); }, 1000 * say);
}



function listAllUsers() {
      
      // List batch of users, 1000 at a time.
      admin.auth().listUsers(1000)
        .then(function(listUsersResult) {
          listUsersResult.users.forEach(function(userRecord) {
            console.log(userRecord);
            console.log("\n-----");
          });
          console.log("Toplam: " + say);
          if (listUsersResult.pageToken) {
            // List next batch of users.
            //listAllUsers(listUsersResult.pageToken)
          }
        })
        .catch(function(error) {
          console.log("Error listing users:", error);
        });
    }

    //listAllUsers();
