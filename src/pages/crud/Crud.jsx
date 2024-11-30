import React from 'react'
import "./Crud.scss"
import { useCreateAlimovaliMutation, useDeletAlimovapiMutation, useGetProductsQuery } from '../../redux/api/product-api'
import { FaTrash } from "react-icons/fa6";
import { LuClipboardEdit } from "react-icons/lu";


const Crud = () => {
  const { data, isLoading, isError, error } = useGetProductsQuery()
  const [deletAlimovapi] = useDeletAlimovapiMutation()
  const [createData, { }] = useCreateAlimovaliMutation()

  const handleCreateAlimovapi = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const newAlimovapi = Object.fromEntries(data)
    createData(newAlimovapi)
      .unwrap()
      .then((res) => {
        e.target.reset()
      })
  }

  const handleDeleteAlimovapi = id => {
    deletAlimovapi(id)
  }

  if (isError) {
    return <div>
      <p>{error.message}</p>
    </div>
  }

  return (
    <>

      <div className="container">
        <div className="card">
          <div className='card__top__content'>
            <h2 className='card__top__content__text'>Crud User</h2>
            <form onSubmit={handleCreateAlimovapi} className='card__top__content__form' action="">
              <input name='title' className='card__top__content__user__data' type="text" />
              <input name='description' className='card__top__content__user__data' type="email" />
              <input name='pricetwo' className='card__top__content__user__data' type="password" />
              <button className='card__top__content__form__btn'>Submit</button>
            </form>
          </div>
          <div className='card__data__content'>
            {
              isLoading && <p className='card__data__content__loading'>Loading...</p>
            }
            {
              data?.map((item) => (
                <div className='card__data__content__card' key={item.id}>
                  <div className='card__data__content__image__box'>
                    <img className='card__data__content__image' src={item.image} alt="" />
                  </div>
                  <h3 className='card__data__content__title'>{item.title}</h3>
                  <h3 className='card__data__content__title'>{item.description}</h3>
                  <h3 className='card__data__content__title'>{item.pricetwo}</h3>
                  <div className='card__data__content__card__group'>
                    <button onClick={()=> handleDeleteAlimovapi(item.id)} className='card__data__content__card__group__delete'><FaTrash /></button>
                    <button className='card__data__content__card__group__edit'><LuClipboardEdit /></button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

    </>
  )
}

export default Crud