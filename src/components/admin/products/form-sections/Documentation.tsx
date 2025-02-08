import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { Textarea } from "../../../ui/textarea";

interface DocumentationProps {
  warranty: string;
  manual: string;
  onUpdate: (updates: { warranty?: string; manual?: string }) => void;
}

export const Documentation = ({ warranty, manual, onUpdate }: DocumentationProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="warranty">Warranty Information</Label>
        <Textarea
          id="warranty"
          value={warranty}
          onChange={(e) => onUpdate({ warranty: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="manual">Manual URL</Label>
        <Input
          id="manual"
          value={manual}
          onChange={(e) => onUpdate({ manual: e.target.value })}
        />
      </div>
    </div>
  );
};