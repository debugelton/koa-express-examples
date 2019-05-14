const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

// unlike in Express.js
// – declare our error middleware to the top most position
// – this will ensure to catch all the errors
//   that might happen in the following middleware call
app.use(async function handleError(context, next) {
  // call our next middleware
  try {
    await next();
    // catch any error that might have occurred
  } catch (error) {
    context.status = 500;
    context.body = error;
  }
});

router
  .get("/:id", async (context, next) => {
    const { id } = context.params;
    const firstResult = await database.doStuff(id);
    const finalResult = await database.doAnotherStuff(firstResult);
    context.body(finalResult);
  })
  .get("/", async (context, next) => {
    const firstResult = await database.doStuff();
    const finalResult = await database.doAnotherStuff(firstResult);
    context.body(finalResult);
  });

// mount the router to our web application
app.use(router.routes());
app.use(router.allowedMethods());

// launch the server
app.listen(3000);