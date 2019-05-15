function CheckIndexedDBSupport(){
    if (!window.indexedDB) {
        console.log("Your browser does not support IndexedDB");
        return false;
    }else{
      console.log("Your browser supports IndexedDB");
      return true;
    }
}

var db;
//Opening a Database
function openDb(dbName,version,key,jsonvalue){
	// Open the database
	//parameters - database name and version number. - integer
	var request = indexedDB.open(dbName, version);
	db = this.result

	//Generating handlers
	//Error handlers
	request.onerror = function(event) {
		console.log("Error: "+event)
	};

	//OnSuccess Handler
	request.onsuccess = function(event) {
   		console.log("Success: "+event)
   		db = event.target.result
 	};
  	
  	//OnUpgradeNeeded Handler
	request.onupgradeneeded = function(event) { 
		console.log("On Upgrade Needed",+event)
  		 
  		db = event.target.result;

  		// Create an objectStore for this database
  		//Provide the ObjectStore name and provide the keyPath which acts as a primary key
          // var objectStore = db.createObjectStore(key, jsonvalue);
          var objectStore = db.createObjectStore(key, {keyPath: 'id', autoIncrement: true });
	};
}

//Simple function to get the ObjectStore
//Provide the ObjectStore name and the mode ('readwrite')
function getObjectStore(store_name, mode) {
    var tx = db.transaction(store_name, mode);
    return tx.objectStore(store_name);
    }

//Adding to the Database
function addNews(store_name, jsonValue) {
    var store = getObjectStore(store_name, 'readwrite');
    var req;
    try {
      req = store.add(jsonValue);
    } catch (e) {
      throw e;
    }
    req.onsuccess = function (evt) {
      console.log("Insertion in DB successful");
    };
    req.onerror = function() {
      console.log("Insertion in DB Failed ", this.error);
    };
  }

  function clearObjectStore(store_name) {
    //Get the ObjectStore
    var store = getObjectStore(store_name, 'readwrite');
    //Clear the ObjectStore
    var req = store.clear();
    //Success Handler
    req.onsuccess = function(event) {
      console.log("clear successful")
    };
    //Error Handler
    req.onerror = function (event) {
      console.log("clear failed")
    };
  }

  //Read All data in ObjectStore
function readAll(store_name){
    //Create an array
    var NewsArray = [];
    //Get the ObjectStore
    objectStore = getObjectStore(store_name, 'readwrite');

    //Open the Cursor on the ObjectStore
    objectStore.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;
                //If there is a next item, add it to the array

                if (cursor) {
              NewsArray.push(cursor.value);
              console.log(cursor.value);
              cursor.continue();
                }
                //else get an alert informing you that it is done
                else {
                    ShowArticlesConent("Dashboard", NewsArray[0]);
                }
    };
}