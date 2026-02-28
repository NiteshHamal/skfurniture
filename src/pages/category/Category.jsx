import { Add, CategoryOutlined } from "@mui/icons-material";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTable from "../../components/CustomTable";
import api from "../../services/api";
import EditModal from "../../components/EditModal";
import axios from "axios";

function CustomTabPanel({ children, value, index }) {
  return value === index && <Box sx={{ p: 2 }}>{children}</Box>;
}

function Category() {
  const [value, setValue] = useState(0);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState({
    categories: true,
    subCategories: false,
  });

  //modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    fields: [],
    initialData: [],
    onSave: null,
    type: "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 1 && subCategories.length === 0) {
      fetchsubCategories();
    }
  };

  //fetch Categories
  const fetchCategories = async () => {
    try {
      const response = await api.get("/api/admin/categories");
      setCategories(response.data.data || []);
      console.log("Categories:", response.data.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading((prev) => ({
        ...prev,
        categories: false,
      }));
    }
  };

  //fetch subcategories
  const fetchsubCategories = async () => {
    setLoading((prev) => ({ ...prev, subCategories: true }));
    try {
      const response = await api.get("/api/admin/sub-categories");
      setSubCategories(response.data.data || []);
      console.log("Sub-categories:", response.data.data);
    } catch (err) {
      console.log("Error fetchibng sub-categoreis:", err);
    } finally {
      setLoading((prev) => ({ ...prev, subCategories: false }));
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add this helper function
  const stripHtmlTags = (html) => {
    if (!html) return "";
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const handleEditCategory = (row) => {
    const fields = [
      {
        name: "image",
        type: "image",
        label: "Category Image",
      },
      {
        name: "name",
        label: "Category Name",
        type: "text",
        required: true,
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        rows: 3,
      },
    ];

    setModalConfig({
      title: "Edit Category",
      fields,
      initialData: {
        id: row.id,
        name: row.name,
        description: stripHtmlTags(row.description),
        image: row.image,
      },
      type: "category",
      onSave: async (formData) => {
        setSaving(true);
        try {
          const data = new FormData();
          data.append("name", formData.name);
          data.append("description", formData.descrition);

          if (formData.image instanceof File) {
            data.append("category_image", formData.image);
          }

          const response = await api.post(
            "/api/admin/categories/${row.id}",
            data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          );

          console.log("Category upodated:", response.data);
          await fetchCategories();
          setModalOpen(false);
        } catch (err) {
          console.error("Error updateing category;", err);
          alert("Failed to update category");
        } finally {
          setSaving(false);
        }
      },
    });
    setModalOpen(true);
    console.log("Edit category:", row);
  };

  const categoryColumns = [
    { key: "image", label: "Image" },
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    { key: "action", label: "Action" },
  ];

  const subCategoryColumns = [
    { key: "image", label: "Image" },
    { key: "name", label: "Name" },
    { key: "category", label: "Category" },
  ];

  const categoryRows = categories.map((cat) => ({
    id: cat.id,
    image: cat.category_image,
    name: cat.name,
    description: cat.description,
  }));

  const subCategoryRows = subCategories.map((subCat) => ({
    id: subCat.id,
    image: subCat.category_image || subCat.image,
    name: subCat.name,
    category: subCat.parent?.name || "N/A",
  }));

  const handleAddNew = () => {
    if (value === 0) {
      //Add new Category
      const fields = [
        { name: "image", type: "image", label: "Category Image" },
        { name: "name", label: "Category Name", type: "text", required: true },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          rows: 3,
        },
      ];

      setModalConfig({
        title: "Add New Category",
        fields,
        initialData: {},
        type: "category",
        onSAve: async (formData) => {
          setSaving(true);
          try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("description", formData.description);
            if (formData.image instanceof File) {
              data.append("category_image", formData.image);
            }
            const response = await api.post("/api/admin/categories", data, {
              headers: { "Content-Type": "multiple/form-data" },
            });
            console.log("Category added:", response.data);
            await fetchCategories();
            setModalOpen(false);
          } catch (err) {
            console.error("Error adding category:", err);
            alert("Failed to add category");
          } finally {
            setSaving(false);
          }
        },
      });
      setModalOpen(true);
      console.log("Add new category");
    } else {
      console.log("Add new sub-category");
    }
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "#f8fafc",
          minHeight: "100vh",
          p: { xs: 1.5, sm: 3 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Tabs value={value} onChange={handleChange}>
            <Tab
              label="Category"
              icon={<CategoryOutlined />}
              iconPosition="start"
            />
            <Tab
              label="Sub-Category"
              icon={<CategoryOutlined />}
              iconPosition="start"
            />
          </Tabs>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddNew}
            sx={{
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            Add New {value === 0 ? "Category" : "Sub-Category"}
          </Button>
        </Box>

        <CustomTabPanel value={value} index={0}>
          {loading.categories ? (
            <Typography>Loading categories. . .</Typography>
          ) : (
            <CustomTable
              columns={categoryColumns}
              rows={categoryRows}
              onEdit={handleEditCategory}
            />
          )}
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          {loading.subCategories ? (
            <Typography>Loading sub-categories...</Typography>
          ) : (
            <CustomTable columns={subCategoryColumns} rows={subCategoryRows} />
          )}
        </CustomTabPanel>

        {/* Dunamic Edit Modal */}
        <EditModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={modalConfig.onSave}
          title={modalConfig.title}
          fields={modalConfig.fields}
          initialData={modalConfig.initialData}
          saving={saving}
        />
      </Box>
    </>
  );
}

export default Category;
