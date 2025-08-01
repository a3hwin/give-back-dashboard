import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ItemRequest } from '@/data/mockData';
import { User, Calendar, Mail, MessageSquare } from 'lucide-react';

interface RequestDetailsDialogProps {
  requests: ItemRequest[];
  children: React.ReactNode;
}

export const RequestDetailsDialog = ({ requests, children }: RequestDetailsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[70vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request Details ({requests.length} requests)</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {requests.map((request) => (
            <div 
              key={request.id} 
              className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-eco-green" />
                  <span className="font-medium text-foreground">{request.userName}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(request.requestDate).toLocaleDateString()}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  <span>{request.userEmail}</span>
                </div>
                
                {request.message && (
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-sm font-medium text-foreground">
                      <MessageSquare className="h-3 w-3" />
                      <span>Message:</span>
                    </div>
                    <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded border-l-2 border-eco-green">
                      {request.message}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-2 mt-3">
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
                <Button size="sm" className="bg-eco-green text-white hover:bg-eco-green/90">
                  Accept Request
                </Button>
              </div>
            </div>
          ))}
          
          {requests.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No requests for this item yet.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};