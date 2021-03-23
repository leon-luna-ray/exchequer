let db;

// open request into index db (2nd paramter is version)
const request = indexedDB.open('budget-tracker', 1);

request.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore('pendingtransations', { autoIncrement: true });
};

request.onsuccess = (event) => {
    db = event.target.result;
  
    // check if app is online before reading from db
    if (navigator.onLine) {
      checkDatabase();
    }
  };

  request.onerror = (event) => {
    console.log("Woops! " + event.target.errorCode);
  };

  function saveRecord(record) {
    // create a transaction on the pending db with readwrite access
    const transaction = db.transaction(["pendingtransations"], "readwrite");
  
    // access your pending object store
    const budgetStore = transaction.objectStore("pendingtransations");
  
    // add record to your store with add method.
    budgetStore.add(record);
  };

  function checkDatabase() {
    // open a transaction on your pending db
    const transaction = db.transaction(["pendingtransations"], "readwrite");
    // access your pending object store
    const budgetStore = transaction.objectStore("pendingtransations");
    // get all records from store and set to a variable
    const getAll = budgetStore.getAll();
  
    getAll.onsuccess = function() {
      if (getAll.result.length > 0) {
        // bulk api call will send everything in the offline storage and send a post request to save to db once back online
        fetch("/api/transaction/bulk", {
          method: "POST",
          body: JSON.stringify(getAll.result),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
          }
        })
        .then(response => response.json())
        .then(() => {
          // if successful, open a transaction on your pending db
          const transaction = db.transaction(["pendingtransations"], "readwrite");
  
          // access your pending object store
          const budgetStore = transaction.objectStore("pendingtransations");
  
          // clear all items in your store
          budgetStore.clear();
        });
      }
    };
  }