import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema({
  quote: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Quote || mongoose.model("Quote", QuoteSchema);
