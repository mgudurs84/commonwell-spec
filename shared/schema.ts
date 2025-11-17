import { z } from "zod";

export interface ApiEndpoint {
  id: string;
  title: string;
  method: string;
  endpoint: string;
  description: string;
  category: string;
  request: string;
  response: string;
  searchParams?: string[];
}

export interface ApiCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  endpoints: ApiEndpoint[];
}

export const apiEndpointSchema = z.object({
  id: z.string(),
  title: z.string(),
  method: z.string(),
  endpoint: z.string(),
  description: z.string(),
  category: z.string(),
  request: z.string(),
  response: z.string(),
  searchParams: z.array(z.string()).optional(),
});

export const apiCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  color: z.string(),
  endpoints: z.array(apiEndpointSchema),
});

export type ApiEndpointType = z.infer<typeof apiEndpointSchema>;
export type ApiCategoryType = z.infer<typeof apiCategorySchema>;
