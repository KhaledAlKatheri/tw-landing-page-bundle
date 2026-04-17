import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { styleMap } from 'lit/directives/style-map.js';

interface StatsType {
  stat_title: string;
  stat_description: string;
}

export default class Statistics extends LitElement {
  @property({ type: Object })
  config?: {
    enable_animated_gradient_title: boolean;
    text_color?: string;
    stats_card_border_radius: number;
    stats: StatsType[];
    gradient_color_one?: string;
    gradient_color_two?: string;
    gradient_color_three?: string;
    gradient_color_four?: string;
  };

  static styles = css`
    :host {
      display: block;
    }

    .container {
      max-width: 1345px;
      width: 100%;
      margin-right: auto;
      margin-left: auto;
      padding-right: 10px;
      padding-left: 10px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    .stat-card {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        border: 1px solid rgba(0, 0, 0, 0.05);
        border-radius: var(--stats-card-border-radius); /* بدّلها حسب قيمة global-border-radius */
    }

    .stat-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .stat-title {
        display: flex;
        font-size: 30px;
        font-weight: 800;
        line-height: normal;
        text-align: center;
        margin: 0;
    }

    .stat-title.gradient {
        background: linear-gradient(90deg, #000, #666);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .stat-description {
        font-size: 14px;
        font-weight: 500;
        line-height: normal;
        text-align: center;
        opacity: 0.65;
        margin: 0;
    }

    @keyframes move-gradient {
      0% {
          background-position: 0% 50%;
      }
      50% {
          background-position: 100% 50%;
      }
      100% {
          background-position: 0% 50%;
      }
    }

    @media (min-width: 1024px) {
        .stats-grid {
            grid-template-columns: repeat(var(--stats-count, 4), 1fr);
            gap: 20px;
        }

        .stat-card {
            padding: 32px;
        }

        .stat-title {
            font-size: 36px;
            line-height: normal;
        }

        .stat-description {
            font-size: 16px;
            line-height: normal;
        }
    }
  `;

  render() {
    const isGradientTitle = this.config?.enable_animated_gradient_title;
    const gradientTitleColor = `linear-gradient(139.49deg, ${this.config?.gradient_color_one || "#000"} 9.62%, ${this.config?.gradient_color_two || "#000"} 39.56%, ${this.config?.gradient_color_three || "#000"} 60.52%, ${this.config?.gradient_color_four || "#000"} 84.47%, ${this.config?.gradient_color_one || "#000"})`

    const textGradientStyle = {
        'background': gradientTitleColor,
        'background-size': '400% 400%', 
        'animation': 'move-gradient 10s ease infinite', 
        '-webkit-text-fill-color': 'transparent', 
        '-webkit-background-clip': 'text', 
        'background-clip': 'text',
        'text-fill-color': 'transparent',
    }

    const gridColumns = { '--stats-count': this.config?.stats.length || 4 };
    const statsCardBorderRadius = { '--stats-card-border-radius': this.config?.stats_card_border_radius + 'px' || 24 + 'px' };

    return html`
      <div class="statistics" style="${styleMap(gridColumns)}">
        <div class="container">
          <div class="stats-grid">
            ${this.config?.stats.map((stat) => html`
              <div class="stat-card" style="${styleMap(statsCardBorderRadius)}">
                <div class="stat-content">
                  <p class="stat-title" style=${styleMap(isGradientTitle ? textGradientStyle : {color: this.config?.text_color || '#000'})}>${stat.stat_title}</p>
                  <p class="stat-description" style="color: ${this.config?.text_color || '#000'}">${stat.stat_description}</p>
                </div>
              </div>
            `)}
          </div>
        </div>
      </div>
    `;
  }
}
