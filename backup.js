//MIRROR FILE

// const product = {
//     ratings: "5 star",
//     category: "Mens wears",
//     info: {id: 101, name: "Jean Shirt", price: 45, quantity: 12}
// };

//Initialize Data Structure (set DS)
function DataSet(){
    
    let collection = []; //store inventory items
    
    this.values = function(){
        return collection;
    };
    
    
    this.has = function(item){
      return(collection.indexOf(item) !== -1);  
    };
    
    
    this.size = function(){
        return collection.length;
    };
    
    
    this.remove = function(item){
        if(this.has(item)){
            const index = collection.indexOf(item);
            collection.splice(index, 1);
            return true;
        }
        return false;
    };
    
    this.add = function(item){
        if(!this.has(item)){
            collection.push(item);
            return true;
        }
        return false;
    };
    
    this.edit = function(item, newItem){
        if(this.has(item)){
            const index = collection.indexOf(item);
            collection.splice(index, 1, newItem);
            return true;
        }
        return false;
    };
    
}
    

//initialize DS
const inventory = new DataSet();

//fetch DOM classes in an object
const DOMClasses = {
    productName: 'product_name',
    productPrice: 'product_price',
    productQuantity: 'product_quantity',
    editName: 'edit_name',
    editPrice: 'edit_price',
    editQuantity: 'edit_qty'
    
};

//Define product class
class Product {
    constructor(id, name, price, quantity){
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}




/*************************************************************************************
||                                      APP FUNCTIONS                               ||
*************************************************************************************/

/**************************************
||        ADD INVENTORY FUNC         ||
**************************************/
// const addToInventory = (product)=>{
//     inventory.add(product);
//     document.getElementById('msg').textContent = 'Item successfully added to inventory!'; 
// };



/**************************************
||        CLEAR FIELDS  FUNC         ||
**************************************/
const clearFields = ()=>{
    document.getElementById(DOMClasses.productName).value = '';
    document.getElementById(DOMClasses.productPrice).value = '';
    document.getElementById(DOMClasses.productQuantity).value = '';
    document.getElementById(DOMClasses.productName).focus();
    delayDisplay('');
};

const clearModalFields = ()=>{
        document.getElementById(DOMClasses.editName).value = '';
        document.getElementById(DOMClasses.editPrice).value = '';
        document.getElementById(DOMClasses.editQuantity).value = '';
        //document.getElementById(DOMClasses.editName).focus();
        delayDisplay('');
};



/**************************************
||         DISPLAY MSGs FUNC         ||
**************************************/
const delayDisplay = (msg)=>{
    setTimeout(()=>{
        document.getElementById('msg').textContent = msg;
    }, 2000);
};

const delayModalDisplay = (msg) => {
    setTimeout(()=>{
        document.getElementById('modal_msg').textContent = msg;
    }, 2000);
}


const displayEditModal = () => { document.querySelector('.edit_inv').style.display = 'block'; }


/**************************************
||           ADD ROW FUNC            ||
**************************************/
// const addRow = ()=>{
//     let lastItem = inventory[inventory.length - 1];
   
//     let html = `<tr id='${lastItem.id}'>
//                     <td>${lastItem.id}</td>
//                     <td>${lastItem.name}</td>
//                     <td>${lastItem.price}</td>
//                     <td>${lastItem.quantity}</td>
//                     <td><button id="edit_${lastItem.id}">EDIT</button><button id="del_${lastItem.id}">DELETE</button></td>
//                 </tr>`; 
//     document.querySelector('.display').lastChild.insertAdjacentHTML('afterend', html);

    
    
/**************************************
||    EVENT LISTENERS FOR REPORTS     ||
***************************************/
    
// document.getElementById('reports_btn').addEventListener('click', () => {
//     spoolReport();
    
//     displayTotals();
// }

// };


/**************************************
||   DISPLAY INVENTORY SUMMARY FUNC  ||
**************************************/
// const spoolReport = ()=>{
//     //loop through inventory array and extract the various object keys and display same on the UI
//     inventory.forEach((e)=>{
//         let html = `<tr>
//                         <td>${e.ID}</td>
//                         <td>${e.form_name}</td>
//                         <td>${e.form_price}</td>
//                         <td>${e.form_quantity}</td>
//                     </tr>`;
//         document.querySelector('.reports').lastChild.insertAdjacentHTML('afterend', html);
//     });            
// };



//Displaying totals in the report
// const displayTotals = ()=>{

//     //function for computing totals
//     const totals = (category) => {
    
//         const categorySum = category.reduce((a, b)=>{
//             return a + b;
//         }, 0);

//         return categorySum;
//     };

//     //Compute totals for price and quantity and display same on the UI
//         //create an array with all price values
//         const iPrice = inventory.values().map((e)=>{
//             return e.price;
//         });

//         //create an array with all quantity values
//         const iQuantity = inventory.values().map((e)=>{
//             return e.quantity;
//         });


//         let newHtml = `
//                 <tr class="totals">
//                     <td>    ------------------------- </td>
//                     <td>    ------------------------- </td>
//                     <td>${totals(iPrice)}</td>
//                     <td>${totals(iQuantity)}</td>
//                 </tr>`;

//         document.querySelector('.reports').lastChild.insertAdjacentHTML('afterend', newHtml);
// };




/**************************************
||         ADD PRODUCT FUNC         ||
**************************************/
const addProduct = (product) => {
    //fetch input
    const form_name = document.getElementById(DOMClasses.productName).value;
    const form_price = parseInt(document.getElementById(DOMClasses.productPrice).value);
    const form_quantity = parseInt(document.getElementById(DOMClasses.productQuantity).value);

    if(form_name.length === 0 || form_price.length === 0 || form_quantity === 0){
        document.getElementById('msg').textContent = 'populate all fields before submitting...';
        delayDisplay('');
    }else{
        //dynamically generate the ID
        let ID = 100; //default value of ID when array is empty
        let coll = inventory.size();
        let arr = inventory.values();
        if(coll > 0){
            ID = arr[coll - 1].id + 1; //id of last item + 1
        }else{
            //set value for first item pushed into the inventory
            ID += 1;
        }

        product = new Product(ID, form_name, form_price, form_quantity);

        //update data structure
        inventory.add(product);
        document.getElementById('msg').textContent = 'Item successfully added to inventory!'; 
      
        console.log(inventory.values());

        //update table UI
        let html = `<tr id='${product.id}'>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.quantity}</td>
        <td><button id="edit_${product.id}">EDIT</button><button id="del_${product.id}">DELETE</button></td>
        </tr>`; 
        document.querySelector('.display').lastChild.insertAdjacentHTML('afterend', html);

        //clear form UI fields  
        clearFields();

    }

};


/**************************************
||        DELETE PRODUCT FUNC        ||
**************************************/
const deleteEntry = (nodeID) => {
    //loop thru inventory to select IDs for comparison
    let arr = inventory.values(); //[ {id:101, name: 'Jane'}, {id:102, name: 'Joe'}, {id:103, name: 'Jack'}]
    
    let itemToBeDeleted = arr.find((e) => {
        if(e.id === nodeID){
            return e;
        } 
    });

    //update DS
    inventory.remove(itemToBeDeleted);
    
    //update UI
    let el = document.getElementById(nodeID);
    el.parentNode.removeChild(el);

};




    


/**************************************
||         EDIT PRODUCT FUNC         ||
**************************************/
const editEntry = (nodeID) => {
    //setup event listener for save & close
    document.querySelector('.edit_inv').addEventListener('click', (e) => {
        if(e.target.id === 'edit_btn'){
            //extract values from user
            const edit_name = document.getElementById(DOMClasses.editName).value;
            const edit_price = parseInt(document.getElementById(DOMClasses.editPrice).value);
            const edit_qty = parseInt(document.getElementById(DOMClasses.editQuantity).value);

            //check if fields are empty
            if(edit_name.length === 0 || edit_price.length === 0 || edit_qty === 0){
                document.getElementById('modal_msg').textContent = 'Populate all fields before submitting...';
                delayModalDisplay('');
            }else{
                //edit operation
                //const editedProduct = new Product(nodeID, edit_name, edit_price, edit_qty);
                const editedProduct = {id: nodeID, name: edit_name, price: edit_price, quantity: edit_qty};

                //loop thru inventory to select IDs for comparison
                let arr = inventory.values();  //returns the inventory array
                const itemToBeRemoved = arr.find((e) => {
                    if(e.id === nodeID){
                        return e;
                    }
                });

                inventory.edit(itemToBeRemoved, editedProduct); 
                console.log(itemToBeRemoved);
                console.log(editedProduct);
                console.log(arr);

                //update UI
                document.getElementById('modal_msg').textContent = 'successfully edited product';
                document.getElementById(nodeID).children[0].textContent = nodeID;
                document.getElementById(nodeID).children[1].textContent = edit_name;
                document.getElementById(nodeID).children[2].textContent = edit_price;
                document.getElementById(nodeID).children[3].textContent = edit_qty;

                clearModalFields();

                //remove modal from UI
                setTimeout(()=>{
                    editInv.style.display = 'none';
                }, 3000);

                
            }

        }else if(e.target.id === 'close_btn'){
            editInv.style.display = 'none';
        }

    });

};




/*************************************************************************************
||                                   EVENT LISTENERS                                ||
*************************************************************************************/


/******************************************
||  EVENT LISTENERS FOR SAVE/ADD PRODUCT  ||
*******************************************/

document.getElementById('display_btn').addEventListener('click', addProduct);



/**************************************
||   EVENT LISTENERS FOR EDIT & DEL   ||
***************************************/

const tblwrap = document.querySelector('.tblwrap');
if(tblwrap){
    tblwrap.addEventListener('click', (e) => {
        
        let targetIdSplit = e.target.id.split('_'); //id = "edit_101" or id = "del_101"
        let nodeID = parseInt(targetIdSplit[1]); //101
        
        let edit = `edit_${targetIdSplit[1]}`; //"edit_101" 
        let del = `del_${targetIdSplit[1]}`; //"del_101"

        if(e.target.id === edit){
            console.log(nodeID);
            //display edit modal
            displayEditModal();
            editEntry(nodeID);
            console.log(inventory.values());    

        }else if(e.target.id === del){
            deleteEntry(nodeID);
            console.log(inventory.values());
            
        }else{
            console.log('nothing detected');
        }   
    });
};





//https://github.com/laelsdaddy/Inventory-App.git



