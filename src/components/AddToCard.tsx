import { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
const product = {
  id: 1,
  name: 'Vincofy 7 in 1 SalonPro Hair Styler',
  color: 'Purple',
  price: 9.99,
  image: '/src/assets/products/1.webp',
};

interface CartItem {
  id: number;
  name: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

const AddToCard = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = () => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === product.id);

    if (existingItemIndex >= 0) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
    }
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <>
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <div className="flex gap-2">
          <SheetTrigger asChild>
            <Button className="w-full text-lg text-white" size="lg" onClick={addToCart}>
              Add to Cart
            </Button>
          </SheetTrigger>
        </div>

        {/* Фиксированная иконка корзины */}
        <div className="fixed bottom-5 right-5 z-50">
          <SheetTrigger asChild>
            <button className="bg-primary cursor-pointer text-white p-3 rounded-full shadow-lg flex items-center justify-center relative transition-all" aria-label="Open cart">
              <ShoppingCart size={24} />
              {totalItems > 0 && <span className="absolute -top-2 -right-2 bg-destructive text-white text-xs font-bold rounded-full size-6 flex items-center justify-center">{totalItems}</span>}
            </button>
          </SheetTrigger>
        </div>
        <SheetContent className="overflow-y-auto">
          <SheetHeader className="border-b border-muted pb-4">
            <SheetTitle className="text-2xl font-bold">Cart</SheetTitle>
            <SheetDescription>{cartItems.length === 0 ? 'There are no items in your cart' : `${totalItems} ${totalItems === 1 ? 'item' : 'items'} in your cart`}</SheetDescription>
          </SheetHeader>

          {cartItems.length > 0 && (
            <div className="px-5 pb-5 flex flex-col gap-5 h-full">
              <div className="bg-muted/50 p-3 rounded-md">
                <div className="flex items-baseline gap-2">
                  <div className="flex-shrink-0 size-2 rounded-full bg-destructive"></div>
                  <p className="text-primary leading-4 font-medium">Note: For this clearance sale we limit orders to 2 products per person.</p>
                </div>
              </div>

              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold leading-4.5 mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.color}</p>
                    <p className="font-semibold mt-1">£{item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col items-center gap-3 mt-2">
                    <div className="flex items-center border border-input rounded-md">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 text-muted-foreground hover:bg-muted">
                        -
                      </button>
                      <span className="w-8 mx-auto text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-muted-foreground hover:bg-muted">
                        +
                      </button>
                    </div>

                    <button onClick={() => removeItem(item.id)} className="text-sm text-muted-foreground hover:text-destructive">
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="border-t border-muted mt-auto">
                {totalItems > 1 && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
                    <p className="text-center text-destructive font-medium">You can only checkout with 1 product.</p>
                    <div className="mt-2 h-1 bg-destructive/20 rounded-full overflow-hidden">
                      <div className="h-full bg-destructive w-full"></div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mb-2 mt-5">
                  <span>Subtotal</span>
                  <span>£{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t border-muted pt-2 pb-5">
                  <span>Total</span>
                  <span>£{totalPrice.toFixed(2)}</span>
                </div>

                <Button className="w-full text-lg text-white" size="lg" disabled={totalItems > 1}>
                  Buy Now
                </Button>
              </div>
            </div>
          )}

          {cartItems.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <SheetClose asChild>
                <Button className="text-white">Continue Shopping</Button>
              </SheetClose>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AddToCard;
