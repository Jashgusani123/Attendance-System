import React, { ChangeEvent, FormEvent } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

interface FormData {
  subjectName: string;
  startingTime: string;
  endingTime: string;
  semester: string;
  department: string;
  location: string;
}

interface CreateClassDialogProps {
  createClass: boolean;
  handleCloseDialog: () => void;
  handleSubmitForm: (event: FormEvent) => void;
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
  return (
    <Dialog open={createClass} onClose={handleCloseDialog} className="dialogforclass">
      <DialogTitle className="innerHeading">Create New Class</DialogTitle>
      <form onSubmit={handleSubmitForm} className='innerClassDialog'>
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
          <label>StartingDate</label>

          <TextField
            name="startingTime"
            value={formData.startingTime}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
            type="time"
          />
          <label>EndingDate</label>
          <TextField
            name="endingTime"
            value={formData.endingTime}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
            type="time"
          />
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
            value={formData.location}
            onChange={handleInputChange}
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
          <Button type="submit" >
            Create Class
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateClassDialog;
