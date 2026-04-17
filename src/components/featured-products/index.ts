import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Product } from "./types";
type ProductCardLayoutValue = 'portrait' | 'landscape';

interface ProductCardLayout {
  label: string;
  value: ProductCardLayoutValue;
  key: string;
}

interface productChoiseType {
  label: string;
  value: string;
  key: string;
}

interface ProductsItemType {
  product: productChoiseType[];
  product_image: string;
}

export default class FeaturedProducts extends LitElement {
  @property({ type: Object })
  config?: {
    product_card_layout: ProductCardLayout[];
    product_card_border_radius: number;
    products_collection: ProductsItemType[];
    product_name_color: string;
    product_subtitle_color: string;
    product_badge_text_color: string;
    product_badge_background_color: string;
    product_price_color: string;
    product_discount_price_color: string;
    add_to_cart_button_text_color: string;
    add_to_cart_button_background_color: string;
  };

  @property({ type: Array }) productInfo?: Product[];

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

  async connectedCallback() {
    super.connectedCallback();
    
    const productsCollection = this.config?.products_collection;
    
    const productIDs = productsCollection
      ?.map((item) => (Array.isArray(item.product) ? item.product[0]?.value : item.product))
      .filter(id => !!id); 

    if (!productIDs || productIDs.length === 0) {
      console.warn('No product IDs found in configuration.');
      return;
    }

    const queryParams = {
      source: 'selected',
      source_value: productIDs
    };

    await (window as any).Salla.onReady();

    try {
      const response = await (window as any).Salla.product.fetch(queryParams);
      
      this.productInfo = Array.isArray(response.data) ? response.data : [response.data];

      console.log('تم تخزين جميع المنتجات في productInfo:', this.productInfo);
      
      this.requestUpdate();
    } catch (error) {
      console.error('فشل جلب المنتجات:', error);
    }
  }

  render() {
    if (!this.config) {
      return html`<div>Loading...</div>`;
    }

    if(!this.productInfo) {
      return html`<div>Loading...</div>`;
    }

    return html`
      <div class="featured-products">
        ${this.config.products_collection.map((item) => {
          return html`
            <div></div>
          `;
        })}
      </div>
    `;
  }
}
