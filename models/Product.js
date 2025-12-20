import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    userId:{type: String, required:true},
    name: {type: String, required:true},
    description: {type: String, required:true},
    price: {type: Number, required:true},
    offerPrice: {type: Number, required:true},
    image: {type: Array, required:true},
    category:{type: String, required:true},
    date: {type: Date, default: Date.now ,required:true}
})

const Product = mongoose.models.product|| mongoose.model('product', ProductSchema);

export default Product;