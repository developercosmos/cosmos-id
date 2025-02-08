import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";

interface BoxContentsProps {
  items: string[];
  onChange: (items: string[]) => void;
}

export const BoxContents = ({ items, onChange }: BoxContentsProps) => {
  const addItem = () => {
    onChange([...items, ""]);
  };

  return (
    <div className="space-y-2">
      <Label>What's in the Box</Label>
      {items.map((item, index) => (
        <Input
          key={index}
          value={item}
          onChange={(e) => {
            const newItems = [...items];
            newItems[index] = e.target.value;
            onChange(newItems);
          }}
        />
      ))}
      <Button type="button" variant="outline" onClick={addItem}>
        Add Box Item
      </Button>
    </div>
  );
};