import { githubApi } from "../../api/github.api";
import { sleep } from "../../helpers";
import { GithubIssue } from "../interfaces";

export const getIssue = async (issueNumber: number) => {
  await sleep(1000);

  const { data } = await githubApi.get<GithubIssue>(`/issues/${issueNumber}`);

  return data;
};
