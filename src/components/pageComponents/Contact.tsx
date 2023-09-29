import contact from "../../assets/contact.png";
export default function Contact() {
  return (
    <div className="flex text-center text-white my-10 mt-20">
      <div className="flex-1 bg-black text-left">
        <div className="pl-10">
          <div>
            <h2 className="py-28 text-4xl">For More Information.</h2>
          </div>
          <div
            className="text-xl font-light"
            style={{
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            <div className="py-5">
              <p>Social Media</p>
              <p>@example</p>
            </div>
            <div className="py-5">
              <p>Email</p>
              <p>example@gmail.com</p>
            </div>
            <div className="py-5">
              <p>Phone Number</p>
              <p>+8801700000000</p>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex flex-1 w-full h-full">
        <img src={contact} alt="Contact Image" />
      </div>
    </div>
  );
}
