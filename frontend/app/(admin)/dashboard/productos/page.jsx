'use client';
import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { $Products } from '../../../../stores/products';
import { MdAddShoppingCart, MdDelete, MdEdit } from 'react-icons/md';
import ProductModal from '@/components/app/admin/dashboard/products/ProductModal';
import Search from '@/components/app/admin/dashboard/search/Search';

const ProductsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const products = useStore($Products);
    const itemsPerPage = 8;

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className='flex flex-col gap-5 w-full'>
            <div className='flex min-w-full justify-between'>
                <Search placeholder={"Buscar productos..."} />
                <button
                    className='flex gap-2 mt-4 p-3 rounded-xl text-white bg-green-500'
                    onClick={openModal}
                >
                    <MdAddShoppingCart />
                    Agregar Productos
                </button>
            </div>
            <div className='overflow-hidden rounded-2xl'>
                <table className='w-full'>
                    <thead className='text-xs text-white uppercase bg-primario'>
                        <tr>
                            <th className='p-2'>Producto</th>
                            <th className='p-2'>Estado</th>
                            <th className='p-2'>Stock</th>
                            <th className='p-2'>Precio</th>
                            <th className='p-2'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map(product => (
                            <tr key={product.id} className='even:bg-slate-200'>
                                <td className='p-2'>
                                    <div className='flex gap-2 items-center px-[50px]'>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className='object-cover rounded-full w-[40px] h-[40px]'
                                        />
                                        {product.name}
                                    </div>
                                </td>
                                <td className='text-center'>
                                    <span className='rounded-md p-1 font-[14px] text-white bg-green-500'>
                                        Disponible
                                    </span>
                                </td>
                                <td className='p-2 text-center'>
                                    10
                                </td>
                                <td className='p-2 text-center'>
                                    ${product.price}
                                </td>
                                <td className='flex p-2 justify-evenly items-center'>
                                    <button className='flex items-center bg-green-400 rounded-md p-1 text-white'>
                                        <MdEdit />
                                        Editar
                                    </button>
                                    <button className='flex items-center bg-red-500 rounded-md p-1 text-white'>
                                        <MdDelete />
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='flex justify-between mt-4'>
                    <div className='flex gap-2'>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => handleClick(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            {isModalOpen && <ProductModal onClose={closeModal} />}
        </div>
    );
}

export default ProductsPage;
