import express from "express";
import { getItemDetail, getItems, upsertItem } from "./items.service";
import { validate } from "../../middleware/validation.middleware";
import { itemPOSTRequestSchema } from "../types";

export const itemsRouter = express.Router();

itemsRouter.get("/",async (req,res) => {
  const items = await getItems();
  items.forEach((item)=>{
    item.imageUrl = buildImageUrl(req,item.id);
  });
  res.json(items);
});

itemsRouter.get("/:id",async(req,res)=>{
  const id = parseInt(req.params.id);
  const item = await getItemDetail(id);
  if(item != null){
    item.imageUrl = buildImageUrl(req,item.id);
    res.json(item);
  }else{
    res.status(404).send("<h1>Id non valido</h1>");
  }
});

itemsRouter.post("/",validate(itemPOSTRequestSchema), async(req,res) => {
  const data = itemPOSTRequestSchema.parse(req);
  const newItem = await upsertItem(data.body);

  if(newItem != null){
    res.status(201).json(newItem);
  }else{
    res.status(500).json({message: "ERRORI CON POST"});
  }

}); 

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
function buildImageUrl(req: any, id: number): string {
  return `${req.protocol}://${req.get("host")}/images/${id}.jpg`;
}
