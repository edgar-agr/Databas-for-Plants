const User = require('../models/users');

exports.getUsers = (req,res,next)=>{
    User.find()
        .then(users =>{
            res.render('user/users',{
                users:users
            });
        })
        .catch(err =>{
            console.log(err);
        })
};

exports.getAdduser = (req,res,next) =>{
    res.render('user/userFormat',{
        firstName:'',
        lastName:'',
        phone:'',
        email:'',
        address:{
            street:'',
            city:'',
            country:'',
            zip:'',
        },
        role:'',
        id:'',
        toDo:'Add'
    })
};
 
exports.postUser = (req,res,next) =>{
    const firstName = req.body.firstName;
    const lastName  = req.body.lastName;
    const phone     = req.body.phone;
    const email     = req.body.email;
    const street    = req.body.street;
    const city      = req.body.city;
    const zip       = req.body.zip;
    const country   = req.body.country;
    const role      = req.body.role;
    const id        = req.body.id;

    const info = {
        firstName:firstName,
        lastName:lastName,
        phone:phone,
        email:email,
        address:{
            street:street,
            city:city,
            country:country,
            zip:zip
        },
        role:role
    }

    if(!id){
        const user =  new User(info);
        user.save()
            .then(result=>{
                res.redirect('/users');
            })
            .catch(err=>{
                console.log(err);
            });
    }
    User.findByIdAndUpdate(id,info)
        .then(result =>{
            res.redirect('/users');
        })
        .catch(err =>{
            console.log(err)
        })
};

exports.getEditUser = (req,res,next) =>{
    const id = req.params.id;

    User.findById(id)
        .then(result=>{
            if(!result){
                res.redirect('users');
            };

            res.render('user/userFormat',{
                firstName:result.firstName,
                lastName:result.lastName,
                phone:result.phone,
                email:result.email,
                address:{
                    street: result.address.street,
                    city: result.address.city,
                    country: result.address.country,
                    zip: result.address.zip,
                },
                role:result.role,
                id:result._id,
                toDo:'Edit'
            });
        })
        .catch(err=>{
            console.log(err);
        });
};

exports.deleteUser = (req,res,next) =>{
    const id = req.body.id;

    User.findByIdAndDelete(id)
        .then(result =>{
            res.redirect('/users');
        })
        .catch(err =>{
            console.log(err)
        })
};
