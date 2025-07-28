import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { mockAdmins, Admin } from '@/data/mockData';
import { Users, Plus, Shield, Clock, Mail, Search } from 'lucide-react';

const Admins = () => {
  const [admins, setAdmins] = useState<Admin[]>(mockAdmins);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    username: '',
    email: '',
    role: 'Support',
    permissions: ['Users']
  });
  const { toast } = useToast();

  const filteredAdmins = admins.filter(admin =>
    admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAdmin = () => {
    if (!newAdmin.username || !newAdmin.email) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const admin: Admin = {
      id: String(admins.length + 1),
      username: newAdmin.username,
      email: newAdmin.email,
      role: newAdmin.role,
      lastLogin: 'Never',
      permissions: newAdmin.permissions
    };

    setAdmins([...admins, admin]);
    setNewAdmin({ username: '', email: '', role: 'Support', permissions: ['Users'] });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success!",
      description: `Admin "${admin.username}" has been added.`,
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Super Admin':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Moderator':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Support':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const permissionOptions = [
    'Categories',
    'Items', 
    'Users',
    'Transactions',
    'Leaderboard',
    'All'
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Administrators</h1>
          <p className="text-muted-foreground mt-2">
            Manage admin accounts and permissions
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-eco hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              Add Admin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Administrator</DialogTitle>
              <DialogDescription>
                Create a new admin account with specific permissions.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  value={newAdmin.username}
                  onChange={(e) => setNewAdmin({...newAdmin, username: e.target.value})}
                  placeholder="Enter username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={newAdmin.role} onValueChange={(value) => setNewAdmin({...newAdmin, role: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Support">Support</SelectItem>
                    <SelectItem value="Moderator">Moderator</SelectItem>
                    <SelectItem value="Super Admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-2">
                  {permissionOptions.map(permission => (
                    <label key={permission} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newAdmin.permissions.includes(permission)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewAdmin({
                              ...newAdmin,
                              permissions: [...newAdmin.permissions, permission]
                            });
                          } else {
                            setNewAdmin({
                              ...newAdmin,
                              permissions: newAdmin.permissions.filter(p => p !== permission)
                            });
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAdmin} className="bg-gradient-eco hover:opacity-90">
                  Add Admin
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
            <Users className="h-4 w-4 text-eco-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{admins.length}</div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Super Admins</CardTitle>
            <Shield className="h-4 w-4 text-eco-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {admins.filter(a => a.role === 'Super Admin').length}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Today</CardTitle>
            <Clock className="h-4 w-4 text-eco-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {admins.filter(a => a.lastLogin.includes('2024-01-15')).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-eco-green" />
            <span>Search Administrators</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search by username, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="transition-all duration-200 focus:shadow-soft"
          />
        </CardContent>
      </Card>

      {/* Admins Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-eco-green" />
            <span>Administrator Accounts ({filteredAdmins.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdmins.map((admin) => (
                  <TableRow key={admin.id} className="hover:bg-accent/50 transition-colors">
                    <TableCell>
                      <div className="font-medium text-foreground">{admin.username}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span className="text-sm">{admin.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleColor(admin.role)}>
                        {admin.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {admin.permissions.slice(0, 3).map((permission, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-eco-green-light text-eco-green border-eco-green">
                            {permission}
                          </Badge>
                        ))}
                        {admin.permissions.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{admin.permissions.length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span className="text-sm">{admin.lastLogin}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={admin.lastLogin === 'Never' ? 'secondary' : 'default'}>
                        {admin.lastLogin === 'Never' ? 'Inactive' : 'Active'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredAdmins.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No administrators found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Admins;