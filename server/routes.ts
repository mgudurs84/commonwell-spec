import type { Express } from "express";
import { createServer, type Server } from "http";
import { apiCategories } from "./data/api-endpoints";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to get all categories with their endpoints
  app.get("/api/categories", (_req, res) => {
    res.json(apiCategories);
  });

  // API endpoint to get a specific category by ID
  app.get("/api/categories/:id", (req, res) => {
    const category = apiCategories.find(cat => cat.id === req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  });

  const httpServer = createServer(app);

  return httpServer;
}
