import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { mockTransactions, mockCategories, mockItems, mockReportedUsers } from '@/data/mockData';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  RefreshCw, 
  FileText, 
  Calendar,
  MapPin,
  FolderOpen,
  ChevronDown,
  ChevronUp,
  Package,
  Users,
  Clock,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Reports = () => {
  const [dateRange, setDateRange] = useState('30');
  const [cityFilter, setCityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showOptionalPanels, setShowOptionalPanels] = useState(false);

  // Mock data for charts
  const timeSeriesData = [
    { date: '2024-01-01', listed: 12, given: 8 },
    { date: '2024-01-02', listed: 15, given: 10 },
    { date: '2024-01-03', listed: 8, given: 12 },
    { date: '2024-01-04', listed: 20, given: 15 },
    { date: '2024-01-05', listed: 18, given: 14 },
    { date: '2024-01-06', listed: 25, given: 18 },
    { date: '2024-01-07', listed: 22, given: 20 }
  ];

  const categoryPerformanceData = mockCategories.map(cat => ({
    name: cat.title,
    given: Math.floor(Math.random() * 20) + 5
  }));

  const itemsByStatusData = [
    { name: 'Listed', value: 45, color: '#22c55e' },
    { name: 'Requested', value: 25, color: '#f59e0b' },
    { name: 'Given', value: 30, color: '#10b981' },
  ];

  const noShowData = [
    { date: '2024-01-01', rate: 15 },
    { date: '2024-01-02', rate: 12 },
    { date: '2024-01-03', rate: 18 },
    { date: '2024-01-04', rate: 10 },
    { date: '2024-01-05', rate: 8 },
    { date: '2024-01-06', rate: 14 },
    { date: '2024-01-07', rate: 11 }
  ];

  const stuckItems = [
    { id: '1', name: 'Old Laptop', category: 'Electronics', city: 'San Francisco', age: '72h' },
    { id: '2', name: 'Exercise Bike', category: 'Sports Equipment', city: 'New York', age: '96h' },
    { id: '3', name: 'Cooking Pot Set', category: 'Kitchen Items', city: 'Austin', age: '48h' }
  ];

  // Calculate KPIs
  const totalListed = 147;
  const totalGiven = 89;
  const successRate = ((totalGiven / totalListed) * 100).toFixed(1);
  const medianPickupTime = 24;

  const exportToCsv = () => {
    console.log('Exporting to CSV...');
  };

  const exportToPdf = () => {
    console.log('Exporting to PDF...');
  };

  const refresh = () => {
    console.log('Refreshing data...');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Reports</h1>
        <p className="text-muted-foreground mt-2">
          Analytics and insights for the Passiton platform
        </p>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-eco-green" />
            <span>Filters & Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Date Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">City</label>
              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  <SelectItem value="sf">San Francisco</SelectItem>
                  <SelectItem value="ny">New York</SelectItem>
                  <SelectItem value="austin">Austin</SelectItem>
                  <SelectItem value="seattle">Seattle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {mockCategories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={refresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={exportToCsv}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={exportToPdf}>
              <FileText className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card hover:shadow-soft transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items Listed</CardTitle>
            <Package className="h-4 w-4 text-eco-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalListed}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +12% from last period
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-soft transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Given</CardTitle>
            <Users className="h-4 w-4 text-eco-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalGiven}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +8% from last period
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-soft transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-eco-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{successRate}%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              -2% from last period
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-soft transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Median Time to Pickup</CardTitle>
            <Clock className="h-4 w-4 text-eco-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{medianPickupTime}h</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              -4h from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Listings & Pickups Over Time */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Listings & Pickups Over Time</CardTitle>
            <CardDescription>Daily trends for items listed and given</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="listed" stroke="hsl(var(--eco-green))" strokeWidth={2} />
                  <Line type="monotone" dataKey="given" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
            <CardDescription>Items given by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="given" fill="hsl(var(--eco-green))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-eco-green" />
            <span>Recent Transactions (20)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Donor</TableHead>
                  <TableHead>Receiver</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-accent/50 transition-colors">
                    <TableCell className="font-medium">{transaction.itemName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-eco-green-light text-eco-green">
                        {transaction.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span className="text-sm">San Francisco</span>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.donor}</TableCell>
                    <TableCell>{transaction.recipient}</TableCell>
                    <TableCell>
                      <Badge className={
                        transaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span className="text-sm">{new Date(transaction.date).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Users className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Optional Collapsible Panels */}
      <Collapsible open={showOptionalPanels} onOpenChange={setShowOptionalPanels}>
        <CollapsibleTrigger asChild>
          <Card className="shadow-card cursor-pointer hover:bg-accent/50 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-eco-green" />
                  <span>Additional Analytics</span>
                </CardTitle>
                {showOptionalPanels ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
          </Card>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Items by Status */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Items by Status</CardTitle>
                <CardDescription>Current distribution of all items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={itemsByStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {itemsByStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* No-Show Rate Trend */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>No-Show Rate Trend</CardTitle>
                <CardDescription>Percentage of accepted requests not picked up</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={noShowData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}%`, 'No-show Rate']} />
                      <Line type="monotone" dataKey="rate" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stuck Items Table */}
          <Card className="shadow-card mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-eco-green" />
                <span>Stuck Items</span>
              </CardTitle>
              <CardDescription>Items with 0 requests after 48+ hours</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Age</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stuckItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell>{item.city}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">{item.age}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Reported Users Section */}
          <Card className="shadow-card mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-eco-green" />
                <span>Reported Users</span>
              </CardTitle>
              <CardDescription>Users reported by the community</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reported User Name</TableHead>
                    <TableHead>Reporter User Name</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Times Reported</TableHead>
                    <TableHead>Date of Last Report</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockReportedUsers.map((report) => (
                    <TableRow key={report.id} className="hover:bg-accent/50 transition-colors">
                      <TableCell className="font-medium">{report.reportedUserName}</TableCell>
                      <TableCell>{report.reporterUserName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          {report.reason}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={
                          report.timesReported >= 5 ? 'bg-red-100 text-red-800' :
                          report.timesReported >= 3 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }>
                          {report.timesReported}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span className="text-sm">{new Date(report.lastReportDate).toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Reports;