import "./config/env";
import "./config/redis";
import { env } from "./config/env";
import app from "./app";

app.listen(env.PORT, () => {
  console.log(`🚀 Server running on port ${env.PORT}`);
});
