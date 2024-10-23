import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Table,
} from "react-bootstrap";
import { useSearchExport } from "../../context/SearchExportContext";
import NewResuableForm from "../../components/form/NewResuableForm";
import { toast } from "react-toastify";
import instance from "../../api/AxiosInstance";
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ThreeDots } from 'react-loader-spinner'; // Spinner for loading state

const Infrastructure = () => {
  const { setData, filteredData } = useSearchExport();
  const [team, setTeam] = useState([]);
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [eyeVisibilityById, setEyeVisibilityById] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const CustomHeader = ({ name }) => (
    <div style={{ fontWeight: "bold", color: "black", fontSize: "16px" }}>
      {name}
    </div>
  );



  const tableColumns = (currentPage, rowsPerPage) => [
    {
      name: <CustomHeader name="Sr. No." />,
      selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
    },

    {
      name: <CustomHeader name="Title" />,
      cell: (row) => <span>{row.title}</span>,
    },
    {
      name: <CustomHeader name="Description" />,
      cell: (row) => <span>{row.desc}</span>,
    },
    {
      name: <CustomHeader name="Category" />,
      cell: (row) => <span>{row.ServiceName.title}</span>,
    },
    {
      name: <CustomHeader name="Image" />,
      cell: (row) => (
        <img
          src={row.img}
          alt="Infrastructure"
          style={{ width: "100px", height: "auto" }}
        />
      ),
    },
    {
      name: <CustomHeader name="Actions" />,
      cell: (row) => (
        <div className="d-flex">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="edit-tooltip">Edit</Tooltip>}
          >
            <Button className="ms-1" onClick={() => toggleEdit(row.id)}>
              <FaEdit />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="delete-tooltip">Delete</Tooltip>}
          >
            <Button
              className="ms-1"
              style={{ backgroundColor: "red", color: "white", borderColor: "red" }}
              onClick={() => handleDelete(row.id)}
            >
              <FaTrash />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="visibility-tooltip">{eyeVisibilityById[row.id] ? 'Hide' : 'Show'}</Tooltip>}
          >
            <Button
              className="ms-1"
              style={{
                backgroundColor: eyeVisibilityById[row.id] ? 'red' : 'green',
                borderColor: eyeVisibilityById[row.id] ? 'red' : 'green',
                color: 'white',
              }}
              onClick={() => handleIsActive(row.id, !eyeVisibilityById[row.id])}
            >
              {eyeVisibilityById[row.id] ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </OverlayTrigger>
        </div>
      ),
    },


  ];

  useEffect(() => {
    fetchTeam();
    fetchProducts();
    const storedVisibility = JSON.parse(localStorage.getItem('eyeVisibilityById')) || {};
    setEyeVisibilityById(storedVisibility);
  }, []);

  const fetchProducts = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await instance.get("ServiceName/find", {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });
      setProducts(response.data.responseData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const validateForm = (formData) => {
    let errors = {};
    let isValid = true;

    if (!formData.img) {
      errors.img = "Image is required with 377x241 pixels";
      isValid = false;
    } else if (formData.img instanceof File && !validateImageSize(formData.img)) {
      errors.img = "Image is not 377x241 pixels";
      isValid = false;
    }
    if (!formData.productId?.trim()) {
      errors.productId = "Product Name is required";
      isValid = false;
    }
    if (!formData.title?.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }
    if (!formData.description?.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };
  const validateImageSize = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        if (img.width === 377 && img.height === 241) {
          resolve();
        } else {
          reject("Image is required with 377x241 pixels");
        }
      };
      img.onerror = () => reject("Error loading image");
      img.src = URL.createObjectURL(file);
    });
  };

  const fetchTeam = async () => {
    setLoading(true);
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await instance.get("ServiceDetail/find", {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });
      const reversedData = response.data.responseData.reverse();
      setTeam(reversedData);
      setData(reversedData);
    } catch (error) {
      console.error("Error fetching team:", error.response || error.message || error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name, value) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm(formData)) {
      const accessToken = localStorage.getItem("accessToken");
      const data = new FormData();
      data.append("img", formData.img);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("productId", formData.productId);

      try {
        if (editMode) {
          await instance.put(`ServiceDetail/update/${editingId}`, data, {
            headers: {
              Authorization: "Bearer " + accessToken,
              "Content-Type": "multipart/form-data",
            },
          });
          toast.success("Updated successfully!");
        } else {
          await instance.post("ServiceDetail/add", data, {
            headers: {
              Authorization: "Bearer " + accessToken,
              "Content-Type": "multipart/form-data",
            },
          });
          toast.success("Created successfully!");
        }
        fetchTeam();
        resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Error occurred while submitting!");
      }
    }
  };

  const resetForm = () => {
    setFormData({});
    setEditingId(null);
    setEditMode(false);
    setShowForm(false);
    setErrors({});
  };

  const toggleEdit = (id) => {
    const itemToEdit = team.find((item) => item.id === id);
    setEditingId(id);
    setEditMode(true);
    setFormData({
      img: itemToEdit.img,
      title: itemToEdit.title,
      description: itemToEdit.description,
      productId: itemToEdit.productId,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this item?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const accessToken = localStorage.getItem("accessToken");
            try {
              await instance.delete(`ServiceDetail/isdelete/${id}`, {
                headers: {
                  Authorization: "Bearer " + accessToken,
                  "Content-Type": "application/json",
                },
              });
              fetchTeam();
              toast.success("Deleted successfully!");
            } catch (error) {
              console.error("Error deleting item:", error);
              toast.error("Error occurred while deleting!");
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleIsActive = (id, isActive) => {
    const accessToken = localStorage.getItem("accessToken");
    const updatedVisibility = { ...eyeVisibilityById, [id]: isActive };
    setEyeVisibilityById(updatedVisibility);

    instance
      .put(`ServiceDetail/isactive/${id}`, { isActive }, {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        toast.success(`Updated status successfully!`);
      })
      .catch((error) => {
        console.error("Error updating visibility:", error);
        toast.error("Error occurred while updating visibility!");
      });
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col md={12} >
          {/* <h4 className="text-center">Infrastructure Form</h4> */}
          <Button variant="outline-success"

            className="ms-2 mb-3 d-flex justify-content-end " onClick={() => setShowForm((prev) => !prev)}>
            {showForm ? "Hide Form" : "Add"}
          </Button>
          {showForm && (
            <Form onSubmit={handleSubmit} className="mt-3">
              <Form.Group controlId="formProduct" className="mt-2">
                <Form.Label>Application Category Name</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.productId || ""}
                  onChange={(e) => handleChange("productId", e.target.value)}
                  isInvalid={!!errors.productId}
                >
                  <option value="">Select a Application Category</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.title} {/* Assuming 'name' is the field for product name */}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.productId}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formTitle">
                <Form.Label>Application Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Application title"
                  value={formData.title || ""}
                  onChange={(e) => handleChange("title", e.target.value)}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
              </Form.Group>
              {/* <Form.Group controlId="formDescription" className="mt-2">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  value={formData.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                  isInvalid={!!errors.description}
                /> */}


              <Col md={12}>
                <NewResuableForm
                  label="Application Description"
                  placeholder="Enter Description"
                  name="description"
                  type="text"
                  onChange={handleChange}
                  initialData={formData}
                  textarea
                  useJodit={true}
                  error={errors.description}
                />
              </Col>





              {/* <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
              </Form.Group> */}
              {/* <Form.Group controlId="formImage" className="mt-2">
                <Form.Label>Application Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => handleChange("img", e.target.files[0])}
                  isInvalid={!!errors.img}
                /> */}
                 <NewResuableForm
                      label={"Upload Application Image"}
                      placeholder={"Upload Image"}
                      name={"img"}
                      type={"file"}
                      onChange={handleChange}
                      initialData={formData}
                      error={errors.img}
                      imageDimensiion="Image must be 377*241 pixels"
                    />
                {/* <Form.Control.Feedback type="invalid">{errors.img}</Form.Control.Feedback>
              </Form.Group> */}
              <Button variant="primary" type="submit" className="mt-3">
                {editMode ? "Update" : "Submit"}
              </Button>
              <Button variant="secondary" onClick={resetForm} className="mt-3 ms-2">
                Reset
              </Button>
            </Form>
          )}
        </Col>
        <Col md={12}>
          {/* <h4 className="text-center">Infrastructure List</h4> */}
          {loading ? (
            <div className="d-flex justify-content-center mt-5">
              <ThreeDots color="#00BFFF" height={80} width={80} />
            </div>
          ) : (
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Application Category Name</th>
                  <th>Application Title</th>
                  <th>Application Description</th>
                 
                  <th>Image</th>

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {team.map((row, index) => (
                  <tr key={row.id}>
                    <td>{index + 1}</td>
                    <td>{row.ServiceName.title}</td>
                    <td>{row.title}</td>
                    <td
                      dangerouslySetInnerHTML={{
                        __html: row.description,
                      }}
                    ></td>
                    <td>{row.ServiceName.title}</td>
                    <td>
                      <img
                        src={row.img}
                        alt="Infrastructure"
                        style={{ width: "100px", height: "auto" }}
                      />
                    </td>
                    <td>
                      <div className="d-flex">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                          <Button className="ms-1" onClick={() => toggleEdit(row.id)}>
                            <FaEdit />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                          <Button
                            className="ms-1"
                            style={{ backgroundColor: "red", color: "white" }}
                            onClick={() => handleDelete(row.id)}
                          >
                            <FaTrash />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Toggle Visibility</Tooltip>}>
                          <Button
                            className="ms-1"
                            onClick={() => handleIsActive(row.id, !eyeVisibilityById[row.id])}
                          >
                            {eyeVisibilityById[row.id] ? <FaEye /> : <FaEyeSlash />}
                          </Button>
                        </OverlayTrigger>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Infrastructure;
