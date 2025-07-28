import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';
import { mockCategories, Category, mockItems } from '@/data/mockData';
import { Plus, ChevronDown, ChevronRight, Edit, Package, Star } from 'lucide-react';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState({
    title: '',
    description: '',
    icon: '',
    points: 1
  });
  const { toast } = useToast();

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleAddCategory = () => {
    if (!newCategory.title || !newCategory.description || !newCategory.icon) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const category: Category = {
      id: String(categories.length + 1),
      title: newCategory.title,
      description: newCategory.description,
      icon: newCategory.icon,
      points: newCategory.points,
      itemCount: 0
    };

    setCategories([...categories, category]);
    setNewCategory({ title: '', description: '', icon: '', points: 1 });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success!",
      description: `Category "${category.title}" has been added.`,
    });
  };

  const handleUpdatePoints = (categoryId: string, newPoints: number) => {
    setCategories(prev => 
      prev.map(cat => 
        cat.id === categoryId ? { ...cat, points: newPoints } : cat
      )
    );
    
    toast({
      title: "Points Updated",
      description: "Category points have been successfully updated.",
    });
  };

  const getCategoryItems = (categoryTitle: string) => {
    return mockItems.filter(item => item.category === categoryTitle);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Categories</h1>
          <p className="text-muted-foreground mt-2">
            Manage item categories and their point values
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-eco hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Create a new category for items with custom point values.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={newCategory.title}
                  onChange={(e) => setNewCategory({...newCategory, title: e.target.value})}
                  placeholder="e.g., Furniture"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  placeholder="Brief description of the category"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">Icon (Emoji) *</Label>
                <Input
                  id="icon"
                  value={newCategory.icon}
                  onChange={(e) => setNewCategory({...newCategory, icon: e.target.value})}
                  placeholder="e.g., 🪑"
                  maxLength={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="points">Points</Label>
                <Input
                  id="points"
                  type="number"
                  min="1"
                  max="10"
                  value={newCategory.points}
                  onChange={(e) => setNewCategory({...newCategory, points: parseInt(e.target.value) || 1})}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCategory} className="bg-gradient-eco hover:opacity-90">
                  Add Category
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        {categories.map((category) => {
          const isExpanded = expandedCategories.includes(category.id);
          const categoryItems = getCategoryItems(category.title);
          
          return (
            <Card key={category.id} className="shadow-card">
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <CardHeader 
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{category.icon}</div>
                        <div>
                          <CardTitle className="flex items-center space-x-3">
                            <span>{category.title}</span>
                            <Badge variant="secondary" className="bg-eco-green-light text-eco-green">
                              <Star className="h-3 w-3 mr-1" />
                              {category.points} points
                            </Badge>
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {category.description}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Package className="h-4 w-4" />
                          <span className="text-sm">{category.itemCount} items</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor={`points-${category.id}`} className="text-sm">Points:</Label>
                          <Input
                            id={`points-${category.id}`}
                            type="number"
                            min="1"
                            max="10"
                            value={category.points}
                            onChange={(e) => handleUpdatePoints(category.id, parseInt(e.target.value) || 1)}
                            className="w-20"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-3 text-foreground">Items in this category:</h4>
                      {categoryItems.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {categoryItems.map((item) => (
                            <div key={item.id} className="p-3 bg-muted rounded-lg">
                              <h5 className="font-medium text-sm text-foreground">{item.name}</h5>
                              <p className="text-xs text-muted-foreground mt-1">{item.location}</p>
                              <Badge 
                                variant={
                                  item.status === 'Listed' ? 'default' :
                                  item.status === 'Requested' ? 'secondary' : 'outline'
                                }
                                className="mt-2 text-xs"
                              >
                                {item.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-sm">No items in this category yet.</p>
                      )}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;