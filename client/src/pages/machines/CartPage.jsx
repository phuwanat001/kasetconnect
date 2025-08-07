import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromCart, clearCart } from '../../redux/features/cart/cartSlice';

const CartPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    const handleRemove = (item) => {
        dispatch(removeFromCart(item));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <>
        <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl px-6 py-8 rounded-md max-w-4xl mx-auto">
            <div className="mb-6">
                <h2 className="text-3xl font-bold mb-4">🛒 ตะกร้าสินค้า</h2>
                <div className="flex flex-wrap justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">รวมทั้งหมด: <span className="text-green-600">฿{totalPrice}</span></h2>
                    <div className="flex flex-wrap gap-3 mt-2 sm:mt-0">
                        <button
                            onClick={handleClearCart}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                            ล้างตะกร้า
                        </button>
                        <Link
                            to="/checkout"
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        >
                            ไปชำระเงิน
                        </Link>
                    </div>
                </div>
            </div>

            {
                cartItems.length > 0 ? (
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cartItems.map((product) => (
                            <li key={product._id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                        alt={product.title}
                                        src={product.image || "/assets/books/book-1.png"}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>
                                                <Link to={`/product/${product._id}`}>{product.title}</Link>
                                            </h3>
                                            <p className="sm:ml-4">฿{product.price}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500 capitalize">
                                            <strong>หมวดหมู่:</strong> {product.category}
                                        </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm mt-3">
                                        <p className="text-gray-500">
                                            <strong>จำนวน:</strong> {product.quantity || 1}
                                        </p>
                                        <div className="flex">
                                            <button
                                                onClick={() => handleRemove(product)}
                                                type="button"
                                                className="text-sm text-red-500 font-medium hover:underline"
                                            >
                                                ลบออก
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600 text-center mt-6">ไม่มีสินค้าที่เลือกไว้ในตะกร้า</p>
                )
            }
        </div>
        </>
    )
}

export default CartPage;
