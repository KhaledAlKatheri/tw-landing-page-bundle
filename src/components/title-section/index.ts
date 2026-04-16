import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

interface AnimatedTitlesType {
  animate_title: string;
}

type TextAlignmentValueType = "right" | "center";

interface TextAlignmentType {
  label: string;
  value: TextAlignmentValueType;
  key: string;
}

export default class TitleSection extends LitElement {
  @property({ type: Object })
  config?: {
    enable_animated_titles: boolean;
    sub_title: string;
    title: string;
    description: string;
    animete_titles: AnimatedTitlesType[]
    text_alignment: TextAlignmentType;
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

    p {
      margin: 0px;
    }

    span {
      margin: 0px;
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
      align-items: center;
      width: 100%;
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
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      font-weight: 700;
      line-height: 1.5;
      text-align: center
    }

    @media (min-width: 380px) and (max-width: 479px) {
      .title-section-sub-title {
          font-size: 0.75rem;
          line-height: 1rem;
      }
    }

    .title-section-title {
      font-size: 1.875rem;
      line-height: 2.25rem;
      font-weight: 800;
      line-height: 1.5;
      margin: 0px 0px;
      text-align: center
    }

    @media (min-width: 380px) and (max-width: 479px) {
      .title-section-title {
          font-size: 1.5rem;
          line-height: 2rem;
      }
    }

    .title-section-description {
      font-size: 1rem;
      line-height: 1.5rem;
      font-weight: 400;
      line-height: 1.5;
      opacity: 0.65;
      margin: 0px;
      max-width: 28rem;
      text-align: center
    }

    @media (min-width: 380px) and (max-width: 479px) {
      .title-section-description {
          font-size: 0.875rem;
          line-height: 1.25rem;
      }
    }

    .ping-dot {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 0.5rem;
      height: 0.5rem;
    }

    .ping-dot-wave {
      position: absolute;
      display: inline-flex;
      width: 100%;
      height: 100%;
      border-radius: 9999px;
      background-color: #38bdf8;
      opacity: 0.75;
      animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
    }

    .ping-dot-core {
      position: relative;
      display: inline-flex;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 9999px;
      background-color: #0ea5e9;
    }

    @keyframes ping {
      75%,
      100% {
        transform: scale(2);
        opacity: 0;
      }
    }

  `;

  render() {
    return html`
    <div class="container">
      ${this.config?.text_alignment.value}
      <div class="title-section">
        <div class="title-section-content">
          <span class="title-section-sub-title">
            <span class="ping-dot">
              <span class="ping-dot-wave"></span>
              <span class="ping-dot-core"></span>
            </span>
            ${this.config?.sub_title || 'Sub Title'}
          </span>
          ${this.config?.enable_animated_titles ? html`
            <p class="animate-text">
              ${this.config?.animete_titles?.map((item: AnimatedTitles) => html`
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
