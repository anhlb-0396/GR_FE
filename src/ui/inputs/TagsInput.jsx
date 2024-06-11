import { useState, useEffect } from "react";
import { Chip, TextField } from "@mui/material";

function TagsInput({ value, onChange, error, helperText, label }) {
  const [tags, setTags] = useState(value || []);

  useEffect(() => {
    setTags(value || []);
  }, [value]);

  const handleAddTag = (event) => {
    const newTag = event.target.value.trim();
    if (newTag && !tags.includes(newTag)) {
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);
      onChange(updatedTags);
      event.target.value = "";
    }
  };

  const handleRemoveTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    onChange(updatedTags);
  };

  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        label={label}
        placeholder="Nhập kỹ năng và nhấn Enter"
        error={!!error}
        helperText={helperText}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAddTag(e);
          }
        }}
      />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => handleRemoveTag(index)}
            style={{ marginRight: "8px", marginBottom: "8px" }}
          />
        ))}
      </div>
    </>
  );
}

export default TagsInput;
