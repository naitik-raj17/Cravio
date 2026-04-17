import Item from "../models/items.model.js"
import Shop from "../models/shop.model.js"

import uploadOnCloudinary from "../utils/cloudinary.js";
export const addItem = async (req, res) => {
  try {
    const { name, category, foodType, price } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }
    const shop = await Shop.findOne({ owner: req.userId }).populate("items");
    if (!shop) {
      return res.status(400).json({ message: "shop not found" });
    }

    const items = await Item.create({
      name,
      category,
      foodType,
      price,
      image,
      shop: shop._id,
    });

    shop.items.push(items._id);
    await shop.save();
    (await shop.populate("owner")).populate({
      path:"items",
      options:{sort:{updatedAt:-1}}
    });

    return res.status(201).json(shop);
  } catch (error) {
    return res.status(500).json({ message: `add item error ${error}` });
  }
};

export const editItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const { name, category, foodType, price } = req.body;
    const update = {
      name,
      category,
      foodType,
      price: price !== undefined && price !== "" ? Number(price) : undefined,
    };
    if (req.file) {
      update.image = await uploadOnCloudinary(req.file.path);
    }
    Object.keys(update).forEach((key) => update[key] === undefined && delete update[key]);

    const items = await Item.findByIdAndUpdate(itemId, update, {
      new: true,
      runValidators: true,
    });
    if (!items) {
      return res.status(400).json({ message: "Item not found" });
    }
    const shop = await Shop.findOne({owner:req.userId}).populate({
      path:"items",
      options:{sort:{updatedAt:-1}}
    })
    return res.status(200).json(shop);
  } catch (error) {
    return res.status(500).json({ message: `edit Item error ${error}` });
  }
};


export const getItemById = async(req,res)=>{
  try{
    const itemId = req.params.itemId
    const items =  await Item.findById(itemId)
    if(!items){
      return res.status(400).json({message: "item not found"})
    }    

    return res.status(200).json(items)
  }
  catch(error){
    return res.status(500).json({ message: `edit Item error ${error}` });
  }
}

export const deleteItem = async(req,res)=>{
  try{
    const itemId = req.params.itemId
    const item = await Item.findByIdAndDelete(itemId)
    if(!item){
      return  res.status(400).json({
        message:"item not found"
      })
    }

    const shop = await Shop.findOne({owner:req.userId})
    shop.items = shop.items.filter(i=>i._id!==item._id)
    await shop.save()
    shop.populate({
      path:"items",
      options:{sort:{updatedAt:-1}}
    })
    return res.status(200).json(shop)

  }catch(error){
      return res.status(500).json({message: `delete item error`})
  }
}