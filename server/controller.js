
let houseId;
const houseDatabase = require('./db.json')

module.exports = {
    getHouses: (req,res)=>{
        res.status(200).send(houseDatabase);

    },
    createHouse: (req,res)=>{
        const { address, price, imageURL} = req.body;
        const addHouse = {
            id:houseId,
            address: address,
            price,//you can just put once when the key and value are same name. eg:price:price,
            imageURL: imageURL
        }
        houseDatabase.push(addHouse)
        houseId++;
        res.status(200).send(houseDatabase);
    },

    updateHouse: (req,res)=>{
        let updateId = +req.params.id;
        // type = req.body.type;      will try deconstructing
         const {type} = req.body;
       
        const indexToUpdate = houseDatabase.findIndex((num) => num.id === updateId);
         let i = indexToUpdate;
        //console.log(indexToUpdate);
        if( indexToUpdate=== undefined){
            res.status(400).send("movie not found");
        }else if(type==="plus"){
            houseDatabase[i].price+=  10000;
            res.status(200).send(houseDatabase);
        }else if(type=== "minus"){
            houseDatabase[i].price-= 10000;
            res.status(200).send(houseDatabase);

        }else{
            res.status(400).send("invalid content");
            //OR res.sendStatus(400)
        }
        //console.log(houseDatabase[i].price)

    },

    deleteHouse: (req,res)=>{
            let deleteId = +req.params.id;
            // cand use findIndx like in updateindex
            for (let i = 0; i < houseDatabase.length; i++) {
                if (deleteId===houseDatabase[i].id){
                    houseDatabase.splice(i,1);
                    res.status(200).send(houseDatabase);
                    return;
                }               
            }res.status(400).send("No house found to delete");

        
    },


}

// curl -X POST -H "Content-Type: application/json" \
//     -d '{"name": "dj", "song": "party in the usa"}' \
//     https://5rg51h-8080.csb.app/api/song