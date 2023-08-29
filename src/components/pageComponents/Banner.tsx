import BackgroundImg from "../../assets/banner.jpg";
export default function Banner() {
  return (
    <div
      className="banner-container bg-cover bg-center"
      style={{
        backgroundImage: `url(${BackgroundImg})`,
        fontFamily: "'Kalam', cursive",
      }}
    >
      <div className="pt-96 pb-96">
        <h3 className="text-white text-center">
          Welcome to the world of books
        </h3>
      </div>
    </div>
  );
}
