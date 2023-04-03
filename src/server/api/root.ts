import { createTRPCRouter } from '@/server/api/trpc';
import { generatePdfRouter } from '@/server/api/routers/generate-pdf';

export const appRouter = createTRPCRouter({
  generatePdf: generatePdfRouter,
});

export type AppRouter = typeof appRouter;