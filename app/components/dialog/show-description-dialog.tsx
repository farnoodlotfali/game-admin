import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

type Props = {
  open: boolean;
  onClose: () => void;
  desc: string | undefined;
};

export const ShowDescriptionDialog = ({ desc, onClose, open }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Description</DialogTitle>
        </DialogHeader>

        <div className="text-sm">{desc}</div>
      </DialogContent>
    </Dialog>
  );
};
