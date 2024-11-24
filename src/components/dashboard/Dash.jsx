import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample Data
const analyticsData = [
  { title: "Total Users", value: 1200 },
  { title: "Active Users", value: 980 },
  { title: "Revenue", value: "$15,230" },
  { title: "New Signups", value: 85 },
];

const chartData = [
  { month: "Jan", revenue: 4000, users: 2400 },
  { month: "Feb", revenue: 3000, users: 2210 },
  { month: "Mar", revenue: 2000, users: 2290 },
  { month: "Apr", revenue: 2780, users: 2000 },
  { month: "May", revenue: 1890, users: 2181 },
  { month: "Jun", revenue: 2390, users: 2500 },
];

const recentActivity = [
  { id: 1, user: "John Doe", action: "Created an account", date: "2024-11-20" },
  {
    id: 2,
    user: "Jane Smith",
    action: "Purchased a product",
    date: "2024-11-21",
  },
  {
    id: 3,
    user: "Alex Johnson",
    action: "Updated profile",
    date: "2024-11-22",
  },
];

const Dash = () => {
  return (
    <Box sx={{ padding: 2 }}>
      {/* Analytics Cards */}
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        {analyticsData.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="h4">{item.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Revenue Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDaDharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                  <Line type="monotone" dataKey="users" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Growth
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activity Table */}
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6" gutterBottom>
          Recent Activity
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentActivity.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.id}</TableCell>
                  <TableCell>{activity.user}</TableCell>
                  <TableCell>{activity.action}</TableCell>
                  <TableCell>{activity.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Dash;
