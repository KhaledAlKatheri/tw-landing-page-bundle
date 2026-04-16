import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { titleSectionStyles } from "./styles";
import { AnimatedTitlesType, TextAlignmentType } from "./types";

export default class TitleSection extends LitElement {
  @property({ type: Object })
  config?: {
    enable_animated_titles: boolean;
    sub_title: string;
    title: string;
    description: string;
    animete_titles: AnimatedTitlesType[];
    text_alignment: TextAlignmentType[];
  };
  private isRtl: boolean = false;
  private animationTimeout?: number;

  connectedCallback() {
    super.connectedCallback();
    
    this.isRtl = Salla.config.get('theme.is_rtl', true);
  }

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

  static styles = [titleSectionStyles];

  render() {
    const textAlign = this.config?.text_alignment[0].value
    const textAlignClass = {
      'text-right': textAlign === 'right' && this.isRtl,
      'text-left': textAlign === 'right' && this.isRtl === false,
      'text-center': textAlign === 'center',
      'justify-start': textAlign === 'right' && this.isRtl,
      'justify-center': textAlign === 'center',
      'items-start': textAlign === 'right' && this.isRtl,
      'items-center': textAlign === 'center',
    } 

    return html`
    <div class="container">
      <div class="title-section ${classMap(textAlignClass)}">
        <div class="title-section-content ${classMap(textAlignClass)}">
          ${this.config?.sub_title && html`
            <span class="title-section-sub-title items-center ${textAlign === 'right' && this.isRtl ? 'justify-start text-right' : textAlign === 'center' ? 'justify-center' : 'text-left'}">
              <span class="ping-dot">
                <span class="ping-dot-wave"></span>
                <span class="ping-dot-core"></span>
              </span>
              ${this.config?.sub_title}
            </span>
          `}
          ${this.config?.enable_animated_titles ? html`
            <p class="animate-text">
              ${this.config?.animete_titles?.map((item: AnimatedTitlesType) => html`
                <span class="animate-title">${item.animate_title}</span>
              `)}
            </p>
          ` : html`<h3 class="title-section-title ${classMap(textAlignClass)}">${this.config?.title || 'Title Section'}</h3>`
          }
          ${this.config?.description && html`
            <p class="title-section-description ${classMap(textAlignClass)}">
              ${this.config?.description}
            </p>
          `}
        </div>
      </div>
    </div>
    `;
  }
}
