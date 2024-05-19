import { useAppStore } from "@/store";
import { UserSkeletonLoading } from "../shared/UserSkeletonLoading";

export interface ISearchStatusProps {
  query: string;
}

export function SearchStatus(props: ISearchStatusProps) {
  const { query } = props;
  const { usersStore } = useAppStore();
  const { loading, users, error } = usersStore.getters;
  if (loading) return <UserSkeletonLoading />;
  if (error) return <div className="pl-4 pt-4">{error}</div>;
  if (query.length >= 3 && !loading && users.length === 0)
    return (
      <div className="pl-4 pt-4">
        Not found <span className="font-bold">{query}</span>
      </div>
    );
  return <></>;
}
