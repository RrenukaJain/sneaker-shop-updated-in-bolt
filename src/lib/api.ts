import { supabase } from './supabase';
import { Database } from '../types/supabase';

export type Product = Database['public']['Tables']['products']['Row'];
export type CartItem = Database['public']['Tables']['cart']['Row'] & {
  product: Product;
};

export const api = {
  async addToCart(productId: string, quantity: number = 1) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User must be logged in');

    const { data, error } = await supabase
      .from('cart')
      .upsert({
        user_id: user.id,
        product_id: productId,
        quantity
      }, {
        onConflict: 'user_id,product_id'
      })
      .select('*, product:products(*)');

    if (error) throw error;
    return data?.[0] as CartItem;
  },

  async getCart() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User must be logged in');

    const { data, error } = await supabase
      .from('cart')
      .select('*, product:products(*)')
      .eq('user_id', user.id);

    if (error) throw error;
    return data as CartItem[];
  },

  async removeFromCart(productId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User must be logged in');

    const { error } = await supabase
      .from('cart')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId);

    if (error) throw error;
  },

  async updateCartQuantity(productId: string, quantity: number) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User must be logged in');

    const { data, error } = await supabase
      .from('cart')
      .update({ quantity })
      .eq('user_id', user.id)
      .eq('product_id', productId)
      .select('*, product:products(*)');

    if (error) throw error;
    return data?.[0] as CartItem;
  },

  async createOrder(items: CartItem[]) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User must be logged in');

    const total_amount = items.reduce((sum, item) => 
      sum + (item.quantity * item.product.price), 0
    );

    // Start a transaction
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        total_amount,
        status: 'pending'
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.product.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // Clear the cart
    const { error: clearCartError } = await supabase
      .from('cart')
      .delete()
      .eq('user_id', user.id);

    if (clearCartError) throw clearCartError;

    return order;
  }
};