import Banner from "../components/pageComponents/Banner";
import Category from "../components/pageComponents/Category";
import Contact from "../components/pageComponents/Contact";
import LatestBooks from "../components/pageComponents/LatestBooks";

export default function Home() {
  return (
    <div
      style={{
        background: "rgba(255, 194, 139, 0.30)",
        fontFamily: "'Kalam', cursive",
      }}
    >
      <Banner />
      <LatestBooks />
      <Category />
      <Contact />
    </div>
  );
}
