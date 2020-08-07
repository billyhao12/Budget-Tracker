const request = window.indexedDB.open("budget", 1);

let db;

request.onupgradeneeded = event => {
  const db = event.target.result;

  const transactions = db.createObjectStore("transactions", {autoIncrement: true});
  
}

request.onsuccess = () => {
  db = request.result;

}

function saveRecord(record) {
  console.log(record);

  const transaction = db.transaction( ["transactions"], "readwrite" );
  const transactionStore = transaction.objectStore("transactions");

  transactionStore.add(record);
}