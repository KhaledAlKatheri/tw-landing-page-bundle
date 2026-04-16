import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export default class TitleSection extends LitElement {
  @property({ type: Object })
  config?: Record<string, any>;

  static styles = css`
    :host {
      display: block;
    }
    .title-section {
      padding: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .title-section-title {
      font-weight: 500;
      color: #2c3e50;
      margin: 0 0 1rem;
    }
    .title-section-content {
      color: #666;
    }
  `;

  render() {
    return html`
      <div class="title-section">
        <h3 class="title-section-title">${this.config?.title || 'Title Section'}</h3>
        <div class="title-section-content">
          ${this.config?.content || 'This is a new Title Section component'}
        </div>
      </div>
    `;
  }
}
