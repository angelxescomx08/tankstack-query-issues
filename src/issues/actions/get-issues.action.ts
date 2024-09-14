import { githubApi } from "../../api/github.api";
import { sleep } from "../../helpers";
import { GithubIssue, State } from "../interfaces";

type Props = {
  state: State;
  selectedLabels: string[];
};

export const getIssues = async ({ state, selectedLabels }: Props) => {
  await sleep(1000);

  const params = new URLSearchParams();

  if (state !== State.All) {
    params.append("state", state);
  }

  if (selectedLabels.length > 0) {
    params.append("labels", selectedLabels.join(","));
  }

  const { data } = await githubApi.get<GithubIssue[]>("/issues",{
    params,
  });

  return data;
};
