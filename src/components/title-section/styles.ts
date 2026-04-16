import { css } from "lit";

export const titleSectionStyles = css`
    :host {
      display: block;
    }

    p {
      margin: 0px;
    }

    span {
      margin: 0px;
    }

    .justify-center {
      justify-content: center;
    }

    .justify-start {
      justify-content: start;
    }

    .justify-end {
      justify-content: end;
    }

    .items-center {
      align-items: center;
    }

    .items-start {
      align-items: start;
    }

    .text-right {
      text-align: right;
    }

    .text-center {
      text-align: center;
    }

    .text-left {
      text-align: left;
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
      align-items: center;
      width: 100%;
    }

    .title-section-content {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    }

    @media (min-width: 1024px) {
      .title-section-content {
        gap: 0.5rem;
      }
    }

    .title-section-sub-title {
      display: flex;
      gap: 0.5rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      font-weight: 700;
      line-height: 1.5;
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