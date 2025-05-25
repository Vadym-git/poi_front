import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  createPlacemark,
  updatePlacemark,
  fetchPlacemarkDetails,
  fetchAllCategories,
} from "../web_api/apiAxios";
import { useParams, useNavigate } from "react-router";
import type { Placemark } from "~/web_api/types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function PlacemarkForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Placemark>({
    defaultValues: {
      name: "",
      categories: [],
      title: "",
      address: "",
      openh: "",
      description: "",
      location: { type: "Point", coordinates: [0, 0] },
      images: [],
      views: [],
    },
  });

  const { poiId } = useParams<{ poiId?: string }>();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function loadInitialData() {
      const _categories = await fetchAllCategories();
      setCategories(_categories.data);
      if (poiId) {
        const _placemark = await fetchPlacemarkDetails(poiId);
        console.log(_placemark);
        if (_placemark) {
          reset(_placemark);
        }
      }
    }
    loadInitialData();
  }, [poiId, reset]);

  const onSubmit = async (data: Placemark) => {
    try {
      if (poiId) {
        console.log("=====================");
        await updatePlacemark(poiId, data);
      } else {
        await createPlacemark(data);
      }
      navigate("/");
    } catch (error: any) {
      console.error(
        "❌ Failed to submit placemark:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 800,
        overflowY: "auto",
        width: 600,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        paddingBottom: 2,
      }}
    >
      <Typography variant="h5" textAlign="center">
        Placemark
      </Typography>

      <TextField
        label="Name"
        slotProps={{ inputLabel: { shrink: true } }}
        {...register("name", { required: true })}
        error={!!errors.name}
      />

      <FormControl fullWidth>
        <InputLabel>Categories</InputLabel>
        <Controller
          name="categories"
          control={control}
          render={({ field }) => (
            <Select
              multiple
              value={field.value}
              onChange={field.onChange}
              input={<OutlinedInput label="Categories" />}
              renderValue={(selected) =>
                categories
                  .filter((cat) => selected.includes(cat._id))
                  .map((cat) => cat.name)
                  .join(", ")
              }
              MenuProps={MenuProps}
            >
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  <Checkbox checked={field.value.includes(cat._id)} />
                  <ListItemText primary={cat.name} />
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      <TextField
        label="Title"
        slotProps={{ inputLabel: { shrink: true } }}
        {...register("title")}
      />
      <TextField
        label="Address"
        slotProps={{ inputLabel: { shrink: true } }}
        {...register("address")}
      />
      <TextField
        label="Open Hours"
        slotProps={{ inputLabel: { shrink: true } }}
        {...register("openh")}
      />
      <TextField
        label="Description"
        multiline
        rows={12}
        slotProps={{ inputLabel: { shrink: true } }}
        {...register("description")}
      />

      <TextField
        label="Longitude"
        inputProps={{ step: "any" }}
        type="number"
        slotProps={{ inputLabel: { shrink: true } }}
        {...register("location.coordinates.0", { valueAsNumber: true })}
      />
      <TextField
        label="Latitude"
        inputProps={{ step: "any" }}
        type="number"
        slotProps={{ inputLabel: { shrink: true } }}
        {...register("location.coordinates.1", { valueAsNumber: true })}
      />

      <TextField
        label="Image URLs (comma-separated)"
        multiline
        rows={12}
        slotProps={{ inputLabel: { shrink: true } }}
        {...register("images")}
        onBlur={(e) => {
          const urls = e.target.value
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
          reset((prev) => ({ ...prev, images: urls }));
        }}
      />

      <Button type="submit" variant="contained">
        Save
      </Button>
    </Box>
  );
}
