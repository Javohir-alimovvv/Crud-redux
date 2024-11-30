import React, { useState } from 'react'
import "./Crud.scss"
import { useCreateAlimovaliMutation, useDeletAlimovapiMutation, useEditAlimovapiMutation, useGetProductsQuery } from '../../redux/api/product-api'
import { FaTrash } from "react-icons/fa6";
import { LuClipboardEdit } from "react-icons/lu";


const Crud = () => {
  const { data, isLoading, isError, error } = useGetProductsQuery();
  const [createData] = useCreateAlimovaliMutation();
  const [deleteData] = useDeletAlimovapiMutation();
  const [updateData] = useEditAlimovapiMutation();

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    pricetwo: "",
  });

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleCreateEdit = (e) => {
    e.preventDefault();
    if (formData.id) {
      updateData(formData)
        .unwrap()
        .then(() => {
          resetForm();
        })
        .catch((err) => console.log(err));
    } else {
      createData({
        title: formData.title,
        description: formData.description,
        pricetwo: formData.pricetwo,
      })
        .unwrap()
        .then(() => {
          resetForm();
        })
        .catch((err) => console.log(err));
    }
  };

 
  const handleDelete = (id) => {
    deleteData(id)
      .unwrap()
      .then(() => console.log(`Item with id ${id} deleted`))
      .catch((err) => console.log(err));
  };


  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      title: item.title,
      description: item.description,
      pricetwo: item.pricetwo,
    });
  };


  const resetForm = () => {
    setFormData({ id: null, title: "", description: "", pricetwo: "" });
  };


  if (isError) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>

      <div className="container">
        <div className="card">
          <div className="card__top__content">
            <h2 className="card__top__content__text">Crud User</h2>
            <form onSubmit={handleCreateEdit} className="card__top__content__form">
              <input
                value={formData.title || ""}
                onChange={handleChange}
                name="title"
                className="card__top__content__user__data"
                type="text"
                placeholder="Title"
              />
              <input
                value={formData.description || ""}
                onChange={handleChange}
                name="description"
                className="card__top__content__user__data"
                type="text"
                placeholder="Description"
              />
              <input
                value={formData.pricetwo || ""}
                onChange={handleChange}
                name="pricetwo"
                className="card__top__content__user__data"
                type="text"
                placeholder="Price"
              />
              <button className="card__top__content__form__btn">
                {formData.id ? "Update" : "Create"}
              </button>
            </form>
          </div>
          <div className="card__data__content">
            {isLoading && <p>Loading...</p>}
            {data?.map((item) => (
              <div className="card__data__content__card" key={item.id}>
                <div className="card__data__content__image__box">
                  <img
                    className="card__data__content__image"
                    src={item.image}
                    alt=""
                  />
                </div>
                <h3 className="card__data__content__title">{item.title}</h3>
                <h3 className="card__data__content__title">{item.description}</h3>
                <h3 className="card__data__content__title">{item.pricetwo}</h3>
                <div className="card__data__content__card__group">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="card__data__content__card__group__delete"
                  >
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="card__data__content__card__group__edit"
                  >
                    <LuClipboardEdit />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
}

export default Crud