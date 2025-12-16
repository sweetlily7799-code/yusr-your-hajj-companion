import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface WatchFrameProps {
  children: ReactNode;
}

export function WatchFrame({ children }: WatchFrameProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted via-background to-muted/50 p-4">
      {/* Watch Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative"
      >
        {/* Watch Bezel */}
        <div 
          className="relative rounded-[60px] p-2"
          style={{
            background: 'linear-gradient(145deg, hsl(var(--watch-bezel)), hsl(0, 0%, 10%))',
            boxShadow: 'var(--shadow-watch), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          {/* Crown Button */}
          <div 
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-12 rounded-full"
            style={{
              background: 'linear-gradient(180deg, hsl(0, 0%, 25%) 0%, hsl(0, 0%, 15%) 100%)',
              boxShadow: '2px 0 4px rgba(0,0,0,0.3)',
            }}
          />
          
          {/* Side Button */}
          <div 
            className="absolute -right-2 top-1/3 -translate-y-1/2 w-2 h-6 rounded-full"
            style={{
              background: 'linear-gradient(180deg, hsl(0, 0%, 25%) 0%, hsl(0, 0%, 15%) 100%)',
              boxShadow: '2px 0 4px rgba(0,0,0,0.3)',
            }}
          />

          {/* Inner Bezel Ring */}
          <div 
            className="rounded-[52px] p-[2px]"
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(0,0,0,0.3))',
            }}
          >
            {/* Watch Screen */}
            <div 
              className="w-[320px] h-[380px] rounded-[50px] overflow-hidden watch-screen relative"
              style={{
                background: 'hsl(var(--watch-screen-bg))',
              }}
            >
              {/* Screen Content */}
              <div className="w-full h-full overflow-hidden">
                {children}
              </div>
              
              {/* Screen Glass Effect */}
              <div 
                className="absolute inset-0 pointer-events-none rounded-[50px]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Watch Glow Effect */}
        <div 
          className="absolute inset-0 -z-10 blur-3xl opacity-20 rounded-full"
          style={{
            background: 'hsl(var(--watch-glow))',
            transform: 'scale(1.2)',
          }}
        />
      </motion.div>
    </div>
  );
}
