import React from 'react';
import { motion } from 'framer-motion';
import { INSTAGRAM_POSTS } from '../../data/products';
import { Heart } from 'lucide-react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const InstagramSection: React.FC = () => {
  return (
    <section id="social" className="relative py-28 px-6 md:px-12 bg-[#070709] border-t border-[#d4af37]/15">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <InstagramIcon className="w-8 h-8 text-[#d4af37] mb-3" />
          <span className="font-sans-clean text-xs uppercase tracking-[0.35em] text-[#d4af37] font-semibold mb-2">
            INSTAGRAM GALLERY
          </span>
          <h2 className="font-heading-brand text-3xl sm:text-5xl text-[#fcfaf7] uppercase tracking-wider font-light mb-4">
            FOLLOW THE WORLD OF ABHARANA
          </h2>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans-clean text-sm text-[#e8d08d] hover:text-[#d4af37] tracking-[0.25em] uppercase font-semibold transition-colors"
          >
            @ABHARANABYKAVYA
          </a>
        </div>

        {/* 6-8 Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post, idx) => (
            <motion.a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative rounded-xl overflow-hidden aspect-square bg-[#0c0c12] border border-[#d4af37]/20 cursor-pointer block"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover Dark Overlay with Likes */}
              <div className="absolute inset-0 bg-[#070709]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center">
                <InstagramIcon className="w-6 h-6 text-[#d4af37] mb-2" />
                <div className="flex items-center gap-1 text-white text-xs font-sans-clean font-bold mb-1">
                  <Heart className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
                  <span>{post.likes}</span>
                </div>
                <p className="text-[10px] text-gray-300 font-sans-clean line-clamp-2 font-light">
                  {post.caption}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};
