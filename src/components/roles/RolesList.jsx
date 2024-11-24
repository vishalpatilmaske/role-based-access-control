import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const initialRoles = [
  {
    id: 1,
    name: "Admin",
    permissions: { read: true, write: true, delete: true },
  },
  {
    id: 2,
    name: "User",
    permissions: { read: true, write: false, delete: false },
  },
];

const RolesList = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleAddEditRole = (role) => {
    if (role.id) {
      // Update role
      setRoles(roles.map((r) => (r.id === role.id ? role : r)));
    } else {
      // Add new role
      setRoles([...roles, { ...role, id: roles.length + 1 }]);
    }
    setOpen(false);
  };

  const handleEdit = (role) => {
    setCurrentRole(role);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: "name", headerName: "Role Name", flex: 1 },
    {
      field: "permissions",
      headerName: "Permissions",
      flex: 2,
      renderCell: (params) =>
        Object.entries(params.row.permissions)
          .filter(([_, value]) => value)
          .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
          .join(", "),
    },
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
          placeholder="Search Roles"
          value={search}
          onChange={handleSearch}
          size="small"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setCurrentRole({
              name: "",
              permissions: { read: false, write: false, delete: false },
            });
            setOpen(true);
          }}
        >
          Add Role
        </Button>
      </Box>
      <DataGrid
        rows={filteredRoles}
        columns={columns}
        autoHeight
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />

      {/* Add/Edit Role Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{currentRole?.id ? "Edit Role" : "Add Role"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Role Name"
            fullWidth
            variant="outlined"
            value={currentRole?.name || ""}
            onChange={(e) =>
              setCurrentRole({ ...currentRole, name: e.target.value })
            }
          />
          <Box sx={{ marginTop: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={currentRole?.permissions.read || false}
                  onChange={(e) =>
                    setCurrentRole({
                      ...currentRole,
                      permissions: {
                        ...currentRole.permissions,
                        read: e.target.checked,
                      },
                    })
                  }
                />
              }
              label="Read Permission"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={currentRole?.permissions.write || false}
                  onChange={(e) =>
                    setCurrentRole({
                      ...currentRole,
                      permissions: {
                        ...currentRole.permissions,
                        write: e.target.checked,
                      },
                    })
                  }
                />
              }
              label="Write Permission"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={currentRole?.permissions.delete || false}
                  onChange={(e) =>
                    setCurrentRole({
                      ...currentRole,
                      permissions: {
                        ...currentRole.permissions,
                        delete: e.target.checked,
                      },
                    })
                  }
                />
              }
              label="Delete Permission"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => handleAddEditRole(currentRole)}
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

export default RolesList;
