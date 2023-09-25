import "./Banner.css";
import BannerImg from "../../assets/images/banner.jpg";

const Banner = ({ title }) => {
  return (
    <div className="banner">
      <div className="dark-overlay"></div>
      <img src={BannerImg} alt="banner" />
      <h1>{title}</h1>
    </div>
  );
};

export default Banner;
