import { Link } from "react-router-dom";
import BackgroundImg from "../../assets/banner.jpg";
import { useAppSelector } from "../../redux/hook";
export default function Banner() {
  const { email } = useAppSelector((state) => state.auth.user);
  return (
    <div
      className="banner-container bg-cover bg-center h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${BackgroundImg})`,
        fontFamily: "'Kalam', cursive",
      }}
    >
      <div className="">
        <h3 className="text-white text-center">
          <span className="text-8xl">Welcome</span>
          <br /> <span className="text-2xl py-10">to the world of</span>
          <br />
          <span className="text-8xl">Books</span>
        </h3>
        <div className="text-white text-center mt-10">
          {email ? (
            <button className="btn bg-white text-black">
              <Link to="/allBooks">All Books</Link>
            </button>
          ) : (
            <button className="btn bg-white text-black">
              <Link to="/signup">Join Now</Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
