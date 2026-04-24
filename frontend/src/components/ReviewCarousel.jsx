import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  { id: 1, name: 'David Goggins', review: 'Went from 220lbs to 180lbs. The daily tasks keep me accountable!', rating: 5, img: 'https://i.pinimg.com/736x/ec/00/5c/ec005c2b867c7f1b760472569803897a.jpg' },
  { id: 2, name: 'Sarah Connor', review: 'The transformation is unreal. Elite Strength changed my life.', rating: 5, img: 'https://media.istockphoto.com/id/666930996/photo/transforming-his-physique.jpg?s=612x612&w=0&k=20&c=20qzTaWfvafsORQZz7bkyQLCDpHjDzBkovkjeTK-ves=' },
  { id: 3, name: 'Mike Tyson', review: 'Best platform for tracking conditioning and staying motivated.', rating: 4, img: 'https://static.boredpanda.com/blog/wp-content/uploads/2017/05/before-after-body-building-fitness-transformation-101-591571eb544eb__700.jpg' },
  { id: 4, name: 'Elena Rogers', review: 'Lost 30lbs in 4 months. The Trainers here are top notch.', rating: 5, img: 'https://img.freepik.com/free-vector/weight-loss-man-before-after-diet-illustration-man-weight-loss-muscular-guy-after-lose-weight_1284-51611.jpg?semt=ais_hybrid&w=740&q=80' },
  { id: 5, name: 'John Doe', review: 'Never thought I could get a six-pack at 40. I was wrong!', rating: 5, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8UUh4-Ry_ISCDcr6ObB3GjiXA9tu5T3IxZw&s' },
  { id: 6, name: 'Chris Evans', review: 'Absolutely incredible workout plans and diet suggestions.', rating: 4, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsxFTwaKl8F7NtsZfJwo5E8HxVqutOjLhVUg&s' },
  { id: 7, name: 'Anna Kraft', review: 'Fitness has never been so accessible and gamified. Love it!', rating: 5, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaQATslnnd-ZYpkP_ZG0yb97LIiIofR_lwbA&s' },
];

const ReviewCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full relative py-10 overflow-hidden">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-heading font-bold text-white mb-4 uppercase">Success <span className="text-gradient">Stories</span></h2>
        <p className="text-gray-400">Real transformations from our dedicated members.</p>
      </div>

      <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center h-[350px]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.9 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
            className="absolute glass-panel p-8 w-full max-w-md mx-auto text-center border border-white/10"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                setCurrentIndex((prev) => (prev + 1) % reviews.length);
              } else if (swipe > swipeConfidenceThreshold) {
                setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
              }
            }}
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary">
              <img src={reviews[currentIndex].img} alt={reviews[currentIndex].name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{reviews[currentIndex].name}</h3>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={i < reviews[currentIndex].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} />
              ))}
            </div>
            <p className="text-gray-300 italic">"{reviews[currentIndex].review}"</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-8">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`w-3 h-3 rounded-full transition-all ${i === currentIndex ? 'bg-primary w-8' : 'bg-white/20 hover:bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default ReviewCarousel;
