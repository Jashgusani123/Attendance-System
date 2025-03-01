import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

interface FormData {
  subjectName: string;
  startingTime: string;
  endingTime: string;
  semester: string;
  department: string;
  location: { latitude: number; longitude: number };
}

interface CreateClassDialogProps {
  createClass: boolean;
  handleCloseDialog: () => void;
  handleSubmitForm: (event: FormEvent, formData: FormData) => void;
  formData: FormData;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  loadingLocation: boolean;
}

const CreateClassDialog: React.FC<CreateClassDialogProps> = ({
  createClass,
  handleCloseDialog,
  handleSubmitForm,
  formData,
  handleInputChange,
  loadingLocation
}) => {
  
  const [error, setError] = useState<string | null>(null);

  const validateTime = (): boolean => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date

    const startDate = new Date(`${today}T${formData.startingTime}`);
    const endDate = new Date(`${today}T${formData.endingTime}`);

    if (endDate <= startDate) {
      setError("Ending time must be after starting time!");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (validateTime()) {
      handleSubmitForm(event, formData);
    }
  };

  return (
    <Dialog open={createClass} onClose={handleCloseDialog} className="dialogforclass">
      <DialogTitle className="innerHeading">Create New Class</DialogTitle>
      <form onSubmit={handleSubmit} className='innerClassDialog'>
        <DialogContent>
          <label>Subject Name</label>
          <TextField
            name="subjectName"
            value={formData.subjectName}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
            placeholder='SubjectName'
          />
          <label>Starting Time</label>
          <TextField
            name="startingTime"
            value={formData.startingTime}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
            type="time"
          />
          <label>Ending Time</label>
          <TextField
            name="endingTime"
            value={formData.endingTime}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
            type="time"
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <label>Semester</label>
          <TextField
            name="semester"
            value={formData.semester}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
            placeholder='Semester*'
          />
          <label>Department</label>
          <TextField
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
            placeholder='Department*'
          />
          <label>Location</label>
          <TextField
            name="location"
            value={`${formData.location.latitude}, ${formData.location.longitude}`}
            fullWidth
            required
            margin="normal"
            placeholder='Location*'
            disabled
          />
          {loadingLocation && <p>Loading location...</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button type="submit">
            Create Class
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateClassDialog;
