import { z } from "zod";

export const orderBySchema = z.enum(["latest", "hit"]);
export type OrderBy = z.infer<typeof orderBySchema>;

export const blogFilterSchema = z.object({
  category: z.string().optional(),
  tags: z.string().array().optional(),
  orderby: orderBySchema.optional(),
});
export type BlogFilter = z.infer<typeof blogFilterSchema>;
