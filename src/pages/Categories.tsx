import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ImageUpload } from '@/components/ImageUpload';
import { useToast } from '@/hooks/use-toast';
import { mockCategories, Category, SubCategory, mockItems } from '@/data/mockData';
import { Plus, ChevronDown, ChevronRight, Edit, Package, Star, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState({
    title: '',
    description: '',
    image: '',
    points: 1
  });
  const [isAddSubCategoryDialogOpen, setIsAddSubCategoryDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isEditSubDialogOpen, setIsEditSubDialogOpen] = useState(false);
  const [selectedCategoryForSub, setSelectedCategoryForSub] = useState<string>('');
  const [editingSubCategory, setEditingSubCategory] = useState<SubCategory | null>(null);
  const [newSubCategory, setNewSubCategory] = useState({
    title: '',
    description: '',
    image: '',
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
    if (!newCategory.title || !newCategory.description || !newCategory.image) {
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
      image: newCategory.image,
      points: newCategory.points,
      itemCount: 0,
      subCategories: []
    };

    setCategories([...categories, category]);
    setNewCategory({ title: '', description: '', image: '', points: 1 });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success!",
      description: `Category "${category.title}" has been added.`,
    });
  };

  const handleAddSubCategory = () => {
    if (!newSubCategory.title || !newSubCategory.description || !newSubCategory.image) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const subCategory: SubCategory = {
      id: `${selectedCategoryForSub}-${Date.now()}`,
      title: newSubCategory.title,
      description: newSubCategory.description,
      image: newSubCategory.image,
      points: newSubCategory.points
    };

    setCategories(prev => 
      prev.map(cat => 
        cat.id === selectedCategoryForSub 
          ? { ...cat, subCategories: [...(cat.subCategories || []), subCategory] }
          : cat
      )
    );
    
    setNewSubCategory({ title: '', description: '', image: '', points: 1 });
    setIsAddSubCategoryDialogOpen(false);
    
    toast({
      title: "Success!",
      description: `Sub-category "${subCategory.title}" has been added.`,
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

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setNewCategory({
      title: category.title,
      description: category.description,
      image: category.image,
      points: category.points
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateCategory = () => {
    if (!editingCategory || !newCategory.title || !newCategory.description || !newCategory.image) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setCategories(prev => 
      prev.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, ...newCategory }
          : cat
      )
    );
    
    setIsEditDialogOpen(false);
    setEditingCategory(null);
    setNewCategory({ title: '', description: '', image: '', points: 1 });
    
    toast({
      title: "Category Updated",
      description: `Category "${newCategory.title}" has been updated.`,
    });
  };

  const handleDeleteCategory = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    toast({
      title: "Category Deleted",
      description: `Category "${category?.title}" has been deleted.`,
    });
  };

  const handleEditSubCategory = (subCategory: SubCategory, categoryId: string) => {
    setEditingSubCategory(subCategory);
    setSelectedCategoryForSub(categoryId);
    setNewSubCategory({
      title: subCategory.title,
      description: subCategory.description,
      image: subCategory.image,
      points: subCategory.points
    });
    setIsEditSubDialogOpen(true);
  };

  const handleUpdateSubCategory = () => {
    if (!editingSubCategory || !newSubCategory.title || !newSubCategory.description || !newSubCategory.image) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setCategories(prev => 
      prev.map(cat => 
        cat.id === selectedCategoryForSub 
          ? {
              ...cat,
              subCategories: cat.subCategories?.map(sub => 
                sub.id === editingSubCategory.id 
                  ? { ...sub, ...newSubCategory }
                  : sub
              )
            }
          : cat
      )
    );
    
    setIsEditSubDialogOpen(false);
    setEditingSubCategory(null);
    setNewSubCategory({ title: '', description: '', image: '', points: 1 });
    
    toast({
      title: "Sub-Category Updated",
      description: `Sub-category "${newSubCategory.title}" has been updated.`,
    });
  };

  const handleDeleteSubCategory = (subCategoryId: string, categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    const subCategory = category?.subCategories?.find(s => s.id === subCategoryId);
    
    setCategories(prev => 
      prev.map(cat => 
        cat.id === categoryId 
          ? {
              ...cat,
              subCategories: cat.subCategories?.filter(sub => sub.id !== subCategoryId)
            }
          : cat
      )
    );
    
    toast({
      title: "Sub-Category Deleted",
      description: `Sub-category "${subCategory?.title}" has been deleted.`,
    });
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
              <ImageUpload
                value={newCategory.image}
                onChange={(value) => setNewCategory({...newCategory, image: value})}
                label="Category Image *"
                placeholder="Upload category image"
              />
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

        {/* Add Sub-Category Dialog */}
        <Dialog open={isAddSubCategoryDialogOpen} onOpenChange={setIsAddSubCategoryDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Sub-Category</DialogTitle>
              <DialogDescription>
                Create a new sub-category within the selected category.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sub-title">Title *</Label>
                <Input
                  id="sub-title"
                  value={newSubCategory.title}
                  onChange={(e) => setNewSubCategory({...newSubCategory, title: e.target.value})}
                  placeholder="e.g., Indoor Furniture"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sub-description">Description *</Label>
                <Textarea
                  id="sub-description"
                  value={newSubCategory.description}
                  onChange={(e) => setNewSubCategory({...newSubCategory, description: e.target.value})}
                  placeholder="Brief description of the sub-category"
                />
              </div>
              <ImageUpload
                value={newSubCategory.image}
                onChange={(value) => setNewSubCategory({...newSubCategory, image: value})}
                label="Sub-Category Image *"
                placeholder="Upload sub-category image"
              />
              <div className="space-y-2">
                <Label htmlFor="sub-points">Points</Label>
                <Input
                  id="sub-points"
                  type="number"
                  min="1"
                  max="10"
                  value={newSubCategory.points}
                  onChange={(e) => setNewSubCategory({...newSubCategory, points: parseInt(e.target.value) || 1})}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddSubCategoryDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddSubCategory} className="bg-gradient-eco hover:opacity-90">
                  Add Sub-Category
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Sub-Category Dialog */}
        <Dialog open={isEditSubDialogOpen} onOpenChange={setIsEditSubDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Sub-Category</DialogTitle>
              <DialogDescription>
                Update the sub-category details.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-sub-title">Title *</Label>
                <Input
                  id="edit-sub-title"
                  value={newSubCategory.title}
                  onChange={(e) => setNewSubCategory({...newSubCategory, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-sub-description">Description *</Label>
                <Textarea
                  id="edit-sub-description"
                  value={newSubCategory.description}
                  onChange={(e) => setNewSubCategory({...newSubCategory, description: e.target.value})}
                />
              </div>
              <ImageUpload
                value={newSubCategory.image}
                onChange={(value) => setNewSubCategory({...newSubCategory, image: value})}
                label="Sub-Category Image *"
                placeholder="Upload sub-category image"
              />
              <div className="space-y-2">
                <Label htmlFor="edit-sub-points">Points</Label>
                <Input
                  id="edit-sub-points"
                  type="number"
                  min="1"
                  max="10"
                  value={newSubCategory.points}
                  onChange={(e) => setNewSubCategory({...newSubCategory, points: parseInt(e.target.value) || 1})}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditSubDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateSubCategory} className="bg-gradient-eco hover:opacity-90">
                  Update Sub-Category
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
                        <img 
                          src={category.image} 
                          alt={category.title}
                          className="w-12 h-12 rounded object-cover"
                        />
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
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCategoryForSub(category.id);
                              setIsAddSubCategoryDialogOpen(true);
                            }}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Sub
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditCategory(category);
                            }}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Category</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{category.title}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteCategory(category.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
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
                    <div className="border-t pt-4 space-y-6">
                      {/* Sub-categories */}
                      {category.subCategories && category.subCategories.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-3 text-foreground">Sub-categories:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                            {category.subCategories.map((subCategory) => (
                              <div key={subCategory.id} className="p-3 bg-muted rounded-lg border">
                                <div className="flex items-start justify-between">
                                  <div className="flex items-start space-x-3">
                                    <img 
                                      src={subCategory.image} 
                                      alt={subCategory.title}
                                      className="w-8 h-8 rounded object-cover"
                                    />
                                    <div className="flex-1">
                                      <h5 className="font-medium text-sm text-foreground">{subCategory.title}</h5>
                                      <p className="text-xs text-muted-foreground mt-1">{subCategory.description}</p>
                                      <Badge variant="secondary" className="mt-2 text-xs bg-eco-green-light text-eco-green">
                                        <Star className="h-3 w-3 mr-1" />
                                        {subCategory.points} pts
                                      </Badge>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleEditSubCategory(subCategory, category.id)}
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
                                          <AlertDialogTitle>Delete Sub-Category</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Are you sure you want to delete "{subCategory.title}"? This action cannot be undone.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction onClick={() => handleDeleteSubCategory(subCategory.id, category.id)}>
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
                        </div>
                      )}
                      
                       <div className="flex justify-end">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate('/items')}
                            className="hover:bg-eco-green-light hover:text-eco-green"
                          >
                           <Package className="h-3 w-3 mr-1" />
                           View Items
                         </Button>
                      </div>
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