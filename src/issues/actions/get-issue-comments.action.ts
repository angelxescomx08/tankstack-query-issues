import { githubApi } from "../../api/github.api";
import { sleep } from "../../helpers";
import { GithubIssue } from "../interfaces";

export const getIssueComments = async (issueNumber: number) => {
  await sleep(1000);

  const { data } = await githubApi.get<GithubIssue[]>(
    `/issues/${issueNumber}/comments`
  );

  return data;
};
