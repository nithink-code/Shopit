import "../styles/Footer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <div className="footer">
      <div className="socialMedia">
        <InstagramIcon style={{ color: "white", marginRight: "1rem" }} />
        <FacebookIcon style={{ color: "white", marginRight: "1rem" }} />
        <LinkedInIcon style={{ color: "white", marginRight: "1rem" }} />
      </div>
      <div className="companyName">&copy; Shopit Private Limited</div>
      <div className="privacyPolicies">
        <a>Privacy</a>
        <a>Terms</a>
      </div>
    </div>
  );
}
