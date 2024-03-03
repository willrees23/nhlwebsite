import { Poppins } from "next/font/google";
import localFont from "next/font/local";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
});

const nhlFont = localFont({
  variable: "--font-nhl",
  src: "../../public/font/NHL.ttf",
});

export { poppins, nhlFont };
