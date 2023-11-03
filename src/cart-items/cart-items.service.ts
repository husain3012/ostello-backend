import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  async create(createCart: CreateCartDto): Promise<CartItem> {
    const cartId = v4();
    const newCartItem = this.cartItemRepository.create({
      ...createCart,
      cartId,
    });
    await this.cartItemRepository.save(newCartItem);
    return newCartItem;
  }

  async addItem(cartItem: CreateCartItemDto): Promise<CartItem> {
    const { cartId, productId, quantity } = cartItem;

    const existingCartItem = await this.cartItemRepository.findOne({
      where: { cartId, product: { id: productId } },
    });

    if (existingCartItem) {
      // If it exists, update the quantity
      existingCartItem.quantity += quantity;
      return this.cartItemRepository.save(existingCartItem);
    } else {
      // If it doesn't exist, create a new cart item
      const newCartItem = this.cartItemRepository.create(cartItem);
      return this.cartItemRepository.save(newCartItem);
    }
  }

  async updateQuantity(
    id: number,
    updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.findOne({ where: { id } });
    if (!cartItem) {
      throw new NotFoundException(`CartItem with ID #${id} not found`);
    }
    this.cartItemRepository.merge(cartItem, updateCartItemDto);
    return this.cartItemRepository.save(cartItem);
  }

  async removeItem(id: number): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.findOne({ where: { id } });
    if (!cartItem) {
      throw new NotFoundException(`CartItem with ID #${id} not found`);
    }
    return this.cartItemRepository.remove(cartItem);
  }

  async getCartWithProductDetails(cartId: string): Promise<CartItem[]> {
    const cartItems = await this.cartItemRepository.find({
      where: { cartId },
      relations: ['product'],
    });
    return cartItems;
  }
}
