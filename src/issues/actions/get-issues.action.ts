import { githubApi } from "../../api/github.api";
import { sleep } from "../../helpers";
import { GithubIssue, State } from "../interfaces";

type Props = {
  state: State;
};

export const getIssues = async ({ state }: Props) => {
  await sleep(1000);

  const params = new URLSearchParams();

  if (state !== State.All) {
    params.append("state", state);
  }

  const { data } = await githubApi.get<GithubIssue[]>("/issues",{
    params,
  });

  return data;
};
