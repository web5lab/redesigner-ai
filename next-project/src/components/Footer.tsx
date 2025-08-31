'use client';

import React from "react";
import { Linkedin, X } from "lucide-react";
import Link from "next/link";
import logo from "../assets/logo.webp";
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className=" border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 group mb-4"
            >
              <Image
                src={logo}
                alt="Logo"
                className="h-7 w-7 group-hover:scale-110 transition-transform duration-300"
                width={28}
                height={28}
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

          {/* Featured Badge */}
          <div className="md:col-span-2 flex justify-center">
            <a
              href="https://theresanaiforthat.com/ai/redesignr/?ref=featured&v=6100518"
              target="_blank"
              rel="nofollow"
              className="inline-block"
            >
              <Image
                src="https://media.theresanaiforthat.com/featured-on-taaft.png?width=600"
                alt="Featured on There's an AI for That"
                className="w-[280px] rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                width={280}
                height={140}
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
              href="/privacy-policy"
              className="hover:text-purple-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
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