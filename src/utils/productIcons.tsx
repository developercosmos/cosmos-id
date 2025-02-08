import { 
  ChefHat, Utensils, Flame, Coffee, Fan, Waves, 
  Beef, Timer, Box, Wind, Droplet, Zap, Lightbulb 
} from "lucide-react";

export const getIconForProduct = (name: string) => {
  const iconMap: { [key: string]: JSX.Element } = {
    "Blender": <Beef className="w-12 h-12" />,
    "Cooking Ware": <Utensils className="w-12 h-12" />,
    "Gas Cooker": <Flame className="w-12 h-12" />,
    "Rice Cooker": <ChefHat className="w-12 h-12" />,
    "Coffee Maker": <Coffee className="w-12 h-12" />,
    "Fan": <Fan className="w-12 h-12" />,
    "Stand Fan": <Fan className="w-12 h-12" />,
    "Induction Cooker": <Flame className="w-12 h-12" />,
    "Juicer": <Waves className="w-12 h-12" />,
    "Mixer": <Timer className="w-12 h-12" />,
    "Oven": <Flame className="w-12 h-12" />,
    "SPB (Rice Box)": <Box className="w-12 h-12" />,
    "Air Purifier": <Wind className="w-12 h-12" />,
    "Electric Kettle": <Droplet className="w-12 h-12" />,
    "Water Dispenser": <Droplet className="w-12 h-12" />,
    "Water Pump": <Zap className="w-12 h-12" />,
    "Sterilizer UVC Lamp": <Lightbulb className="w-12 h-12" />,
  };

  return iconMap[name] || <Box className="w-12 h-12" />;
};