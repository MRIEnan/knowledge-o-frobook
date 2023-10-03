import { Button } from "@/components/ui/button";
import { SearchBox } from "@/components/ui/searchBox";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export function Search() {
  return (
    <div className="flex w-full m-auto max-w-sm items-center space-x-2">
      <SearchBox
        type="text"
        className="shadow-inner"
        placeholder="Search book..."
      />
      <Button type="submit" className="shadow-inner">
        <MagnifyingGlassIcon />
      </Button>
    </div>
  );
}
