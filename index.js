const randomWords = require("random-words");
const cliProgress = require("cli-progress");
const admin = require("firebase-admin");
const serviceAccount = require("./config/serviceAccountKey.json");

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db = admin.firestore();

const collection = "posts"; // Your collection name
const ndocs = 20; // Number of dummy posts

console.log("Uploading dummy data. . .")

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
bar.start(ndocs, 0);

for (let i = 0; i < ndocs; i++) {
  const obj = {
    context: randomWords({ min: 10, max: 30, join: " " }),
    user: randomWords({ exactly: 2, join: " " })
  };
  db.collection(collection)
    .doc()
    .set(obj);

  bar.update(1);
}
bar.stop();
console.log("Upload complete!")
