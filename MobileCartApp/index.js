import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings ={ 
    databaseURL: 'https://realtime-database-e7b3e-default-rtdb.firebaseio.com/'
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")
const cartBtn = document.getElementById('add-button')
const inputField = document.getElementById('input-field')
const shoppingListEl = document.getElementById('shopping-list')

cartBtn.addEventListener('click', ()=>{
    let inputValue = inputField.value
   push(shoppingListInDB, inputValue)
   clearInput()
})
onValue(shoppingListInDB,function(snapshot){

    if (snapshot.exists()) {
        let shoppingArray = Object.entries(snapshot.val())
        clearShopListEl()
    
        for(let i =0; i< shoppingArray.length; i++){
            let currentItem = shoppingArray[i]
            let currentId = currentItem[0]
            let currentValue = currentItem[1]
    
            appendLi(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }

   
       })
       const clearShopListEl =() =>{
        shoppingListEl.innerHTML = ""
    }     
const clearInput =() =>{
    inputField.value = ""
}
const appendLi =(item) => {
let itemId = item[0]
let itemValue =item[1]


    let newEl = document.createElement('li')
    newEl.textContent = itemValue

    newEl.addEventListener('dblclick', function(){
        let locateId = ref(database, `shoppingList/${itemId}`)
        
        remove(locateId)    
    })
    shoppingListEl.append(newEl)

}
