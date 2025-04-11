
const InitializeModels=()=>{
    require('./user/users.model');  
    require('./delivery-request/delivery.model');
    require('./let-me-deliver/letMeDeliver.model');
    require('./delivery-contract/deliveryContracts.model')
}

module.exports=InitializeModels;
