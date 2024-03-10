import { useEffect, useState } from "react";
import { LuChevronsUp, LuMenu, LuMoveUp } from "react-icons/lu";

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed z-50 cursor-pointer rounded-full border bg-zinc-800 p-3 transition-all duration-300 hover:-translate-y-1 hover:scale-105 ${
        scrollY > 100 ? "bottom-5 right-5" : "bottom-[-100px] right-5"
      }`}
      onClick={scrollToTop}
    >
      <LuChevronsUp className="text-4xl text-white transition-all" />
    </div>
  );
};

export default ScrollToTopButton;
