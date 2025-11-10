import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { ImageUpload } from '@/components/ImageUpload';
import { useToast } from '@/hooks/use-toast';
import { mockBadges, Badge as BadgeType } from '@/data/badgeData';
import { Plus, Award, Star, Edit, Trash2 } from 'lucide-react';

export const BadgeMaster = () => {
  const [badges, setBadges] = useState<BadgeType[]>(mockBadges);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingBadge, setEditingBadge] = useState<BadgeType | null>(null);
  const [newBadge, setNewBadge] = useState({
    name: '',
    description: '',
    pointsRequired: 10,
    icon: ''
  });
  const { toast } = useToast();

  const handleAddBadge = () => {
    if (!newBadge.name || !newBadge.description || !newBadge.icon) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const badge: BadgeType = {
      id: String(badges.length + 1),
      name: newBadge.name,
      description: newBadge.description,
      pointsRequired: newBadge.pointsRequired,
      icon: newBadge.icon
    };

    setBadges([...badges, badge]);
    setNewBadge({ name: '', description: '', pointsRequired: 10, icon: '' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success!",
      description: `Badge "${badge.name}" has been created.`,
    });
  };

  const handleEditBadge = (badge: BadgeType) => {
    setEditingBadge(badge);
    setNewBadge({
      name: badge.name,
      description: badge.description,
      pointsRequired: badge.pointsRequired,
      icon: badge.icon
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateBadge = () => {
    if (!editingBadge || !newBadge.name || !newBadge.description || !newBadge.icon) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setBadges(prev => 
      prev.map(b => 
        b.id === editingBadge.id 
          ? { ...b, ...newBadge }
          : b
      )
    );
    
    setIsEditDialogOpen(false);
    setEditingBadge(null);
    setNewBadge({ name: '', description: '', pointsRequired: 10, icon: '' });
    
    toast({
      title: "Badge Updated",
      description: `Badge "${newBadge.name}" has been updated.`,
    });
  };

  const handleDeleteBadge = (badgeId: string) => {
    const badge = badges.find(b => b.id === badgeId);
    setBadges(prev => prev.filter(b => b.id !== badgeId));
    toast({
      title: "Badge Deleted",
      description: `Badge "${badge?.name}" has been deleted.`,
    });
  };

  return (
    <Card className="shadow-card mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-eco-green" />
            <span>Badge Master</span>
          </CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-eco hover:opacity-90">
                <Plus className="h-4 w-4 mr-2" />
                Add Badge
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Badge</DialogTitle>
                <DialogDescription>
                  Design a new achievement badge for community members.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="badge-name">Badge Name *</Label>
                  <Input
                    id="badge-name"
                    value={newBadge.name}
                    onChange={(e) => setNewBadge({...newBadge, name: e.target.value})}
                    placeholder="e.g., Eco Warrior"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="badge-description">Description *</Label>
                  <Textarea
                    id="badge-description"
                    value={newBadge.description}
                    onChange={(e) => setNewBadge({...newBadge, description: e.target.value})}
                    placeholder="Describe what this badge represents"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="points-required">Points Required</Label>
                  <Input
                    id="points-required"
                    type="number"
                    min="1"
                    max="1000"
                    value={newBadge.pointsRequired}
                    onChange={(e) => setNewBadge({...newBadge, pointsRequired: parseInt(e.target.value) || 10})}
                  />
                </div>
                <ImageUpload
                  value={newBadge.icon}
                  onChange={(value) => setNewBadge({...newBadge, icon: value})}
                  label="Badge Icon *"
                  placeholder="Upload badge icon image"
                />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddBadge} className="bg-gradient-eco hover:opacity-90">
                    Create Badge
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Edit Badge Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Badge</DialogTitle>
                <DialogDescription>
                  Update the badge details.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-badge-name">Badge Name *</Label>
                  <Input
                    id="edit-badge-name"
                    value={newBadge.name}
                    onChange={(e) => setNewBadge({...newBadge, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-badge-description">Description *</Label>
                  <Textarea
                    id="edit-badge-description"
                    value={newBadge.description}
                    onChange={(e) => setNewBadge({...newBadge, description: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-points-required">Points Required</Label>
                  <Input
                    id="edit-points-required"
                    type="number"
                    min="1"
                    max="1000"
                    value={newBadge.pointsRequired}
                    onChange={(e) => setNewBadge({...newBadge, pointsRequired: parseInt(e.target.value) || 10})}
                  />
                </div>
                <ImageUpload
                  value={newBadge.icon}
                  onChange={(value) => setNewBadge({...newBadge, icon: value})}
                  label="Badge Icon *"
                  placeholder="Upload badge icon image"
                />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateBadge} className="bg-gradient-eco hover:opacity-90">
                    Update Badge
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div key={badge.id} className="p-4 border border-border rounded-lg bg-accent/20">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <img 
                    src={badge.icon} 
                    alt={badge.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{badge.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{badge.description}</p>
                    <Badge variant="secondary" className="mt-2 bg-eco-green-light text-eco-green">
                      <Star className="h-3 w-3 mr-1" />
                      {badge.pointsRequired} pts
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditBadge(badge)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Badge</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{badge.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteBadge(badge.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};