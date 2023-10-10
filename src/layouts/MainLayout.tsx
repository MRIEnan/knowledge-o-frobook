import Wishlist from "@/pages/WishList";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function MainLayout() {
  const [isWishListOpen, setIsWishListOpen] = useState<boolean>(false);
  return (
    <div>
      <Navbar setIsWishListOpen={setIsWishListOpen} />
      <div>
        <Wishlist
          isWishListOpen={isWishListOpen}
          setIsWishListOpen={setIsWishListOpen}
        />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
