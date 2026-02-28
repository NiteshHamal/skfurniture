import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

function EditModal({
  open,
  onClose,
  onSave,
  title,
  fields,
  initialData = {},
  saving = false,
}) {
  const [formData, setFormData] = useState({});
  const [imagePreviews, setImagePreviews] = useState({});

  //Initialize form data when modal opens
  useEffect(() => {
    if (open) {
      setFormData(initialData);
      //Initialize image previews for existing images
      const previews = {};
      fields.forEach((field) => {
        if (field.type === "image" && initialData[field.name]) {
          previews[field.name] = initialData[field.name];
        }
      });
      setImagePreviews(previews);
    }
  }, [open, initialData, fields]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: file,
      }));

      //Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => ({
          ...prev,
          [fieldName]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleClose = () => {
    setFormData({});
    setImagePreviews({});
    onClose();
  };

  const renderField = (field) => {
    switch (field.type) {
      case "image":
        return (
          <Box key={field.name} sx={{ mb: 2 }}>
            {field.label && (
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                {field.label}
              </Typography>
            )}

            {/* Image Preview */}
            {imagePreviews[field.name] && (
              <Box sx={{ mb: 2, textAlign: "center" }}>
                <img
                  src={imagePreviews[field.name]}
                  alt={field.label || "Preview"}
                  style={{
                    maxWidth: "100%",
                    maxHeight: 150,
                    objectFit: "contain",
                    borderRadius: 4,
                    border: "1px solid #e0e0e0",
                  }}
                />
              </Box>
            )}

            {/* Upload Button */}
            <Button variant="outlined" component="label" fullWidth>
              {imagePreviews[field.name] ? "Change Image" : "Upload Image"}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleImageChange(e, field.name)}
              />
            </Button>
          </Box>
        );

      case "textarea":
        return (
          <TextField
            key={field.name}
            fullWidth
            label={field.label}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleInputChange}
            multiline
            rows={field.rows || 3}
            required={field.required}
            sx={{ mb: 2 }}
          />
        );

      case "select":
        return (
          <TextField
            key={field.name}
            fullWidth
            select
            label={field.label}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleInputChange}
            required={field.required}
            sx={{ mb: 2 }}
            SelectProps={{
              native: true,
            }}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        );

      default:
        return (
          <TextField
            key={field.name}
            fullWidth
            label={field.label}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleInputChange}
            required={field.required}
            sx={{ mb: 2 }}
          ></TextField>
        );
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="dynamic-modal">
      <Box sx={modalStyle}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography varient="h6" component="h2">
            {title}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit}>
          {fields.map((field) => renderField(field))}

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
              mt: 3,
            }}
          >
            <Button variant="outlined" onClick={handleClose} disabled={saving}>
              Cancel
            </Button>

            <Button type="submit" variant="contained" disabled={saving}>
              {saving ? "Saving. . ." : "Save Changes"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default EditModal;
