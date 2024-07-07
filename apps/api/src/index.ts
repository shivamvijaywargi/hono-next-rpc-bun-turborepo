import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono();

const route = app
  .get("/", (c) => {
    const data = "Hello from API";

    return c.json({
      success: true,
      data,
    });
  })
  .post(
    "/posts",
    zValidator(
      "form",
      z.object({
        title: z.string(),
        description: z.string(),
      })
    ),
    (c) => {
      const body = c.req.valid("form");

      const { description, title } = body;

      console.log(description, title);

      return c.json(
        {
          ok: true,
          message: "Created!",
        },
        201
      );
    }
  );

export type AppType = typeof route;

export default {
  port: 5500,
  fetch: app.fetch,
};
