import logoXl from "../assets/logo-xl.png";
import instagram from "../assets/instagram.png";
import facebook from "../assets/facebook.png";
import twitter from "../assets/twitter.png";

export default function Footer() {
  return (
    <footer className="bg-[#1e4d3b] text-white py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <img
            src={logoXl}
            alt="KeenKeeper"
            className="h-8 w-auto brightness-0 invert"
          />
          <span className="text-3xl font-bold">
            <span className="font-light">Keen</span>Keeper
          </span>
        </div>

        {/* Tagline */}
        <p className="text-gray-300 text-sm max-w-md mx-auto mb-6">
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>

        {/* Social Links */}
        <p className="font-semibold mb-3">Social Links</p>
        <div className="flex justify-center gap-3 mb-8">
          <a href="#">
            <img src={instagram} alt="Instagram" />
          </a>
          <a href="#">
            <img src={facebook} alt="Facebook" />
          </a>
          <a href="#">
            <img src={twitter} alt="Twitter" />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white border-opacity-20 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-gray-300">
          <span>© 2026 KeenKeeper. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
