import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SERVER_URL } from '../config/serverConfig';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  productLink: string;
  cta: {
    primary: { text: string; link: string };
    secondary: { text: string; link: string };
  };
}

const fetchSlides = async (): Promise<Slide[]> => {
  console.log('Fetching slides from server...');
  const response = await fetch(`${SERVER_URL}/src/server/slides.php`);
  if (!response.ok) {
    throw new Error('Failed to fetch slides');
  }
  const data = await response.json();
  console.log('Fetched slides:', data);
  
  if (!Array.isArray(data)) {
    console.error('Invalid data format:', data);
    return [];
  }

  return data.map(slide => {
    // Handle image URL construction
    let imageUrl = slide.image;
    if (!imageUrl.startsWith('http')) {
      // Remove any duplicate SERVER_URL if present
      imageUrl = imageUrl.replace(SERVER_URL, '');
      // Ensure we have a clean path starting with /
      imageUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
      // Construct the full URL
      imageUrl = `${SERVER_URL}${imageUrl}`;
    }
    console.log('Processed image URL:', imageUrl);

    return {
      image: imageUrl,
      title: slide.title || '',
      subtitle: slide.subtitle || '',
      productLink: slide.productLink || '#',
      cta: {
        primary: {
          text: slide.cta?.primary?.text || 'Learn More',
          link: slide.cta?.primary?.link || '#'
        },
        secondary: {
          text: slide.cta?.secondary?.text || 'View Details',
          link: slide.cta?.secondary?.link || '#'
        }
      }
    };
  });
};

const VideoSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const { data: slides = [], isError, error } = useQuery({
    queryKey: ['slides'],
    queryFn: fetchSlides,
  });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleSlideClick = (productLink: string) => {
    navigate(productLink);
  };

  if (isError) {
    console.error('Error loading slides:', error);
    return null;
  }

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-[calc(100vh-5rem)] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 cursor-pointer ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => handleSlideClick(slide.productLink)}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent">
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                {slide.subtitle}
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  variant="default"
                  className="bg-black text-white hover:bg-black/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = slide.cta.primary.link;
                  }}
                >
                  {slide.cta.primary.text}
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = slide.cta.secondary.link;
                  }}
                >
                  {slide.cta.secondary.text}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default VideoSlider;