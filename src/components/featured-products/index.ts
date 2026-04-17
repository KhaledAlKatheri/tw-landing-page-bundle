import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { Product } from "./types";
type ProductCardLayoutValue = 'portrait' | 'landscape';

interface ProductCardLayout {
  label: string;
  value:  ProductCardLayoutValue;
  key: string;
}

interface ProductsItemType {
  product: Product;
  product_image: string;
  product_name_color: string;
  product_subtitle_color: string;
  product_badge_text_color: string;
  product_badge_background_color: string;
  product_price_color: string;
  product_discount_price_color: string;
  add_to_cart_button_text_color: string;
  add_to_cart_button_background_color: string;
}

export default class FeaturedProducts extends LitElement {
  @property({ type: Object })
  config?: {
    product_card_layout: ProductCardLayout[];
    product_card_border_radius: number;
    products: ProductsItemType[]
  };

  static styles = css`
    :host {
      display: block;
    }
    .featured-products {
      padding: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .featured-products-title {
      font-weight: 500;
      color: #2c3e50;
      margin: 0 0 1rem;
    }
    .featured-products-content {
      color: #666;
    }
  `;

  render() {
    console.log(this.config?.products);
    
    return html`
      <div class="featured-products">
        ${this.config?.products?.map((product) => html`
          <div class="product-card">
            <img
              class="product-image"
              src="${product.product.image?.url || "image product"}"
              alt="${product.product.image?.alt || "alt product"}"
            />
            <h3 class="text-red-500">${product.product.name}</h3>
            <div>
              <span class="text-red-500">${(window as any).Salla.money(product.product.price)}</span>
              ${product.product.discount
                ? html`<span class="discount">${(window as any).Salla.money(product.product.discount)}</span>`
                : ""}
            </div>
            <button class="add-to-cart">
              ${ (window as any).Salla.lang.get('pages.cart.add_to_cart')}
            </button>
          </div>
        `)}
      </div>
    `;
  }
}
