import { useInfiniteQuery } from "@tanstack/react-query";
import { State } from "../interfaces";
import { getIssues } from "../actions";

type Props = {
  state: State;
  selectedLabels: string[];
}

export const useIssuesInfinite = ({ state, selectedLabels }: Props) => {

  const issuesQuery = useInfiniteQuery({
    queryKey: ["issues", "infinite", { state, selectedLabels }],
    queryFn: ({pageParam,queryKey})=>{

      const [,, args] = queryKey;
      const { state, selectedLabels } = args as Props;

      return getIssues({ state, selectedLabels, page: pageParam })
    },
    staleTime: 1000 * 60,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => lastPage.length > 0
      ? allPages.length + 1 
      : undefined
  });


  return {
    issuesQuery,
  };
};
