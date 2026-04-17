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

    .featured-products-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }
    @media (min-width: 1345px) {
      .container {
          max-width: 1345px;
      }
    }

    .container {
      width: 100%;
      margin-right: auto;
      margin-left: auto;
      padding-right: 10px;
      padding-left: 10px;
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

  private async handleAddToCart(id: number) {
    const getProductName = this.productInfo?.find((product: Product) => product.id === id)?.name;
    (window as any).Salla.log("Adding to cart:", {product: this.productInfo});

    // Show a simple notification
    (window as any).Salla.success(`Added ${getProductName} to cart!`);
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
        <div class="container">
          <div class="featured-products-grid">
            ${this.productInfo.map((product: Product) => {
              const customSetting = this.config?.products_collection?.find(item => {
                const settingId = Array.isArray(item.product) ? item.product[0]?.value : item.product;
                return Number(settingId) === product.id;
              });

              const productImageCustom = customSetting?.product_image;

              return html`
                <div class="product-card">
                  <img src="${productImageCustom || product.image?.url}" alt="${productImageCustom ? product?.name : product.image?.alt}" />
                  <h3 class="product-name">${product?.name}</h3>
                  <p class="product-price">${(window as any).Salla.money(product?.price)}</p>
                  <button class="add-to-cart" @click="${() => this.handleAddToCart(product?.id)}">
                    ${ (window as any).Salla.lang.get('pages.cart.add_to_cart')}
                  </button>
                </div>
              `
            })}
          </div>
        </div>
      </div>
    `;
  }
}
