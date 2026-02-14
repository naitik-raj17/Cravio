import Item from "../models/items.model.js"
import Shop from "../models/shop.model.js"

import uploadOnCloudinary from "../utils/cloudinary.js";
export const addItem = async (req, res) => {
  try {
    const { name, category, foodType, price } = req.body;
    if (!name?.trim()) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!category?.trim()) {
      return res.status(400).json({ message: "Please select a category" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Food image is required" });
    }
    const image = await uploadOnCloudinary(req.file.path);
    if (!image) {
      return res.status(500).json({ message: "Image upload failed" });
    }
    const shop = await Shop.findOne({ owner: req.userId });
    if (!shop) {
      return res.status(400).json({ message: "shop not found" });
    }

    const item = await Item.create({
      name: name?.trim(),
      category: category?.trim(),
      foodType,
      price: Number(price) || 0,
      image,
      shop: shop._id,
    });

    shop.items.push(item._id);
    await shop.save();
    await shop.populate("items owner")
    return res.status(201).json(shop)
    // const updatedShop = await Shop.findById(shop._id).populate("items");
    // return res.status(201).json(updatedShop);
  } catch (error) {
    return res.status(500).json({ message: `add item error ${error.message}` });
  }
};

export const editItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const { name, category, foodType, price } = req.body;
    const updateData = {
      ...(name !== undefined && { name: name?.trim() }),
      ...(category !== undefined && { category: category?.trim() }),
      ...(foodType !== undefined && { foodType }),
      ...(price !== undefined && { price: Number(price) || 0 }),
    };
    if (req.file) {
      const image = await uploadOnCloudinary(req.file.path);
      if (image) updateData.image = image;
    }
    const item = await Item.findByIdAndUpdate(itemId, updateData, { new: true });
    if (!item) {
      return res.status(400).json({ message: "Item not found" });
    }
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: `edit Item error ${error.message}` });
  }
};
