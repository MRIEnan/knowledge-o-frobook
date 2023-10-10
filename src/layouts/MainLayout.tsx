import Wishlist from "@/pages/WishList";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";

export default function MainLayout() {
  const { _id: uId } = useAppSelector((state) => state.user);
  const [isWishListOpen, setIsWishListOpen] = useState<boolean>(false);
  return (
    <div>
      <Navbar setIsWishListOpen={setIsWishListOpen} />
      <div>
        {uId && (
          <Wishlist
            isWishListOpen={isWishListOpen}
            setIsWishListOpen={setIsWishListOpen}
          />
        )}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
