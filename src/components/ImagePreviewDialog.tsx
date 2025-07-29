import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon } from 'lucide-react';

interface ImagePreviewDialogProps {
  imageUrl: string;
  altText: string;
}

export const ImagePreviewDialog = ({ imageUrl, altText }: ImagePreviewDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <ImageIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <div className="flex items-center justify-center p-4">
          <img 
            src={imageUrl} 
            alt={altText}
            className="max-w-full max-h-[70vh] object-contain rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};