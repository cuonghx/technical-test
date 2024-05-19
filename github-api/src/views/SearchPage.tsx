import { SearchInput } from "../components/search-input/SearchInput";
import { useAppStore } from "../store";
import { ReactTableVirtualized } from "../components/table-virtualized/TableVirtualized";
// import { TableComponent } from "../components/table/Table";

export const SearchPage = () => {
  const { usersStore } = useAppStore();
  const { users } = usersStore.getters;
  return (
    <div className="container px-48 sm:px-24 mx-auto pt-12">
      <div className="mx-auto px-6 lg:px-8 pb-8">
        <div className="mx-auto lg:mx-0 text-center">
          <h3 className="text-4xl font-bold tracking-tight sm:text-4xl">
            GitHub - Search User
          </h3>
        </div>
      </div>
      <SearchInput />
      {/* <div className="overflow-x-auto mt-2">
        <TableComponent />
      </div> */}
      <div className="overflow-x-auto mt-2">
        <ReactTableVirtualized items={users} />
      </div>
    </div>
  );
};
