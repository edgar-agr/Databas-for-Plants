const Plant = require('../models/plants');

exports.getPlants = (req,res,next) =>{
    Plant.find()
    .then(plants =>{
        res.render('plants/plants',{
            plants:plants
        });
    })
    .catch(err =>{
        console.log(err)
    })
    
};

exports.addPlant = (req,res,next) => {
    res.render('plants/plantFormat',{
        name:'',
        price:'',
        ecosystem:'Forest',
        imgUrl: '',
        description:'',
        toDo:"Add plant!",
        id:''
    });
}

exports.postPlant = (req,res,next) =>{
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const imgUrl = req.body.imgUrl;
    const ecosystem = req.body.ecosystem;
    const id = req.body.id;

    if(!id){
        const plant = new Plant({
            name:name,
            price:price,
            description:description,
            imgUrl:imgUrl,
            ecosystem:ecosystem,
        });
        plant.save()
            .then(result=>{
                res.redirect('/');
            })
            .catch(err=>{
                console.log(err);
            }); 
    }

    Plant.findById(id)
        .then(result =>{
            result.name = name;
            result.price = price;
            result.description = description;
            result.imgUrl = imgUrl;
            result.ecosystem = ecosystem;
            return result.save();
        })
        .then(result=>{
            res.redirect('/');
        })
        .catch(err=>{
            console.log(err);
        });    
};

exports.getPlant = (req,res,next) =>{
const id = req.params.id;
   Plant.findById(id)
   .then(plant =>{
        console.log(plant.description)
        res.render('plants/plantFormat',{
            name:plant.name,
            price:plant.price,
            ecosystem:plant.ecosystem,
            imgUrl: plant.imgUrl,
            description:plant.description,
            toDo:"Update!",
            id:plant._id
    });
   })
   .catch(err =>{
       console.log(err);
   })

};

exports.deletePlant = (req,res,next) =>{
    const id = req.params.id;
    Plant.findByIdAndDelete(id)
        .then(result =>{
            res.redirect('/');
        })
        .catch(err=>{
            console.log(err);
        })
};  