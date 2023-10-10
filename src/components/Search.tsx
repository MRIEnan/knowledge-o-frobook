import { Button } from "@/components/ui/button";
import { SearchBox } from "@/components/ui/searchBox";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ForwardedRef, FunctionComponent } from "react";

interface SearchProps {
  myRef: ForwardedRef<HTMLInputElement | string>;
  handleOnSearch?: () => void;
  handleOnChange?: () => void;
}

const Search: FunctionComponent<SearchProps> = ({
  myRef,
  handleOnSearch,
  handleOnChange,
}) => {
  return (
    <div className="flex w-full m-auto max-w-sm items-center space-x-2">
      <SearchBox
        type="text"
        className="shadow-inner"
        placeholder="Search book..."
        onChange={() => (handleOnChange ? handleOnChange() : () => {})}
        ref={myRef as ForwardedRef<HTMLInputElement>}
      />
      <div
        onClick={() => {
          handleOnSearch ? handleOnSearch() : () => {};
        }}
      >
        <Button type="submit" className="shadow-inner">
          <MagnifyingGlassIcon />
        </Button>
      </div>
    </div>
  );
};

export default Search;
