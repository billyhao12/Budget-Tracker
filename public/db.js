const request = window.indexedDB.open("budget", 1);

let db;

request.onupgradeneeded = event => {
  const db = event.target.result;

  db.createObjectStore("transactions", {autoIncrement: true});
  
}

request.onsuccess = () => {
  db = request.result;

}

function saveRecord(record) {

  const transaction = db.transaction( ["transactions"], "readwrite" );
  const transactionStore = transaction.objectStore("transactions");

  transactionStore.add(record);
}

function checkDatabase() {

  // Access data in IndexedDB
  const transaction = db.transaction( ["transactions"], "readwrite" );
  const transactionStore = transaction.objectStore("transactions");

  const getRequest = transactionStore.getAll();
  getRequest.onsuccess = () => {
    
    // Clear data from IndexedDB
    transactionStore.clear();
    
    // Submit to MongoDB
    fetch("/api/transaction/bulk", {
      method: "POST",
      body: JSON.stringify(getRequest.result),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    });

  }

}

window.addEventListener("online", checkDatabase);