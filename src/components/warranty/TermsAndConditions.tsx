
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface TermsAndConditionsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAgree: (agreed: boolean) => void;
  agreed: boolean;
}

export const TermsAndConditions = ({
  open,
  onOpenChange,
  onAgree,
  agreed,
}: TermsAndConditionsProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
          <DialogDescription>
            Please read the following terms and conditions carefully.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Warranty Terms:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Free Lifetime Service (No Service Fee).</li>
              <li>Product warranty period is 1 year after purchase date, warranty applies to function-related parts.</li>
              <li>Fan Motor warranty period is 5 years from purchase date except 18 TIF for 3 years from purchase date.</li>
              <li>Dispenser Compressor warranty period is 3 years from purchase date.</li>
              <li>Water Pump motor warranty period is 3 years from purchase date.</li>
              <li>Grade and Discontinued items warranty period is 6 months from purchase date.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Warranty Void Conditions:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Warranty card not validated through website.</li>
              <li>Serial number doesn't match or cannot be shown due to damage or detachment from product.</li>
              <li>Damage caused by misuse, incorrect voltage, modifications, or factors beyond control including natural disasters.</li>
              <li>Repairs done by unauthorized service centers or individuals.</li>
            </ul>
          </div>

          <div className="flex items-center space-x-2 pt-4">
            <Checkbox
              id="terms"
              checked={agreed}
              onCheckedChange={(checked) => onAgree(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none"
            >
              I agree to the terms and conditions
            </label>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
