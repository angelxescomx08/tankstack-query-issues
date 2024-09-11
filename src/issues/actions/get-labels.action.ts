import { githubApi } from "../../api/github.api";
import { sleep } from "../../helpers";
import { GithubLabel } from "../interfaces";

export const getLabels = async () => {
  await sleep(1000);
  
  const { data } = await githubApi.get<GithubLabel[]>('/labels');

  return data;
}