import React from "react";
import { Linkedin, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";

const Footer = () => {
  return (
    <footer className=" border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 group mb-4"
            >
              <img
                src={logo}
                alt="Logo"
                className="h-7 w-7 group-hover:scale-110 transition-transform duration-300"
              />
              <span className="text-xl font-bold text-white">
                redesignr
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                  .ai
                </span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              AI-powered website redesigns that look amazing and convert better.
            </p>
          </div>

          {/* Languages */}
          <div>
            <h4 className="font-semibold mb-4">Languages</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="/landing-es.html" className="hover:text-white transition-colors">🇪🇸 Español</a></li>
              <li><a href="/landing-fr.html" className="hover:text-white transition-colors">🇫🇷 Français</a></li>
              <li><a href="/landing-de.html" className="hover:text-white transition-colors">🇩🇪 Deutsch</a></li>
              <li><a href="/landing-it.html" className="hover:text-white transition-colors">🇮🇹 Italiano</a></li>
              <li><a href="/landing-br.html" className="hover:text-white transition-colors">🇧🇷 Português</a></li>
              <li><a href="/landing-jp.html" className="hover:text-white transition-colors">🇯🇵 日本語</a></li>
              <li><a href="/landing-kr.html" className="hover:text-white transition-colors">🇰🇷 한국어</a></li>
              <li><a href="/landing-cn.html" className="hover:text-white transition-colors">🇨🇳 中文</a></li>
              <li><a href="/landing-in.html" className="hover:text-white transition-colors">🇮🇳 हिंदी</a></li>
            </ul>
          </div>

          {/* Featured Badge */}
<div className="md:col-span-2 flex flex-col sm:flex-row justify-center items-center gap-6">
  {/* TAFT Badge */}
  <a
    href="https://theresanaiforthat.com/ai/redesignr/?ref=featured&v=6100518"
    target="_blank"
    rel="nofollow"
    className="inline-block"
  >
    <img
      src="https://media.theresanaiforthat.com/featured-on-taaft.png?width=600"
      alt="Featured on There's an AI for That"
      className="w-[280px] rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
    />
  </a>

  {/* Code.market Badge */}
  <a
    title="ai tools code.market"
    href="https://code.market?code.market=verified"
    target="_blank"
    rel="nofollow"
    className="inline-block"
  >
    <img
      src="https://code.market/assets/manage-product/featured-logo-dark.svg"
      alt="ai tools code.market"
      title="ai tools code.market"
      className="h-12 hover:scale-105 transition-transform duration-300"
    />
  </a>
</div>


          {/* Social Links */}
          <div className="flex md:justify-end items-start gap-3">
            <a
              href="https://x.com/redesignrai"
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors duration-300"
            >
              <X className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/redesignrai"
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors duration-300"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-slate-800"></div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 font-medium">
              redesignr.ai
            </span>
            . All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy-policy"
              className="hover:text-purple-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="hover:text-indigo-400 transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
