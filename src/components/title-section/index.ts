import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from 'lit/directives/style-map.js';
import { titleSectionStyles } from "./styles";
import { AnimatedTitlesType, TextAlignmentType } from "./types";

export default class TitleSection extends LitElement {
  @property({ type: Object })
  config?: {
    enable_animated_titles: boolean;
    enable_animated_gradient_title: boolean;
    sub_title: string;
    title: string;
    description: string;
    animete_titles: AnimatedTitlesType[];
    text_alignment: TextAlignmentType[];

    subtitle_color: string;
    text_color: string;
    gradient_color_one: string;
    gradient_color_two: string;
    gradient_color_three: string;
    gradient_color_four: string;
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
    const textAlign = this.config?.text_alignment[0]?.value
    const textAlignClass = {
      'text-right': textAlign === 'right' && this.isRtl,
      'text-left': textAlign === 'right' && this.isRtl === false,
      'text-center': textAlign === 'center',
      'justify-start': textAlign === 'right' && this.isRtl,
      'justify-center': textAlign === 'center',
      'items-start': textAlign === 'right' && this.isRtl,
      'items-center': textAlign === 'center',
    }

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

    return html`
      <section style="margin-top: 3rem; margin-bottom: 3rem;">
        <div class="container">
          <div class="title-section ${classMap(textAlignClass)}">
            <div class="title-section-content ${classMap(textAlignClass)}">
              ${this.config?.sub_title && html`
                <span class="title-section-sub-title items-center ${textAlign === 'right' && this.isRtl ? 'justify-start text-right' : textAlign === 'center' ? 'justify-center' : 'text-left'}">
                  <span class="ping-dot">
                    <span style="background-color: ${this.config?.subtitle_color || '#000'};" class="ping-dot-wave"></span>
                    <span style="background-color: ${this.config?.subtitle_color || '#000'};" class="ping-dot-core"></span>
                  </span>
                  <span style="color: ${this.config?.subtitle_color || '#000'};">
                    ${this.config?.sub_title}
                  </span>
                </span>
              `}
              ${this.config?.enable_animated_titles ? html`
                <p class="animate-text">
                  ${this.config?.animete_titles?.map((item: AnimatedTitlesType) => html`
                    <span class="animate-title" style="color: ${this.config?.text_color || '#000'}">${item.animate_title}</span>
                  `)}
                </p>
              ` : html`<h3 class="title-section-title ${classMap(textAlignClass)}" style=${styleMap(isGradientTitle ? textGradientStyle : {color: this.config?.text_color || '#000'})}>${this.config?.title || 'Title Section'}</h3>`
              }
              ${this.config?.description && html`
                <p class="title-section-description ${classMap(textAlignClass)}" style="color: ${this.config?.text_color || '#000'}">
                  ${this.config?.description}
                </p>
              `}
            </div>
          </div>
        </div>
      </section>
    `;
  }
}