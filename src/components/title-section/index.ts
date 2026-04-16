import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

interface AnimatedTitles {
  animate_title: string;
}

export default class TitleSection extends LitElement {
  @property({ type: Object })
  config?: {
    enable_animated_titles: boolean;
    sub_title: string;
    title: string;
    description: string;
    animated_titles: AnimatedTitles[]
  };

  private animationTimeout?: number;

  firstUpdated() {
    if (this.config?.enable_animated_titles) {
      this._setupAnimation();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
  }

  private _setupAnimation() {
    const container = this.renderRoot.querySelector(".animate-text");
    if (!container) return;

    const titles = Array.from(container.children) as HTMLElement[];
    const txtsLen = titles.length;
    if (txtsLen === 0) return;

    let index = 0;
    const textInTimer = 2500;

    titles.forEach((title) => title.classList.remove("text-in", "text-out"));
    titles[0].classList.add("text-in");

    const animateText = () => {
      titles[index].classList.remove("text-in");
      titles[index].classList.add("text-out");

      index = (index + 1) % txtsLen;

      titles[index].classList.remove("text-out");
      titles[index].classList.add("text-in");

      this.animationTimeout = window.setTimeout(animateText, textInTimer);
    };

    this.animationTimeout = window.setTimeout(animateText, textInTimer);
  }

  static styles = css`
    :host {
      display: block;
    }

    .animate-text {
      height: 50px;
      overflow: hidden;
    }

    .animate-text .animate-title {
      font-size: 24px;
      color: #000;
      line-height: normal;
      display: none;
      font-weight: 800;
    }

    @media (min-width: 1024px) {
      .animate-text .animate-title {
        font-size: 30px;
      }
    }

    .animate-text .animate-title.text-in{
      display: block;
      animation: textIn .5s ease;
    }

    .animate-text .animate-title.text-out{
      animation: textOut 1s ease;
    }

    @keyframes textIn{
      0%{
        transform: translateY(100%);
      }
      100%{
        transform: translateY(0%);
      }
    }
    @keyframes textOut{
      0%{
        transform: translateY(0%);
      }
      100%{
        transform: translateY(-100%);

      }
    }
    .container {
      max-width: 1345px;
      width: 100%;
      margin-right: auto;
      margin-left: auto;
      padding-right: 10px;
      padding-left: 10px;
    }

    .title-section {
      display: flex;
      justify-content: center;
    }

    .title-section-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.375rem;
    }

    @media (min-width: 1024px) {
      .title-section-content {
        gap: 0.5rem;
      }
    }

    .title-section-sub-title {
      font-size: 0.875rem;
      line-height: 1.25rem;
      font-weight: 700;
      line-height: 1.5;
      text-align: center
    }

    .title-section-title {
      font-size: 1.875rem;
      line-height: 2.25rem;
      font-weight: 800;
      line-height: 1.5;
      margin: 0px 0px;
      text-align: center
    }

    .title-section-description {
      font-size: 1rem;
      line-height: 1.5rem;
      font-weight: 400;
      line-height: 1.5;
      opacity: 0.65;
      margin: 0px 0px;
      text-align: center
    }
  `;

  render() {
    return html`
    <div class="container">
      <div class="title-section">
        <div class="title-section-content">
          <span class="title-section-sub-title">${this.config?.sub_title || 'Sub Title'}</span>
              ${this.config?.animated_titles?.map((item: AnimatedTitles) => html`
                <span class="">${item.animate_title}</span>
              `)}
          ${this.config?.enable_animated_titles ? html`
            <p class="animate-text">
              ${this.config?.animated_titles?.map((item: AnimatedTitles) => html`
                <span class="animate-title">${item.animate_title}</span>
              `)}
            </p>
          ` : html`<h3 class="title-section-title">${this.config?.title || 'Title Section'}</h3>`
          }
          
          <p class="title-section-description">
            ${this.config?.description || 'This is a new Title Section component'}
          </p>
        </div>
      </div>
    </div>
    `;
  }
}
