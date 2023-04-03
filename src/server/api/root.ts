import { generatePdfRouter } from "@/server/api/routers/generate-pdf";
import { createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  generatePdf: generatePdfRouter,
});

export type AppRouter = typeof appRouter;
