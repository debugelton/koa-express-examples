const Koa = require("koa");
const Router = require("koa-router");
const mongo = require('koa-mongo')

const app = new Koa();
const router = new Router();

app.use(async function handleError(context, next) {
  try {
    await next();
  } catch (error) {
    context.status = 500;
    context.body = error;
  }
});

app.use(mongo({
  host: 'localhost',
  port: 27017,
  db: 'test',
}));

router
  .get("/:id", async (context, next) => {
    const { id } = context.params;
    const result = await context.db.collection('users').insertOne({ name: 'haha' })
    const userId = result.ops[0]._id.toString()
    context.body = await context.db.collection('users').find().toArray();
  })
  .get("/", async (context, next) => {
    context.body = await context.db.collection('users').find().toArray();;
  });

// mount the router to our web application
app.use(router.routes());
app.use(router.allowedMethods());

// launch the server
app.listen(3000);