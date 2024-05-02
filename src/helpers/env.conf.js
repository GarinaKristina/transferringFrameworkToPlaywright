import "dotenv/config";
import { cleanEnv, str } from "envalid";

export const ENV_READER = cleanEnv(process.env, {
  SEED_DEFAULT_USER_PASSWORD: str(),
});
