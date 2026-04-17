import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export default class FeaturedProducts extends LitElement {
  @property({ type: Object })
  config?: Record<string, any>;

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
    return html`
      <div class="featured-products">
        <h3 class="featured-products-title">${this.config?.title || 'Featured Products'}</h3>
        <div class="featured-products-content">
          ${this.config?.content || 'This is a new Featured Products component'}
        </div>
      </div>
    `;
  }
}
