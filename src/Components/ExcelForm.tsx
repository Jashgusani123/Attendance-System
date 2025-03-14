import CloseIcon from "@mui/icons-material/Close";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    IconButton,
    Input,
    Typography,
} from "@mui/material";
import { motion } from "framer-motion";

export default function ExcelForm({ open, handleClose, ExcelFormData , setExcelFormData , SubmitFunc , buttonLoading }: { open: any; handleClose: any , ExcelFormData:any , setExcelFormData:any , SubmitFunc:any , buttonLoading:any}) {
  

  const handleChange = (e: any) => {
    setExcelFormData({ ...ExcelFormData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullScreen>
      <DialogContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "rgba(23, 11, 184, 0.6)", // #170bb8 with transparency
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              position: "relative",
              width: 400,
              p: 3,
              bgcolor: "white",
              borderRadius: 3,
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* Close Button */}
            <IconButton
              sx={{ position: "absolute", top: 10, right: 10 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>

            {/* Title */}
            <Typography
              variant="h5"
              sx={{ textAlign: "center", fontWeight: "bold", color: "#170bb8" }}
            >
              Google Sheet Form
            </Typography>

            {/* Inputs */}
            <Input
              fullWidth
              placeholder="Spreadsheet ID"
              name="spreadsheetId"
              value={ExcelFormData.spreadsheetId}
              onChange={handleChange}
              sx={{ border: "1px solid #ccc", p: 1, borderRadius: 1 }}
            />
            <Input
              fullWidth
              placeholder="Sheet Name"
              name="sheetName"
              value={ExcelFormData.sheetName}
              onChange={handleChange}
              sx={{ border: "1px solid #ccc", p: 1, borderRadius: 1 }}
            />
            <Input
              fullWidth
              placeholder="File Name"
              name="fileName"
              value={ExcelFormData.fileName}
              onChange={handleChange}
              sx={{ border: "1px solid #ccc", p: 1, borderRadius: 1 }}
            />
            <Input
              fullWidth
              placeholder="Today's Classes"
              name="Fromtoday"
              value={"Today"}
              disabled
              sx={{ border: "1px solid #ccc", p: 1, borderRadius: 1 }}
            />

            {/* Submit Button with Animation */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: "#ffc800",
                  color: "black",
                  fontWeight: "bold",
                  py: 1.5,
                  borderRadius: 2,
                  "&:hover": { bgcolor: "#ffb700" },
                }}
                onClick={SubmitFunc}
              >
                {buttonLoading ?"Loading.." :"Submit"}
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
