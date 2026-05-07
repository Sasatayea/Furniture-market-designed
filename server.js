import cors from "cors";
import express from "express";
import Stripe from "stripe";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

console.log("🔥 THIS IS MY SERVER FILE");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/furniture")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

const furnitureSchema = new mongoose.Schema({}, { strict: false });
const Furniture = mongoose.model("Furniture", furnitureSchema, "furniture");

app.get("/furniture", async (req, res) => {
  try {
    const data = await Furniture.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.get("/", (req, res) => {
  res.send("API is working ✅");
});

// Do not forget to type your secret API key here.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { cart } = req.body;

    const line_items = cart.map((item) => ({
      price_data: {
        currency: "usd",

        product_data: {
          name: item.title || "Product", 
          images: item.images?.length ? [item.images[0]] : [],
        },

        unit_amount: Math.round((item.price || 0) * 100),
      },

      quantity: item.qty || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.log("Stripe Error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
