import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockUsers, User } from '@/data/mockData';
import { Trophy, Star, Gift, Award, Crown, Medal } from 'lucide-react';

const Leaderboard = () => {
  const [timeFilter, setTimeFilter] = useState('all-time');
  const [cityFilter, setCityFilter] = useState('all');

  // Sort users by points in descending order
  const sortedUsers = [...mockUsers].sort((a, b) => b.points - a.points);

  const cities = Array.from(new Set(mockUsers.map(user => user.location.split(',')[1]?.trim() || user.location)));

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankCardStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200';
      case 2:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200';
      case 3:
        return 'bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200';
      default:
        return 'bg-card border-border';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Leaderboard</h1>
        <p className="text-muted-foreground mt-2">
          Top contributors making a difference in their communities
        </p>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-eco-green" />
            <span>Leaderboard Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Time Period</label>
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="all-time">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">City</label>
              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedUsers.slice(0, 3).map((user, index) => {
          const rank = index + 1;
          return (
            <Card key={user.id} className={`shadow-card ${getRankCardStyle(rank)}`}>
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-2">
                  {getRankIcon(rank)}
                </div>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{user.location}</p>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <div className="flex items-center justify-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="text-2xl font-bold text-foreground">{user.points}</span>
                  <span className="text-sm text-muted-foreground">points</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-white/50 rounded p-2">
                    <div className="font-medium text-foreground">{user.itemsGiven}</div>
                    <div className="text-muted-foreground">Given</div>
                  </div>
                  <div className="bg-white/50 rounded p-2">
                    <div className="font-medium text-foreground">{user.itemsReceived}</div>
                    <div className="text-muted-foreground">Received</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 justify-center">
                  {user.badges.slice(0, 2).map((badge, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                  {user.badges.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{user.badges.length - 2}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Full Leaderboard Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-eco-green" />
            <span>Complete Rankings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Items Given</TableHead>
                  <TableHead>Items Received</TableHead>
                  <TableHead>Badges</TableHead>
                  <TableHead>Member Since</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedUsers.map((user, index) => {
                  const rank = index + 1;
                  return (
                    <TableRow 
                      key={user.id} 
                      className={`hover:bg-accent/50 transition-colors ${
                        rank <= 3 ? 'bg-accent/20' : ''
                      }`}
                    >
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getRankIcon(rank)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-muted-foreground">{user.location}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-semibold text-foreground">{user.points}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Gift className="h-4 w-4 text-eco-green" />
                          <span>{user.itemsGiven}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span>{user.itemsReceived}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {user.badges.slice(0, 3).map((badge, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                          {user.badges.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{user.badges.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {new Date(user.joinDate).toLocaleDateString()}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;