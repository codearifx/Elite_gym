import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const serviceData = {
  'cardio': {
    title: 'Cardio',
    subtitle: 'Heart-Pounding Endurance',
    desc: 'Our cardio program is designed to build extreme endurance and torch fat. Utilizing state-of-the-art treadmills, curved runners, air bikes, and advanced HIIT protocols, you will push your cardiovascular limits.',
    benefits: ['Burn up to 1000 calories per session', 'Improve VO2 Max', 'Heart health and longevity', 'Mental toughness'],
    img: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=1200&q=80'
  },
  'core-training': {
    title: 'Core Training',
    subtitle: 'Foundation of Strength',
    desc: 'A strong core is the foundation for all lifts and movements. This service focuses on transverse abdominis activation, oblique strength, and lower back stability to prevent injuries and create a chiseled midsection.',
    benefits: ['Bulletproof your lower back', 'Visible ab definition', 'Enhanced posture', 'Better compound lifts'],
    img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=1200&q=80'
  },
  'weight-training': {
    title: 'Weight Training',
    subtitle: 'Raw Power & Muscle',
    desc: 'From Olympic lifting platforms to heavy dumbbells and machines, our weight training area is fully equipped for hypertrophy and strength gains. Our trainers will teach you the mechanics of the big three: Squat, Bench, and Deadlift.',
    benefits: ['Increase muscle mass', 'Boost resting metabolic rate', 'Strengthen bones and joints', 'Functional power'],
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80'
  },
  'yoga-flexibility': {
    title: 'Yoga & Flexibility',
    subtitle: 'Recovery & Mobility',
    desc: 'Strength without mobility leads to injury. Our yoga practice focuses on opening up tight hips, improving shoulder mobility, and implementing active recovery flows to keep your body supple and ready for the next heavy session.',
    benefits: ['Reduced injury risk', 'Faster muscular recovery', 'Mental clarity and stress relief', 'Increased range of motion'],
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80'
  },
  'personal-training': {
    title: 'Personal Training',
    subtitle: 'Elite 1-on-1 Coaching',
    desc: 'Work directly with our roster of elite coaches. We provide a fully customized macro-nutrient plan, guided training sessions, and form correction to fast-track your progress and guarantee results.',
    benefits: ['Customized workout splits', 'Form checks and injury prevention', 'Nutritional guidance', 'Unmatched accountability'],
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80'
  }
};

const ServiceDetails = () => {
  const { id } = useParams();
  const service = serviceData[id];

  if (!service) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center flex-col">
        <h2 className="text-neon text-3xl font-heading mb-4">Service Not Found.</h2>
        <Link to="/services" className="text-gray-400 hover:text-neon underline">Return to Services</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-background relative">
       {/* Hero Image */}
       <div className="relative h-[40vh] md:h-[50vh] w-full">
         <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
         
         <div className="absolute inset-0 container mx-auto px-4 flex flex-col justify-end pb-10">
           <Link to="/services" className="inline-flex items-center gap-2 text-neon hover:text-white transition-colors mb-6 font-mono text-sm uppercase">
             <ArrowLeft size={16} /> Back to Programs
           </Link>
           <h1 className="text-5xl md:text-7xl font-heading text-white uppercase drop-shadow-xl">{service.title}</h1>
           <p className="text-xl md:text-2xl text-neon font-mono mt-2">{service.subtitle}</p>
         </div>
       </div>

       {/* Content */}
       <div className="container mx-auto px-4 py-16 max-w-4xl">
         <div className="bg-surface/50 border border-white/5 rounded-3xl p-8 md:p-12 backdrop-blur-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-neon/5 rounded-full blur-[80px]"></div>
           
           <h3 className="text-2xl font-heading text-white uppercase mb-6 border-b border-white/10 pb-4">Program Overview</h3>
           <p className="text-gray-300 text-lg leading-relaxed mb-10 font-body">
             {service.desc}
           </p>

           <h3 className="text-2xl font-heading text-white uppercase mb-6 border-b border-white/10 pb-4">Key Benefits</h3>
           <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {service.benefits.map((benefit, i) => (
               <li key={i} className="flex items-start gap-3 text-gray-300">
                 <span className="text-neon text-xl leading-none mt-1">✔</span>
                 <span>{benefit}</span>
               </li>
             ))}
           </ul>

           <div className="mt-16 text-center">
             <Link to="/membership-form" className="inline-block px-10 py-5 bg-neon text-background font-black uppercase tracking-widest rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(57,255,20,0.3)]">
               Commit to this Program
             </Link>
           </div>
         </div>
       </div>
    </div>
  );
};

export default ServiceDetails;
