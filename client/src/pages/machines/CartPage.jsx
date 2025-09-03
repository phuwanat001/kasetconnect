import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromCart, clearCart , increaseQuantity, decreaseQuantity} from '../../redux/features/cart/cartSlice';
import { getImgUrl } from '../../utils/getImgUrl';

const CartPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    const handleRemove = (product) => {
        dispatch(removeFromCart(product));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const categoryMap = {
    "688f33e595b62613b179a3b0": "เครื่องจักรเตรียมดิน",
    "688f34f795b62613b179a3b2": "เครื่องจักรปลูกพืช",
    "688f36c38807c6067eb1f192": "ระบบให้น้ำ/เครื่องจักรชลประทาน",
    "68939df421a47768535c175f": "เครื่องจักรดูแลรักษาพืช",
    "689ae14e2067200086dde897": "เครื่องจักรเก็บเกี่ยว",
    "689ae15b2067200086dde89a": "เครื่องจักรหลังการเก็บเกี่ยว"
  }

    return (
        <>
        <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl px-6 py-8 rounded-md max-w-4xl mx-auto">
            <div className="mb-6">
                <h2 className="text-3xl font-bold mb-4">🛒 ตะกร้าสินค้า</h2>
                <div className="flex flex-wrap justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">รวมทั้งหมด: 
                        <span className="text-green-600">฿{totalPrice ? totalPrice : 0}</span></h2>
                    <div className="flex flex-wrap gap-3 mt-2 sm:mt-0">
                        <button
                            onClick={handleClearCart}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >ล้างตะกร้า 
                        </button>
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
                                        alt=""
                                        src={`${getImgUrl(product?.coverImage)}`}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>
                                                <Link to={`/product/${product._id}`}>{product.name}</Link>
                                            </h3>
                                            <p className="sm:ml-4">฿{product.price} /วัน</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500 capitalize py-1"><strong>หมวดหมู่:</strong> {categoryMap[product.product_type] || '-'}</p>
                                        <p className="text-sm text-gray-500 mb-1"><strong>สถานะ :</strong> {product.status === "available" ? (
                                            <span className="text-green-600">ว่าง จำนวน {product.stock} คัน</span>
                                            ) : (
                                            <span className="text-red-600">ไม่ว่าง</span>
                                            )}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm mt-3">
                                        <p className="text-gray-500 flex items-center gap-2">
                                            <strong>จำนวน:</strong>
                                            <button
                                                onClick={() => dispatch(decreaseQuantity(product))}
                                                className='px-2 py-1 bg-gray-200 rounded hover:bg-gray-300'
                                            > -
                                            </button>
                                            <span>{product.quantity}</span>
                                            <button
                                                onClick={() => dispatch(increaseQuantity(product))}
                                                className='px-2 py-1 bg-gray-200 rounded hover:bg-gray-300'
                                            >
                                                +
                                            </button>
                                        </p>
                                        <div className="flex">
                                            <button
                                                onClick={() => handleRemove(product)}
                                                type="button"
                                                className="text-sm text-red-500 font-medium hover:underline"
                                            >ลบออก 
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

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="mt-6">
                    <Link
                    to="/rental"
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                    ทำรายการเช่า
                    </Link>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <Link to="/">
                    or 
                    <button
                        type="button"

                        className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                    >
                        เลือกซื้อสินค้าต่อ
                        <span aria-hidden="true"> &rarr;</span>
                    </button>
                    </Link>
                </div>
                </div>

        </div>
        </>
    )
}

export default CartPage;
