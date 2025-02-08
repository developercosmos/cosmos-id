import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";

interface FeaturesProps {
  features: string[];
  onChange: (features: string[]) => void;
}

export const Features = ({ features, onChange }: FeaturesProps) => {
  const addFeature = () => {
    onChange([...features, ""]);
  };

  return (
    <div className="space-y-2">
      <Label>Features</Label>
      {features.map((feature, index) => (
        <Input
          key={index}
          value={feature}
          onChange={(e) => {
            const newFeatures = [...features];
            newFeatures[index] = e.target.value;
            onChange(newFeatures);
          }}
        />
      ))}
      <Button type="button" variant="outline" onClick={addFeature}>
        Add Feature
      </Button>
    </div>
  );
};