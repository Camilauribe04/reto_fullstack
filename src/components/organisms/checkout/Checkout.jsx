import { useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../../../store/cartStore";

export default function Checkout() {
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: ""
  });

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15;
  const tax = subtotal * 0.19;
  const total = subtotal + shipping + tax; // Not including coupon here as it's simulated, but total is calculated for display

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    clearCart();
    setSuccess(true);
  };

  if (success) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-20 min-h-[60vh] flex items-center justify-center">
        <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center shadow-lg w-full">
          <div className="text-7xl mb-6">✨</div>
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 mb-4">
            ¡Compra Confirmada!
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Tu pedido ha sido procesado exitosamente en nuestra simulación. ¡Gracias por preferirnos!
          </p>
          <Link
            to="/gallery"
            className="inline-flex px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Seguir comprando
          </Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-20 min-h-[60vh] flex items-center justify-center">
        <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center shadow-sm w-full">
          <div className="text-6xl mb-6">🛍️</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nada por aquí...
          </h2>
          <p className="text-gray-500 mb-8 text-lg">Debes agregar productos a tu carrito antes de poder realizar el pago.</p>
          <Link
            to="/gallery"
            className="inline-flex px-8 py-4 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition-colors"
          >
            Explorar catálogo
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-gray-50 min-h-screen">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-2">
          Finalizar Compra
        </h2>
        <p className="text-gray-600 text-lg">Estás a un paso de obtener tus productos increíbles</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-100 shadow-sm rounded-3xl p-8 lg:p-10"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Información de Envío</h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre completo</label>
              <input
                required
                type="text"
                name="fullName"
                placeholder="Ej: Jane Doe"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow bg-gray-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Correo Electrónico</label>
              <input
                required
                type="email"
                name="email"
                placeholder="ejemplo@correo.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow bg-gray-50 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Dirección de Entrega</label>
                <input
                  required
                  type="text"
                  name="address"
                  placeholder="Calle Principal 123"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow bg-gray-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ciudad</label>
                <input
                  required
                  type="text"
                  name="city"
                  placeholder="Tu Ciudad"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow bg-gray-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Código Postal</label>
                <input
                  required
                  type="text"
                  name="zipCode"
                  placeholder="12345"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow bg-gray-50 focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 bg-purple-50 p-6 rounded-2xl border border-purple-100 flex gap-4 items-start">
            <span className="text-2xl">💳</span>
            <div>
              <h4 className="font-bold text-purple-900 mb-1">Pago Simulado</h4>
              <p className="text-sm text-purple-700">No se te cobrará nada. Haz clic en confirmar para simular el proceso de compra.</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-8 px-6 py-4 rounded-xl bg-gray-900 text-white font-bold text-lg hover:bg-black hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Confirmar y Pagar
          </button>
        </form>

        <aside className="h-fit">
          <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Tu Pedido</h3>

            <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                    <img src={product.image} alt={product.title} className="w-12 h-12 object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate">{product.title}</h4>
                    <p className="text-sm text-gray-500">Cant: {quantity}</p>
                  </div>
                  <div className="font-bold text-gray-900">
                    ${(Number(product.price) * Number(quantity)).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-100 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span className="font-medium">{shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Impuestos</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 flex justify-between items-end">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-3xl font-extrabold text-purple-600">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
