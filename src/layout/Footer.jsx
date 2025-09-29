import React from 'react';
import { FaFacebookIcon, InstagramIcon, TwitterIcon } from '../icons';
/* import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
} from 'react-icons/fa'; */

export default function Footer() {
  return (
    <footer className="bg-black text-white font-outfit px-8 md:px-20 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold font-spectral">ABEKE</h2>
          <p className="mt-3 text-sm text-gray-400">
            Elegant & Affordable Women's Fashion for every occasion.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="p-2 bg-gray-800 rounded-full ">
              <FaFacebookIcon />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-full">
              <InstagramIcon />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-full ">
              <TwitterIcon />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#">Shop All</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">FAQs</a>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#">Returns & Exchanges</a>
            </li>
            <li>
              <a href="#">Shipping Information</a>
            </li>
            <li>
              <a href="#">Track My Order</a>
            </li>
            <li>
              <a href="#">Size Guide</a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
          <p className="text-gray-400 text-sm mb-3">
            Subscribe to get exclusive deals and fashion updates.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-full text-white border border-white w-full focus:outline-none"
            />
            <button className="bg-lemon-200 px-5 py-2 rounded-full text-white font-semibold">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
        <p>© {new Date().getFullYear()} LaBelle. All rights reserved.</p>
        <div className="flex gap-4 mt-3 md:mt-0">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
