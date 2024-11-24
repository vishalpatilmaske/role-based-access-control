import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Inactive",
  },
];

const UsersList = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleAddEditUser = (user) => {
    if (user.id) {
      // Update user
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      // Add new user
      setUsers([...users, { ...user, id: users.length + 1 }]);
    }
    setOpen(false);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <Button
            onClick={() => handleEdit(params.row)}
            variant="contained"
            color="primary"
            size="small"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(params.row.id)}
            variant="contained"
            color="secondary"
            size="small"
            style={{ marginLeft: 8 }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search Users"
          value={search}
          onChange={handleSearch}
          size="small"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Add User
        </Button>
      </Box>
      <DataGrid
        rows={filteredUsers}
        columns={columns}
        autoHeight
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />

      {/* Add/Edit User Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{currentUser ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            variant="outlined"
            defaultValue={currentUser?.name || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            variant="outlined"
            defaultValue={currentUser?.email || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, email: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Role"
            fullWidth
            variant="outlined"
            defaultValue={currentUser?.role || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, role: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Status"
            fullWidth
            variant="outlined"
            defaultValue={currentUser?.status || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, status: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => handleAddEditUser(currentUser)}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default UsersList;
