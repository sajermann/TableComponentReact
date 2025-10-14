import { memo } from "react";
import { getEnv } from "~/utils/getEnv";

export const Version = memo(() => {
  const [
    DEPLOY_TIME,
    COMMIT_HASH,
    COMMIT_SHORT_HASH,
    COMMIT_MESSAGE,
    COMMIT_AUTHOR,
    BRANCH_NAME,
    LAST_COMMIT_DATE,
    TOTAL_COMMITS,
    MODE,
  ] = getEnv(
    "VITE_DEPLOY_TIME",
    "VITE_COMMIT_HASH",
    "VITE_COMMIT_SHORT_HASH",
    "VITE_COMMIT_MESSAGE",
    "VITE_COMMIT_AUTHOR",
    "VITE_BRANCH_NAME",
    "VITE_LAST_COMMIT_DATE",
    "VITE_TOTAL_COMMITS",
    "VITE_MODE"
  );
  console.table({
    MODE,
    DEPLOY_TIME,
    COMMIT_HASH,
    COMMIT_SHORT_HASH,
    COMMIT_MESSAGE,
    COMMIT_AUTHOR,
    BRANCH_NAME,
    LAST_COMMIT_DATE,
    TOTAL_COMMITS,
  });
  return null;
});
