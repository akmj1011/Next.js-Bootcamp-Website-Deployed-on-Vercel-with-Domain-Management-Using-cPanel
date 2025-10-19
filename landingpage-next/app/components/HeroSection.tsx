"use client";


type HeroSectionProps = {
  onRegisterClick?: () => void;
};

export default function HeroSection({ onRegisterClick }: HeroSectionProps) {
  return (
    <section
  className="relative w-full flex items-center 
    py-8 sm:py-12 md:py-16 lg:py-20
    px-4 sm:px-6 md:px-8
    max-h-[calc(100vh-4rem)]"
>
      {/* background */}
      <div className="absolute inset-0 z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 lg:py-40 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div className="text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 float-animation">
            Launch Your Career with Pan-India Online Bootcamps
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Learn GitHub • AI & Data Science • Coding • UI/UX • Analytics – <br />
            Taught by Young Professionals, in English + Regional Languages
          </p>

          {/* Languages */}
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="px-4 py-2 bg-white/20 rounded-full">🌍 English + Tamil</span>
            <span className="px-4 py-2 bg-white/20 rounded-full">🌍 English + Hindi</span>
            <span className="px-4 py-2 bg-white/20 rounded-full">🌍 English + Telugu</span>
          </div>

          {/* CTA */}
          <button
  className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:scale-110 transition-transform pulse-button"
  onClick={() => {
    if (onRegisterClick) onRegisterClick();
  }}
>
  Register Now - Limited Seats!
</button>

        </div>

        {/* Right Side */}
        <div className="relative hidden lg:block">
  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30 blur-3xl animate-pulse-gradient"></div>
  <div className="relative w-full">
    <video
      src="/api/logo"
      autoPlay
      loop
      muted
      playsInline
      className="w-full rounded-2xl shadow-2xl pointer-events-none"
      controls={false}                      
      disablePictureInPicture                
      controlsList="nodownload noremoteplayback nofullscreen" 
      onContextMenu={(e) => e.preventDefault()} 
    />
  </div>
</div>
      </div>
    </section>
  );
}
