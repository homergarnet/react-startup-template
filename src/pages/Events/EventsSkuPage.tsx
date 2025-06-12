import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StyledButton from "../../Components/ReusableComponents/ButtonComponents/StyledButton";
import DateRangePicker from "../Events/components/DateRangePicker";


type ChipColor =
  | "primary"
  | "success"
  | "default"
  | "secondary"
  | "error"
  | "info"
  | "warning";

interface EventItem {
  id: number;
  duration: string;
  description: string;
  type: string;
  typeColor: ChipColor;
  sku: string;
  skuDesc: string;
  clubs: string;
}

const EventsSkuPage = () => {
  const [events, setEvents] = useState<EventItem[]>([
    {
      id: 1,
      duration: "Apr 17 – 20, 2025",
      description: "Holy Week",
      type: "Public",
      typeColor: "primary",
      sku: "-",
      skuDesc: "-",
      clubs: "ALL",
    },
    {
      id: 2,
      duration: "March 25 – 31, 2025",
      description: "Vendor Promotion",
      type: "Internal",
      typeColor: "success",
      sku: "10367",
      skuDesc: "SMART SHOPPER FTN 400SHEETS/2PK",
      clubs: "MM, Luzon",
    },
  ]);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isModifyOpen, setIsModifyOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editData, setEditData] = useState<EventItem | null>(null);
  const [newEvent, setNewEvent] = useState<Omit<EventItem, "id" | "typeColor">>({
    duration: "",
    description: "",
    type: "Public",
    sku: "",
    skuDesc: "",
    clubs: "",
  });

  const handleModify = () => {
    const selected = events.find((e) => e.id === selectedIds[0]);
    setEditData(selected || null);
    setIsModifyOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteOpen(true);
  };

  const handleAddEvent = () => {
    setIsAddOpen(true);
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleCloseModify = () => {
    setIsModifyOpen(false);
    setEditData(null);
  };

  const handleCloseDelete = () => {
    setIsDeleteOpen(false);
  };

  const handleCloseAdd = () => {
    setIsAddOpen(false);
    setNewEvent({
      duration: "",
      description: "",
      type: "",
      sku: "",
      skuDesc: "",
      clubs: "",
    });
  };

  const handleSaveEdit = () => {
    if (editData) {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === editData.id ? { ...editData } : event
        )
      );
    }
    setIsModifyOpen(false);
    setEditData(null);
  };

  const handleDeleteConfirm = () => {
    setEvents((prev) => prev.filter((event) => !selectedIds.includes(event.id)));
    setSelectedIds([]);
    setIsDeleteOpen(false);
  };

  const handleSaveNewEvent = () => {
    const newId = Math.max(...events.map((e) => e.id), 0) + 1;
    const typeColor: ChipColor =
      newEvent.type === "Public" ? "primary" : "success";
    setEvents((prev) => [
      ...prev,
      { ...newEvent, id: newId, typeColor },
    ]);
    handleCloseAdd();
  };

  

  return (
    <Box sx={{ px: 3, pt: 2, flexGrow: 1 }}>
      {/* Header */}
      <Grid container justifyContent="space-between" alignItems="flex-start" spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1C2C5A", mb: 1 }}>
            Events
          </Typography>
          <StyledButton variant="contained" onClick={handleAddEvent}>
            Add an Event
          </StyledButton>
        </Grid>

        <Grid item xs={12} sm={6} sx={{ textAlign: { xs: "left", sm: "right" } }}>
          <Typography variant="body1" sx={{ fontWeight: 500, color: "#1C2C5A", mb: 1 }}>
            Last Sync Date: <strong>June 19, 2024</strong>
          </Typography>
          <Box sx={{ display: "inline-flex", gap: 1 }}>
            <IconButton
              size="small"
              color="primary"
              disabled={selectedIds.length !== 1}
              onClick={handleModify}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" sx={{ mt: "4px" }}>Modify</Typography>

            <IconButton
              size="small"
              color="error"
              disabled={selectedIds.length === 0}
              onClick={handleDelete}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" sx={{ mt: "4px" }}>Delete</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Table */}
      <Paper elevation={1} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#0F2B5B" }}>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }} />
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Event Duration</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Event Description</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Type</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>SKU</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>SKU Description</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Clubs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id} hover>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedIds.includes(event.id)}
                    onChange={() => handleCheckboxChange(event.id)}
                  />
                </TableCell>
                <TableCell>{event.duration}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>
                  <Chip
                    label={event.type}
                    color={event.typeColor}
                    size="small"
                    sx={{ color: "#fff", fontWeight: 500 }}
                  />
                </TableCell>
                <TableCell>{event.sku}</TableCell>
                <TableCell>{event.skuDesc}</TableCell>
                <TableCell>{event.clubs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Edit Modal */}
      <Dialog open={isModifyOpen} onClose={handleCloseModify}>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          {editData && (
            <Box>
              <TextField
                fullWidth
                label="Event Duration"
                value={editData.duration}
                onChange={(e) => setEditData({ ...editData, duration: e.target.value })}
                sx={{ mb: 2, mt: 3 }}
              />
              <TextField
                fullWidth
                label="Event Description"
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                select
                label="Event Type"
                value={editData.type}
                onChange={(e) => setEditData({ ...editData, type: e.target.value, typeColor: e.target.value === "Public" ? "primary" : "success" })}
                sx={{ mb: 2 }}
              >
                <MenuItem value="Public">Public</MenuItem>
                <MenuItem value="Internal">Internal</MenuItem>
              </TextField>
              <TextField
                fullWidth
                label="Event SKU"
                value={editData.sku}
                onChange={(e) => setEditData({ ...editData, sku: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Event SKU Description"
                value={editData.skuDesc}
                onChange={(e) => setEditData({ ...editData, skuDesc: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Event Clubs"
                value={editData.clubs}
                onChange={(e) => setEditData({ ...editData, clubs: e.target.value })}
                sx={{ mb: 2 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModify} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Event Modal */}
      <Dialog open={isAddOpen} onClose={handleCloseAdd}>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <Box>
            <DateRangePicker
              startLabel="Start Date"
              endLabel="End Date"
              onChange={(range, formatted) => {
                setNewEvent((prev) => ({ ...prev, duration: formatted }));
              }}
              error={!newEvent.duration && !!newEvent.description}
              helperText={
                !newEvent.duration && !!newEvent.description
                  ? "Please select a date range"
                  : ""
              }
              
            />
            <TextField
              fullWidth
              label="Event Description"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent((prev) => ({ ...prev, description: e.target.value }))
              }
              sx={{ mb: 2, mt: 2 }}
            />
            <TextField
              fullWidth
              select
              label="Event Type"
              value={newEvent.type}
              onChange={(e) =>
                setNewEvent((prev) => ({ ...prev, type: e.target.value }))
              }
              sx={{ mb: 2 }}
            >
              <MenuItem value="Public">Public</MenuItem>
              <MenuItem value="Internal">Internal</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Event SKU"
              value={newEvent.sku}
              onChange={(e) =>
                setNewEvent((prev) => ({ ...prev, sku: e.target.value }))
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Event SKU Description"
              value={newEvent.skuDesc}
              onChange={(e) =>
                setNewEvent((prev) => ({ ...prev, skuDesc: e.target.value }))
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Event Clubs"
              value={newEvent.clubs}
              onChange={(e) =>
                setNewEvent((prev) => ({ ...prev, clubs: e.target.value }))
              }
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveNewEvent} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteOpen} onClose={handleCloseDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the selected events?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EventsSkuPage;