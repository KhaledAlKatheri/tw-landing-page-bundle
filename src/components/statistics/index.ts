import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export default class Statistics extends LitElement {
  @property({ type: Object })
  config?: Record<string, any>;

  static styles = css`
    :host {
      display: block;
    }
    .statistics {
      padding: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .statistics-title {
      font-weight: 500;
      color: #2c3e50;
      margin: 0 0 1rem;
    }
    .statistics-content {
      color: #666;
    }
  `;

  render() {
    return html`
      <div class="statistics">
        <h3 class="statistics-title">${this.config?.title || 'Statistics'}</h3>
        <div class="statistics-content">
          ${this.config?.content || 'This is a new Statistics component'}
        </div>
      </div>
    `;
  }
}
