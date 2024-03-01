import desktopLogo from "../../assets/images/amazon-logo.png";
import { Link } from "react-router-dom";

const FormHeader = () => {
  return (
    <>
      <header className="container h-16 flex justify-center items-center">
        <Link to="/">
          <img className="w-24" src={desktopLogo} />
        </Link>
      </header>
    </>
  );
};

export default FormHeader;
