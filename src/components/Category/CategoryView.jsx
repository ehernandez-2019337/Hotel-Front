import { useEffect, useState } from 'react'
import { Navbar } from '../navbar/Navbar'
import { Link } from 'react-router-dom';
import { useDeleteCategory } from '../../shared/hooks/categories/useDeleteCategory'
import { useSaveCategory } from '../../shared/hooks/categories/useSaveCategory'
import { useUpdateCategory } from '../../shared/hooks/categories/useUpdateCategory'

const FormAdmin = ({ category, getCategories, setEditingCategory }) => {
    const { save } = useSaveCategory();
    const { updateCategory } = useUpdateCategory();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name,
                description: category.description,
            });
        }
    }, [category]);

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const clearForm = () => {
        setFormData({
            name: '',
            description: '',
        });
        setEditingCategory(null);
    };

    const onHandleSave = async () => {
        try {
            const categoryData = {
                name: formData.name,
                description: formData.description,
            };
            if (category) {
                await updateCategory(category._id, categoryData);
            } else {
                await save(formData.name, formData.description);
            }
            getCategories();
            clearForm();
        } catch (error) {
            console.error('Error con categoria', error);
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-lg-6">
                <div className="card shadow-lg">
                    <div className="card-header bg-warning text-black">
                        <h4 className="card-title text-center mb-0">Categoría</h4>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Nombre
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Ingresa el tipo de categoría"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Descripción
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                placeholder="Ingresa la descripción de la categoría"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button
                                className="btn btn-success me-3"
                                onClick={onHandleSave}
                            >
                                {category ? 'Actualizar' : 'Guardar'}
                            </button>
                            <button
                                className="btn btn-danger me-3"
                                onClick={clearForm}
                            >
                                Cancelar
                            </button>
                            <Link
                                to="/hotels/hotelView"
                                className="btn btn-secondary"
                            >
                                Hoteles
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export const CategoryView = ({ categories, getCategories }) => {
    const userRole = localStorage.getItem('userRole')
    const [editingCategory, setEditingCategory] = useState(null)
    const { deleteCategory } = useDeleteCategory()

    const handleDeleteCategory = async (categoryId) => {
        try {
            await deleteCategory(categoryId);
            getCategories()
        } catch (error) {
            console.error('Error al eliminar categoria', error);
        }
    }

    const handleEditCategory = (category) => {
        setEditingCategory(category);
    };

    //Card que ven los usuarios de los categoryos
    return (
        <>
            <Navbar />
            {userRole === 'ADMIN' && (
                <FormAdmin
                    category={editingCategory}
                    getCategories={getCategories}
                    setEditingCategory={setEditingCategory}
                />
            )}
            <br />

            <div className="row mx-4">
                {categories.map((category) => (
                    <div key={category._id} className="col-md-6 mb-4">
                        <div className="card h-100" style={{ fontSize: "1.2rem" }}>
                            <div className="card-body">
                                <h4 className="card-title">{category.name}</h4>
                                <p className="card-text">Descripción: {category.description}</p>
                                {userRole === "ADMIN" && (
                                    <div className="d-flex justify-content-end">
                                        <button
                                            name="button"
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => handleEditCategory(category)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            name="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDeleteCategory(category._id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
