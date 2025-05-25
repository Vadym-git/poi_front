import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";
import {
  createCategory,
  updateCategory,
  fetchCategoryDetails,
  deleteCategory,
} from "../web_api/apiAxios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useEffect } from "react";

type FormData = {
  category: string;
};

export default function AddCategory() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();
  const { catId } = useParams<{ catId?: string }>();

  // Load category details if editing an existing category
  useEffect(() => {
    async function loadCategories() {
      try {
        if (catId) {
          const response = await fetchCategoryDetails(catId);
          if (response) {
            reset({ category: response.name }); // Populate form with existing data
          }
        }
      } catch (error) {
        console.error("❌ Failed to fetch categories:", error);
      }
    }

    loadCategories();
  }, [catId]);

  // Handle form submission for both create and update actions
  const onSubmit = async (data: FormData) => {
    try {
      if (!catId) {
        const response = await createCategory(data.category);
        navigate("/");
        console.log("✅ Created successful:", response.data);
      } else {
        const response = await updateCategory(catId, data.category);
        console.log("✅ Category Updated:", response);
      }
    } catch (error: any) {
      console.error(
        "❌ Registration failed:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 460,
        width: "360px",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Typography variant="h5" textAlign="center">
        Category
      </Typography>

      {/* Input field for category name */}
      <TextField
        label="Category Name"
        type="text"
        fullWidth
        slotProps={{
          inputLabel: { shrink: true },
        }}
        {...register("category", {
          required: "Category name is required",
        })}
        error={!!errors.category}
        helperText={errors.category?.message}
      />

      {/* Save button */}
      <Button type="submit" variant="contained" fullWidth>
        Save
      </Button>

      {/* Show delete button if editing an existing category */}
      {catId && (
        <Button
          onClick={async () => {
            if (confirm("Are you sure you want to delete this category?")) {
              try {
                await deleteCategory(catId);
                console.log("✅ Category deleted");
                navigate("/");
              } catch (error: any) {
                console.error(
                  "❌ Delete failed:",
                  error.response?.data || error.message
                );
              }
            }
          }}
          sx={{
            width: 10,
            marginTop: 5,
            color: "white",
            backgroundColor: "red",
            padding: "8px 40px",
          }}
        >
          Delete
        </Button>
      )}
    </Box>
  );
}
