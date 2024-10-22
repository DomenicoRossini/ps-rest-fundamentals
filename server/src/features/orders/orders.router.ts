import express from "express";

import { addOrderItems, getOrderDetail, getOrders } from "./orders.service";
import { validate } from "../../middleware/validation.middleware";
import { orderItemsDTORequestSchema, pagingRequestSchema } from "../types";

export const ordersRouter = express.Router();

//45b23d49-7297-43da-b853-3c7f42c7da6a
ordersRouter.post("/:id/items", validate(orderItemsDTORequestSchema),async(req,res) => {
  const data = orderItemsDTORequestSchema.parse(req);
  const newOrder = await addOrderItems(data.params.id,data.body);
  if(newOrder!=null){
    res.status(201).json(newOrder);
  }else{
    res.status(500).json({message: "PROBLEMISSIMI"});
  }
});


ordersRouter.get("/", validate(pagingRequestSchema),async (req , res) => {
  const data = pagingRequestSchema.parse(req);
  const orders = await getOrders(data.query.skip,data.query.take);
  res.json(orders);

    /*
    const query = req.query;
    const take = query.take;
    const skip = query.skip;

    //validation
    if(take && typeof take === "string" && parseInt(take) > 0 && skip && typeof skip==="string" && parseInt(skip)>-1){
        const orders = await getOrders(parseInt(skip),parseInt(take));
        res.json(orders);
    }else{
        res.json({message : "PROBLEMI PROBLEMI"})
    }
    */
  });
  
  /*ordersRouter.get("/:id",async(req,res)=>{
    const id = parseInt(req.params.id);
    const item = await getOrderDetail(id);
    if(item != null){
      item.imageUrl = buildImageUrl(req,item.id);
      res.json(item);
    }else{
      res.status(404).send("<h1>Id non valido</h1>");
    }
  });*/
