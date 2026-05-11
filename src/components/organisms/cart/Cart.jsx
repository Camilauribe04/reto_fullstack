import { useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../../../store/cartStore";
import { imageMap } from "../../../assets/imageMap";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const incrementItem = useCartStore((state) => state.incrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  const subtotal = getTotalPrice();
  
  // Shipping: Free over $100, else $15
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15;
  
  // Tax: 19% IVA
  const tax = subtotal * 0.19;
  
  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "DESC10") {
      setDiscount(subtotal * 0.10);
      setCouponApplied(true);
      setCouponError("");
    } else if (couponCode.toUpperCase() === "REACT20") {
      setDiscount(subtotal * 0.20);
      setCouponApplied(true);
      setCouponError("");
    } else {
      setDiscount(0);
      setCouponApplied(false);
      setCouponError("Cupón inválido");
    }
  };

  const total = subtotal + shipping + tax - discount;

  if (items.length === 0) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-16 min-h-[60vh] flex items-center justify-center">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center w-full">
          <div className="text-6xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Tu carrito está vacío</h2>
          <p className="text-gray-500 mb-8 text-lg">
            Aún no has agregado ningún producto. ¡Descubre nuestras ofertas!
          </p>
          <Link
            to="/gallery"
            className="inline-flex px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Ir a la galería
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-8">
        Tu Carrito de Compras
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col gap-1 p-2">
          {items.map(({ product, quantity }) => {
            const resolvedImage = imageMap[product.image] ?? product.image;
            const itemSubtotal = Number(product.price) * Number(quantity);
            return (
              <article key={product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-center bg-white rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <img
                  src={resolvedImage}
                  alt={product.title}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-contain rounded-xl bg-white p-2 border border-gray-100 shadow-sm"
                />
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">{product.title}</h3>
                  <p className="text-gray-500 font-medium">${Number(product.price).toFixed(2)} c/u</p>
                  <p className="text-lg font-bold text-purple-600 mt-2">
                    ${itemSubtotal.toFixed(2)}
                  </p>
                </div>
                
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() => decrementItem(product.id)}
                      className="w-10 h-10 rounded-lg bg-white shadow-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors font-bold text-xl"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-bold text-gray-800">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => incrementItem(product.id)}
                      className="w-10 h-10 rounded-lg bg-white shadow-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors font-bold text-xl"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(product.id)}
                    className="text-sm font-semibold text-red-500 hover:text-red-700 hover:underline transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <aside className="h-fit flex flex-col gap-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Resumen del pedido</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Subtotal ({items.length} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Envío</span>
                {shipping === 0 ? (
                  <span className="text-green-500 font-bold">Gratis</span>
                ) : (
                  <span>${shipping.toFixed(2)}</span>
                )}
              </div>
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Impuestos (19%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-green-500 font-bold bg-green-50 p-3 rounded-lg">
                  <span>Descuento aplicado</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 pt-6 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-lg font-bold text-gray-900">Total a pagar</span>
                <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full flex justify-center py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-lg hover:shadow-lg hover:opacity-90 hover:-translate-y-1 transition-all duration-300"
            >
              Proceder al pago
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <h4 className="font-bold text-gray-900 mb-4 text-lg">¿Tienes un cupón?</h4>
            <p className="text-sm text-gray-500 mb-4">Usa DESC10 o REACT20</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Código"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 uppercase"
              />
              <button
                onClick={handleApplyCoupon}
                className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
              >
                Aplicar
              </button>
            </div>
            {couponError && <p className="text-red-500 text-sm mt-3 font-medium">{couponError}</p>}
            {couponApplied && <p className="text-green-500 text-sm mt-3 font-medium">¡Cupón aplicado exitosamente!</p>}
          </div>
        </aside>
      </div>
    </section>
  );
}
