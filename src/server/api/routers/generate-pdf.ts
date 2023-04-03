import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { chromium } from "playwright";
import { z } from "zod";

export const generatePdfRouter = createTRPCRouter({
  generatePdf: publicProcedure
    .input(
      z.object({
        movieData: z.object({
          Title: z.string(),
          Director: z.string(),
          Year: z.string(),
          Actors: z.string(),
          Poster: z.string(),
        }),
      })
    )
    .query(async ({ input }) => {
      const { movieData } = input;
      const browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();

      const htmlContent = `<div>
        <h1>${movieData.Title}</h1>
        <p>Director: ${movieData.Director}</p>
        <p>Year: ${movieData.Year}</p>
        <p>Actors: ${movieData.Actors}</p>
        <img src="${movieData.Poster}" alt="${movieData.Title} Poster" width="400" height="400" />
      </div>`;

      await page.setContent(htmlContent);
      const pdfBuffer = await page.pdf({
        format: "A4",
        path: `${movieData.Title}.pdf`,
      });

      await browser.close();

      return {
        pdfBuffer: pdfBuffer.toString("base64"),
      };
    }),
});
