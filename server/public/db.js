let db;

// open request into index db (2nd paramter is version)
const request = indexedDB.open('sticky-notes', 1);

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  db.createObjectStore('pendingtransations', { autoIncrement: true });
};

request.onsuccess = (event) => {
  db = event.target.result;

  // check if navigartor is online will run the function to check the database
  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = (event) => {
  console.log(`❌ Error ${event.target.errorCode}`);
};

// Save record offline to the index db
function saveRecord(record) {
  const transaction = db.transaction(['pendingtransations'], 'readwrite');
  const store = transaction.objectStore('pendingtransations');
  store.add(record);
};

// Check database will see if there is anything in the index db, create fetch request if there is anything in the index db and clear it.
function checkDatabase() {
  const transaction = db.transaction(['pendingtransations'], 'readwrite');
  const store = transaction.objectStore('pendingtransations');
  const getAll = store.getAll();

  getAll.onsuccess = () => {
    if (getAll.result.length > 0) {
      fetch('/api/transaction/bulk', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(() => {
          const transaction = db.transaction(['pendingtransations'], 'readwrite');

          const store = transaction.objectStore('pendingtransations');
          // clear the index db
          store.clear();
        });
    };
  };
};