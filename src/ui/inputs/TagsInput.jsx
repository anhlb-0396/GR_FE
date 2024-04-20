import { useState, useEffect } from "react";
import { Chip, TextField } from "@mui/material";

function TagsInput({ control, setValue, initialSkills }) {
  const [tags, setTags] = useState(initialSkills || []);

  useEffect(() => {
    setTags(initialSkills || []);
  }, [initialSkills]);

  const handleAddTag = (event) => {
    const newTag = event.target.value.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setValue("skills", [...tags, newTag].join(", "));
      event.target.value = "";
    }
  };

  const handleRemoveTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    setValue("skills", updatedTags.join(", "));
  };

  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        label="Kỹ năng"
        placeholder="Nhập kỹ năng và nhấn Enter"
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
