import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-background">
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Deep Red Glow Top Left */}
      <div className="absolute -top-[20%] -left-[10%] w-[700px] h-[700px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen opacity-60 animate-[pulse_8s_ease-in-out_infinite]"></div>
      
      {/* Dark Red Glow Bottom Right */}
      <div className="absolute -bottom-[20%] -right-[10%] w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px] mix-blend-screen opacity-50 animate-[pulse_10s_ease-in-out_infinite_reverse]"></div>

      {/* Subtle animated floating lines */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent -rotate-45 blur-[2px] animate-[pulse_6s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent rotate-12 blur-[2px] animate-[pulse_7s_ease-in-out_infinite]"></div>
    </div>
  );
};

export default AnimatedBackground;
