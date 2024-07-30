import { Application, Router } from "https://deno.land/x/oak@v12.5.0/mod.ts";

const app = new Application();
const router = new Router();

router.get("/", (context:any) => {
  context.response.body = "Hello, Deno!";
});

router.get("/api", (context:any) => {
  context.response.body = { message: "Hello from the API!" };
});

router.post("/api", async (context:any) => {
    const body = await context.request.body();
    const data = await body.value;
    context.response.body = { message: "Data received", data };
});


app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server is running on http://localhost:8000");
app.listen({ port: 8000 });
