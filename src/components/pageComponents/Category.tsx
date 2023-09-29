import findCategory from "../../assets/findCategory.jpg";
import genres from "../../assets/genres.jpg";
import nonFiciton from "../../assets/non-fiction.jpg";
import romance from "../../assets/romance.jpg";
import sciFi from "../../assets/sci-fi.jpg";
export default function Category() {
  return (
    <div
      className="block md:flex text-center my-10"
      style={{ fontFamily: "'Kalam', cursive" }}
    >
      <div
        className="hidden md:flex bg-cover bg-center relative flex-1"
        style={{
          backgroundImage: `url(${findCategory})`,
        }}
      >
        <div className="absolute left-0 bottom-0 bg-black/30 backdrop-brightness-75 w-full h-full">
          <p className="text-white text-left text-2xl md:text-4xl lg:text-6xl absolute left-10 bottom-10">
            Find Your <br />
            Genre.
          </p>
        </div>
      </div>
      <div className="p-20 text-center flex-1">
        <div className="grid grid-col lg:grid-cols-2">
          {/* Single Image */}
          <div className="flex justify-center items-center rounded-4xl m-4">
            <div
              className="w-full h-full bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `url(${genres})`,
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              <div
                className="w-full h-full flex  justify-center items-center 
             bg-black/30 backdrop-brightness-75 rounded-lg"
              >
                <span className="text-white text-4xl md:text-2xl lg:text-4xl text-center py-28">
                  Genres
                </span>
              </div>
            </div>
          </div>

          {/* Single Image */}

          <div className="flex justify-center items-center rounded-4xl m-4">
            <div
              className="w-full h-full bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `url(${nonFiciton})`,
              }}
            >
              <div
                className="w-full h-full flex  justify-center items-center 
             bg-black/30 backdrop-brightness-75 rounded-lg"
              >
                <span className="text-white text-4xl md:text-2xl lg:text-4xl text-center py-28">
                  Non-fiction
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center rounded-4xl m-4">
            <div
              className="w-full h-full bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `url(${sciFi})`,
              }}
            >
              <div
                className="w-full h-full flex  justify-center items-center 
                bg-black/30 backdrop-brightness-75 rounded-lg"
              >
                <span className="text-white text-4xl md:text-2xl lg:text-4xl text-center py-28">
                  Sci-Fi
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center rounded-4xl m-4">
            <div
              className="w-full h-full bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `url(${romance})`,
              }}
            >
              <div
                className="w-full h-full flex  justify-center items-center 
             bg-black/30 backdrop-brightness-75 rounded-lg"
              >
                <span className="text-white text-4xl md:text-2xl lg:text-4xl text-center py-28">
                  Romance
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
