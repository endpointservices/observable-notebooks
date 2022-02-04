// https://observablehq.com/@observablehq/logo@388
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["Screen Shot 2021-07-13 at 1.45.14 PM.png",new URL("./files/f328d3956498a7abe446eebc2ae77d054354219fedd6d24ff4ce4a99aed8c5b49ca2d38d7aa4bcd36a0a2ead200ffd6f1a983e3758bb3a9a7b13b8861026e3fd",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["FileAttachment","md"], async function(FileAttachment,md){return(
md`# Logo and wordmark

<img src="${await FileAttachment("Screen Shot 2021-07-13 at 1.45.14 PM.png").url()}" style="width: 140px; float: right;" />

For PNG versions, use the cell menus in the left margins and choose “Download PNG.”`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Logo`
)});
  main.variable(observer("viewof logoWidth")).define("viewof logoWidth", ["Inputs"], function(Inputs){return(
Inputs.range([1, 2000], { value: 200, step: 1, label: "Image width" })
)});
  main.variable(observer("logoWidth")).define("logoWidth", ["Generators", "viewof logoWidth"], (G, _) => G.input(_));
  main.variable(observer("viewof logoPadding")).define("viewof logoPadding", ["Inputs"], function(Inputs){return(
Inputs.range([0, 49], { value: 0, step: 1, label: "Padding %" })
)});
  main.variable(observer("logoPadding")).define("logoPadding", ["Generators", "viewof logoPadding"], (G, _) => G.input(_));
  main.variable(observer("viewof logoHeight")).define("viewof logoHeight", ["Inputs"], function(Inputs){return(
Inputs.range([1, 2000], { value: 200, step: 1, label: "Image height" })
)});
  main.variable(observer("logoHeight")).define("logoHeight", ["Generators", "viewof logoHeight"], (G, _) => G.input(_));
  main.variable(observer("viewof logoMaintainRatio")).define("viewof logoMaintainRatio", ["Inputs"], function(Inputs){return(
Inputs.toggle({label: "Auto height", value: true})
)});
  main.variable(observer("logoMaintainRatio")).define("logoMaintainRatio", ["Generators", "viewof logoMaintainRatio"], (G, _) => G.input(_));
  main.variable(observer("logo")).define("logo", ["html","logoSvgWidth","logoSvgHeight","backgroundColorFinal","graphicColor","logoNativeX","logoNativeY","logoGraphicWidth","logoGraphicHeight","logoGraphicX","logoGraphicY"], function(html,logoSvgWidth,logoSvgHeight,backgroundColorFinal,graphicColor,logoNativeX,logoNativeY,logoGraphicWidth,logoGraphicHeight,logoGraphicX,logoGraphicY){return(
html`
<svg width="${logoSvgWidth}" height="${logoSvgHeight}" style="background-color:${backgroundColorFinal}" fill="${graphicColor}">
    <svg viewBox="0 0 ${logoNativeX}, ${logoNativeY}" width="${logoGraphicWidth}" height="${logoGraphicHeight}" x="${logoGraphicX}" y="${logoGraphicY}">
      <path d="M10.9646 18.9046C9.95224 18.9046 9.07507 18.6853 8.33313 18.2467C7.59386 17.8098 7.0028 17.1909 6.62722 16.4604C6.22789 15.7003 5.93558 14.8965 5.75735 14.0684C5.56825 13.1704 5.47613 12.2574 5.48232 11.3427C5.48232 10.6185 5.52984 9.92616 5.62578 9.26408C5.7208 8.60284 5.89715 7.93067 6.15391 7.24843C6.41066 6.56618 6.74143 5.97468 7.14438 5.47308C7.56389 4.9592 8.1063 4.54092 8.72969 4.25059C9.38391 3.93719 10.1277 3.78091 10.9646 3.78091C11.977 3.78091 12.8542 4.00021 13.5962 4.43879C14.3354 4.87564 14.9265 5.49454 15.3021 6.22506C15.6986 6.97704 15.9883 7.7744 16.1719 8.61712C16.3547 9.459 16.447 10.3681 16.447 11.3427C16.447 12.067 16.3995 12.7593 16.3035 13.4214C16.2013 14.1088 16.0206 14.7844 15.7644 15.437C15.4994 16.1193 15.1705 16.7108 14.7739 17.2124C14.3774 17.714 13.8529 18.1215 13.1996 18.4349C12.5463 18.7483 11.8016 18.9046 10.9646 18.9046ZM12.8999 13.3447C13.4242 12.8211 13.7159 12.0966 13.7058 11.3427C13.7058 10.5639 13.4436 9.89654 12.92 9.34074C12.3955 8.78495 11.7441 8.50705 10.9646 8.50705C10.1852 8.50705 9.53376 8.78495 9.00928 9.34074C8.49569 9.87018 8.21207 10.5928 8.22348 11.3427C8.22348 12.1216 8.48572 12.7889 9.00928 13.3447C9.53376 13.9005 10.1852 14.1784 10.9646 14.1784C11.7441 14.1784 12.3891 13.9005 12.8999 13.3447ZM10.9646 22.6855C17.0199 22.6855 21.9293 17.6068 21.9293 11.3427C21.9293 5.07871 17.0199 0 10.9646 0C4.90942 0 0 5.07871 0 11.3427C0 17.6068 4.90942 22.6855 10.9646 22.6855Z"/>
  </svg>
</svg>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Wordmark`
)});
  main.variable(observer("viewof wordmarkWidth")).define("viewof wordmarkWidth", ["Inputs"], function(Inputs){return(
Inputs.range([1, 2000], { value: 600, step: 1, label: "Image width" })
)});
  main.variable(observer("wordmarkWidth")).define("wordmarkWidth", ["Generators", "viewof wordmarkWidth"], (G, _) => G.input(_));
  main.variable(observer("viewof wordmarkPadding")).define("viewof wordmarkPadding", ["Inputs"], function(Inputs){return(
Inputs.range([0, 49], { value: 0, step: 1, label: "Padding %" })
)});
  main.variable(observer("wordmarkPadding")).define("wordmarkPadding", ["Generators", "viewof wordmarkPadding"], (G, _) => G.input(_));
  main.variable(observer("viewof wordmarkHeight")).define("viewof wordmarkHeight", ["Inputs"], function(Inputs){return(
Inputs.range([1, 2000], { value: 600, step: 1, label: "Image height" })
)});
  main.variable(observer("wordmarkHeight")).define("wordmarkHeight", ["Generators", "viewof wordmarkHeight"], (G, _) => G.input(_));
  main.variable(observer("viewof wordmarkMaintainRatio")).define("viewof wordmarkMaintainRatio", ["Inputs"], function(Inputs){return(
Inputs.toggle({label: "Auto height", value: true})
)});
  main.variable(observer("wordmarkMaintainRatio")).define("wordmarkMaintainRatio", ["Generators", "viewof wordmarkMaintainRatio"], (G, _) => G.input(_));
  main.variable(observer("wordmark")).define("wordmark", ["html","wordmarkSvgWidth","wordmarkSvgHeight","backgroundColorFinal","graphicColor","wordmarkNativeX","wordmarkNativeY","wordmarkGraphicWidth","wordmarkGraphicHeight","wordmarkGraphicX","wordmarkGraphicY"], function(html,wordmarkSvgWidth,wordmarkSvgHeight,backgroundColorFinal,graphicColor,wordmarkNativeX,wordmarkNativeY,wordmarkGraphicWidth,wordmarkGraphicHeight,wordmarkGraphicX,wordmarkGraphicY){return(
html`
<svg width="${wordmarkSvgWidth}" height="${wordmarkSvgHeight}" style="background-color:${backgroundColorFinal}" fill="${graphicColor}">
    <svg viewBox="0.7084810137748718, 0.7565160393714905, ${wordmarkNativeX}, ${wordmarkNativeY}" width="${wordmarkGraphicWidth}" height="${wordmarkGraphicHeight}" x="${wordmarkGraphicX}" y="${wordmarkGraphicY}">
      <path d="M8.85606 19.5061C7.79333 19.5061 6.77277 19.3289 5.79439 18.9747C4.81601 18.6205 3.93883 18.0807 3.16287 17.3553C2.40378 16.6299 1.80495 15.719 1.36636 14.6226C0.927774 13.5261 0.708481 12.2357 0.708481 10.7512C0.708481 9.26677 0.927774 7.97631 1.36636 6.87985C1.82181 5.78338 2.42909 4.87248 3.18818 4.14712C3.94727 3.42177 4.81601 2.88197 5.79439 2.52773C6.77277 2.17348 7.79333 1.99636 8.85606 1.99636C9.91878 1.99636 10.9393 2.17348 11.9177 2.52773C12.8961 2.88197 13.7648 3.42177 14.5239 4.14712C15.283 4.87248 15.8819 5.78338 16.3205 6.87985C16.7759 7.97631 17.0036 9.26677 17.0036 10.7512C17.0036 12.2357 16.7843 13.5261 16.3458 14.6226C15.9072 15.719 15.2999 16.6299 14.5239 17.3553C13.7648 18.0807 12.8961 18.6205 11.9177 18.9747C10.9393 19.3289 9.91878 19.5061 8.85606 19.5061ZM8.85606 17.9626C9.58141 17.9626 10.1549 17.6674 10.5767 17.077C11.0152 16.4697 11.3273 15.6263 11.5129 14.5467C11.7153 13.4671 11.8165 12.2019 11.8165 10.7512C11.8165 9.30051 11.7153 8.03535 11.5129 6.95576C11.3273 5.87616 11.0152 5.03273 10.5767 4.42545C10.1549 3.81818 9.58141 3.51454 8.85606 3.51454C8.14757 3.51454 7.57404 3.81818 7.13545 4.42545C6.69686 5.03273 6.37636 5.87616 6.17394 6.95576C5.98838 8.03535 5.8956 9.30051 5.8956 10.7512C5.8956 12.2019 5.98838 13.4671 6.17394 14.5467C6.37636 15.6263 6.69686 16.4697 7.13545 17.077C7.57404 17.6674 8.14757 17.9626 8.85606 17.9626Z"/>
      <path d="M18.1784 19.0253V17.7348L19.3171 17.4818C19.334 16.8745 19.3424 16.2251 19.3424 15.5335C19.3424 14.8419 19.3424 14.2346 19.3424 13.7117V3.21091L17.976 3.03379V1.89515L23.7451 0.756516L24.1753 1.03485L24.0741 4.55197V7.74015C25.0693 6.76177 26.267 6.27258 27.6671 6.27258C28.5949 6.27258 29.4383 6.51717 30.1974 7.00636C30.9565 7.47869 31.5553 8.19561 31.9939 9.15712C32.4494 10.1018 32.6771 11.2994 32.6771 12.7502C32.6771 14.1334 32.4156 15.3226 31.8927 16.3179C31.3698 17.3131 30.6866 18.0807 29.8431 18.6205C29.0166 19.1434 28.131 19.4048 27.1863 19.4048C26.461 19.4048 25.8284 19.2783 25.2886 19.0253C24.7488 18.7891 24.2765 18.4433 23.8716 17.9879L23.3656 19.4048L18.1784 19.0253ZM25.3392 8.77758C25.1199 8.77758 24.9091 8.81131 24.7066 8.87879C24.5211 8.94626 24.3355 9.03904 24.15 9.15712V16.6215C24.4873 16.8577 24.8837 16.9758 25.3392 16.9758C26.014 16.9758 26.5537 16.6299 26.9586 15.9383C27.3634 15.2467 27.5659 14.184 27.5659 12.7502C27.5659 11.2994 27.3634 10.2789 26.9586 9.68848C26.5537 9.08121 26.014 8.77758 25.3392 8.77758Z"/>
      <path d="M38.4474 19.4048C36.693 19.4048 35.1411 18.9916 33.7916 18.165L33.9181 14.9262H36.2207L36.6255 17.5577C36.9123 17.6758 37.2075 17.7686 37.5111 17.8361C37.8148 17.8867 38.1269 17.912 38.4474 17.912C39.0884 17.912 39.586 17.8108 39.9402 17.6083C40.2945 17.4059 40.4716 17.0685 40.4716 16.5962C40.4716 16.2588 40.3366 15.9552 40.0667 15.6853C39.8137 15.4154 39.2655 15.1708 38.4221 14.9515L36.9798 14.572C35.9845 14.3021 35.2254 13.8297 34.7025 13.155C34.1796 12.4634 33.9181 11.6284 33.9181 10.65C33.9181 9.38485 34.3989 8.33899 35.3604 7.51242C36.3388 6.68586 37.7389 6.27258 39.5607 6.27258C40.3366 6.27258 41.0536 6.35692 41.7114 6.52561C42.3862 6.69429 43.0694 6.94732 43.761 7.2847L43.5586 10.1439H41.2307L40.674 7.89197C40.5053 7.85823 40.3198 7.83293 40.1174 7.81606C39.9318 7.78232 39.7041 7.76545 39.4342 7.76545C38.9619 7.76545 38.557 7.8751 38.2196 8.09439C37.8991 8.29682 37.7389 8.61732 37.7389 9.05591C37.7389 9.32581 37.857 9.58727 38.0931 9.8403C38.3293 10.0933 38.8859 10.3379 39.7631 10.5741L41.1801 10.9536C42.3609 11.2741 43.2043 11.7718 43.7104 12.4465C44.2333 13.1213 44.4948 13.9563 44.4948 14.9515C44.4948 16.436 43.9465 17.5493 42.8501 18.2915C41.7705 19.0337 40.3029 19.4048 38.4474 19.4048Z"/>
      <path d="M52.007 7.63894C51.619 7.63894 51.2901 7.92571 51.0202 8.49924C50.7503 9.07278 50.5985 10.1439 50.5647 11.7127H51.754C52.3613 11.7127 52.7661 11.5946 52.9685 11.3585C53.1878 11.1055 53.2975 10.6584 53.2975 10.0174C53.2975 9.14025 53.1625 8.52455 52.8926 8.1703C52.6396 7.81606 52.3444 7.63894 52.007 7.63894ZM52.0829 19.4048C50.8178 19.4048 49.6876 19.1434 48.6923 18.6205C47.7139 18.0975 46.938 17.3469 46.3644 16.3685C45.7909 15.3732 45.5041 14.184 45.5041 12.8008C45.5041 11.7043 45.6981 10.7512 46.0861 9.94151C46.4741 9.13182 46.997 8.45707 47.6549 7.91727C48.3128 7.36061 49.0466 6.94732 49.8563 6.67742C50.666 6.40752 51.4841 6.27258 52.3106 6.27258C53.5252 6.27258 54.5289 6.52561 55.3217 7.03167C56.1314 7.52086 56.7387 8.18717 57.1435 9.03061C57.5484 9.85717 57.7508 10.7849 57.7508 11.8139C57.7508 12.0838 57.7424 12.32 57.7255 12.5224C57.7086 12.708 57.6749 12.9188 57.6243 13.155H50.59C50.725 14.3864 51.0877 15.2805 51.6781 15.8371C52.2853 16.3938 52.9601 16.6721 53.7023 16.6721C54.3433 16.6721 54.8916 16.5625 55.347 16.3432C55.8193 16.107 56.2326 15.8203 56.5869 15.4829L57.5737 16.4444C57.0339 17.4734 56.2917 18.224 55.347 18.6964C54.4192 19.1687 53.3312 19.4048 52.0829 19.4048Z"/>
      <path d="M58.7975 19V17.7095L60.0121 17.4312C60.0289 16.8239 60.0374 16.1829 60.0374 15.5082C60.0374 14.8166 60.0374 14.2093 60.0374 13.6864V12.0923C60.0374 11.6199 60.0289 11.2404 60.0121 10.9536C60.0121 10.6669 60.0036 10.4054 59.9868 10.1692C59.9868 9.91621 59.9783 9.62101 59.9615 9.28364L58.5951 9.05591V8.01848L64.1871 6.27258L64.6425 6.55091L64.8449 9.48606C65.1823 8.3896 65.6631 7.5799 66.2872 7.05697C66.9282 6.53404 67.5524 6.27258 68.1596 6.27258C68.7838 6.27258 69.3067 6.45813 69.7284 6.82924C70.167 7.18349 70.4285 7.74859 70.5128 8.52455C70.4791 9.19929 70.2767 9.73066 69.9055 10.1186C69.5344 10.4897 69.0958 10.6753 68.5898 10.6753C67.8138 10.6753 67.1053 10.2114 66.4643 9.28364L66.3378 9.10651C66.0342 9.44389 65.7305 9.88248 65.4269 10.4223C65.1401 10.9621 64.9461 11.5187 64.8449 12.0923V13.6864C64.8449 14.1756 64.8449 14.7491 64.8449 15.407C64.8449 16.0648 64.8534 16.689 64.8702 17.2794L66.8439 17.7095V19H58.7975Z"/>
      <path d="M79.6707 7.86667V6.67742H84.4277V7.86667L82.9095 8.1197L78.7345 19H76.4572L71.9533 8.1197L70.7388 7.86667V6.67742H78.355V7.86667L77.0139 8.1703L79.1141 13.99L81.0624 8.145L79.6707 7.86667Z"/>
      <path d="M94.267 19.4048C93.4742 19.4048 92.8332 19.253 92.344 18.9494C91.8717 18.6289 91.5259 18.1819 91.3066 17.6083C90.8174 18.1481 90.3198 18.5867 89.8137 18.9241C89.3245 19.2446 88.6244 19.4048 87.7135 19.4048C86.7183 19.4048 85.917 19.1181 85.3098 18.5445C84.7193 17.971 84.4241 17.1697 84.4241 16.1408C84.4241 15.4829 84.5675 14.9009 84.8543 14.3948C85.1579 13.8719 85.6809 13.3996 86.4231 12.9779C87.1822 12.5393 88.2449 12.1429 89.6113 11.7886C89.8137 11.738 90.0499 11.679 90.3198 11.6115C90.5897 11.5272 90.868 11.4513 91.1548 11.3838V10.4729C91.1548 9.39328 91.0282 8.65106 90.7752 8.24621C90.539 7.84136 90.0246 7.63894 89.2317 7.63894C89.1643 7.63894 89.0968 7.63894 89.0293 7.63894C88.9787 7.63894 88.9197 7.63894 88.8522 7.63894V8.49924C88.8522 9.52823 88.6413 10.262 88.2196 10.7006C87.7979 11.1223 87.3171 11.3332 86.7773 11.3332C85.7483 11.3332 85.1073 10.8777 84.8543 9.96682C84.8543 8.87035 85.3688 7.98475 86.3978 7.31C87.4436 6.61838 88.9871 6.27258 91.0282 6.27258C92.7826 6.27258 94.014 6.66056 94.7225 7.43652C95.4478 8.19561 95.8105 9.44389 95.8105 11.1814V16.9758C95.8105 17.2625 95.9539 17.4059 96.2407 17.4059C96.3419 17.4059 96.4431 17.3722 96.5443 17.3047C96.6455 17.2204 96.772 17.0685 96.9238 16.8492L97.6576 17.2541C97.354 18.0301 96.9323 18.5867 96.3925 18.9241C95.8695 19.2446 95.1611 19.4048 94.267 19.4048ZM88.7763 15.3564C88.7763 15.9805 88.9028 16.4444 89.1558 16.748C89.4088 17.0517 89.7209 17.2035 90.092 17.2035C90.2101 17.2035 90.3366 17.1782 90.4716 17.1276C90.6234 17.0601 90.8511 16.9252 91.1548 16.7227V12.573C90.9017 12.6405 90.6571 12.7333 90.421 12.8514C90.0667 13.0201 89.7041 13.3068 89.3329 13.7117C88.9618 14.1165 88.7763 14.6647 88.7763 15.3564Z"/>
      <path d="M98.1647 19.0253V17.7348L99.3033 17.4818C99.3202 16.8745 99.3286 16.2251 99.3286 15.5335C99.3286 14.8419 99.3286 14.2346 99.3286 13.7117V3.21091L97.9622 3.03379V1.89515L103.731 0.756516L104.161 1.03485L104.06 4.55197V7.74015C105.056 6.76177 106.253 6.27258 107.653 6.27258C108.581 6.27258 109.425 6.51717 110.184 7.00636C110.943 7.47869 111.542 8.19561 111.98 9.15712C112.436 10.1018 112.663 11.2994 112.663 12.7502C112.663 14.1334 112.402 15.3226 111.879 16.3179C111.356 17.3131 110.673 18.0807 109.829 18.6205C109.003 19.1434 108.117 19.4048 107.173 19.4048C106.447 19.4048 105.815 19.2783 105.275 19.0253C104.735 18.7891 104.263 18.4433 103.858 17.9879L103.352 19.4048L98.1647 19.0253ZM105.325 8.77758C105.106 8.77758 104.895 8.81131 104.693 8.87879C104.507 8.94626 104.322 9.03904 104.136 9.15712V16.6215C104.474 16.8577 104.87 16.9758 105.325 16.9758C106 16.9758 106.54 16.6299 106.945 15.9383C107.35 15.2467 107.552 14.184 107.552 12.7502C107.552 11.2994 107.35 10.2789 106.945 9.68848C106.54 9.08121 106 8.77758 105.325 8.77758Z"/>
      <path d="M113.904 19V17.7095L115.043 17.4565C115.06 16.8155 115.068 16.1829 115.068 15.5588C115.085 14.9346 115.094 14.3105 115.094 13.6864V3.28682L113.727 3.03379V1.89515L119.572 0.756516L120.002 1.03485L119.901 4.55197V13.6864C119.901 14.3105 119.901 14.9431 119.901 15.5841C119.918 16.2082 119.935 16.8408 119.952 17.4818L121.09 17.7095V19H113.904Z"/>
      <path d="M128.732 7.63894C128.344 7.63894 128.015 7.92571 127.745 8.49924C127.475 9.07278 127.323 10.1439 127.289 11.7127H128.478C129.086 11.7127 129.491 11.5946 129.693 11.3585C129.912 11.1055 130.022 10.6584 130.022 10.0174C130.022 9.14025 129.887 8.52455 129.617 8.1703C129.364 7.81606 129.069 7.63894 128.732 7.63894ZM128.807 19.4048C127.542 19.4048 126.412 19.1434 125.417 18.6205C124.438 18.0975 123.662 17.3469 123.089 16.3685C122.515 15.3732 122.229 14.184 122.229 12.8008C122.229 11.7043 122.423 10.7512 122.811 9.94151C123.199 9.13182 123.722 8.45707 124.379 7.91727C125.037 7.36061 125.771 6.94732 126.581 6.67742C127.39 6.40752 128.209 6.27258 129.035 6.27258C130.25 6.27258 131.253 6.52561 132.046 7.03167C132.856 7.52086 133.463 8.18717 133.868 9.03061C134.273 9.85717 134.475 10.7849 134.475 11.8139C134.475 12.0838 134.467 12.32 134.45 12.5224C134.433 12.708 134.399 12.9188 134.349 13.155H127.315C127.45 14.3864 127.812 15.2805 128.403 15.8371C129.01 16.3938 129.685 16.6721 130.427 16.6721C131.068 16.6721 131.616 16.5625 132.072 16.3432C132.544 16.107 132.957 15.8203 133.311 15.4829L134.298 16.4444C133.758 17.4734 133.016 18.224 132.072 18.6964C131.144 19.1687 130.056 19.4048 128.807 19.4048Z"/>
  </svg>
</svg>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Logo and wordmark`
)});
  main.variable(observer("viewof combinedWidth")).define("viewof combinedWidth", ["Inputs"], function(Inputs){return(
Inputs.range([1, 2000], { value: 750, step: 1, label: "Image width" })
)});
  main.variable(observer("combinedWidth")).define("combinedWidth", ["Generators", "viewof combinedWidth"], (G, _) => G.input(_));
  main.variable(observer("viewof combinedPadding")).define("viewof combinedPadding", ["Inputs"], function(Inputs){return(
Inputs.range([0, 49], { value: 0, step: 1, label: "Padding %" })
)});
  main.variable(observer("combinedPadding")).define("combinedPadding", ["Generators", "viewof combinedPadding"], (G, _) => G.input(_));
  main.variable(observer("viewof combinedHeight")).define("viewof combinedHeight", ["Inputs"], function(Inputs){return(
Inputs.range([1, 2000], { value: 750, step: 1, label: "Image height" })
)});
  main.variable(observer("combinedHeight")).define("combinedHeight", ["Generators", "viewof combinedHeight"], (G, _) => G.input(_));
  main.variable(observer("viewof combinedMaintainRatio")).define("viewof combinedMaintainRatio", ["Inputs"], function(Inputs){return(
Inputs.toggle({label: "Auto height", value: true})
)});
  main.variable(observer("combinedMaintainRatio")).define("combinedMaintainRatio", ["Generators", "viewof combinedMaintainRatio"], (G, _) => G.input(_));
  main.variable(observer("logoAndWordmark")).define("logoAndWordmark", ["html","combinedSvgWidth","combinedSvgHeight","backgroundColorFinal","graphicColor","combinedNativeX","combinedNativeY","combinedGraphicWidth","combinedGraphicHeight","combinedGraphicX","combinedGraphicY"], function(html,combinedSvgWidth,combinedSvgHeight,backgroundColorFinal,graphicColor,combinedNativeX,combinedNativeY,combinedGraphicWidth,combinedGraphicHeight,combinedGraphicX,combinedGraphicY){return(
html`
<svg width="${combinedSvgWidth}" height="${combinedSvgHeight}" style="background-color:${backgroundColorFinal}" fill="${graphicColor}">
    <svg viewBox="0, 0, ${combinedNativeX}, ${combinedNativeY}" width="${combinedGraphicWidth}" height="${combinedGraphicHeight}" x="${combinedGraphicX}" y="${combinedGraphicY}">
      <path d="M38.8561 19.5061C37.7933 19.5061 36.7728 19.3289 35.7944 18.9747C34.816 18.6205 33.9388 18.0807 33.1629 17.3553C32.4038 16.6299 31.8049 15.719 31.3664 14.6226C30.9278 13.5261 30.7085 12.2357 30.7085 10.7512C30.7085 9.26677 30.9278 7.97631 31.3664 6.87985C31.8218 5.78338 32.4291 4.87248 33.1882 4.14712C33.9473 3.42177 34.816 2.88197 35.7944 2.52773C36.7728 2.17348 37.7933 1.99636 38.8561 1.99636C39.9188 1.99636 40.9393 2.17348 41.9177 2.52773C42.8961 2.88197 43.7648 3.42177 44.5239 4.14712C45.283 4.87248 45.8819 5.78338 46.3205 6.87985C46.7759 7.97631 47.0036 9.26677 47.0036 10.7512C47.0036 12.2357 46.7843 13.5261 46.3458 14.6226C45.9072 15.719 45.2999 16.6299 44.5239 17.3553C43.7648 18.0807 42.8961 18.6205 41.9177 18.9747C40.9393 19.3289 39.9188 19.5061 38.8561 19.5061ZM38.8561 17.9626C39.5814 17.9626 40.1549 17.6674 40.5767 17.077C41.0152 16.4697 41.3273 15.6263 41.5129 14.5467C41.7153 13.4671 41.8165 12.2019 41.8165 10.7512C41.8165 9.30051 41.7153 8.03535 41.5129 6.95576C41.3273 5.87616 41.0152 5.03273 40.5767 4.42545C40.1549 3.81818 39.5814 3.51454 38.8561 3.51454C38.1476 3.51454 37.574 3.81818 37.1355 4.42545C36.6969 5.03273 36.3764 5.87616 36.1739 6.95576C35.9884 8.03535 35.8956 9.30051 35.8956 10.7512C35.8956 12.2019 35.9884 13.4671 36.1739 14.5467C36.3764 15.6263 36.6969 16.4697 37.1355 17.077C37.574 17.6674 38.1476 17.9626 38.8561 17.9626Z"/>
      <path d="M48.1784 19.0253V17.7348L49.3171 17.4818C49.334 16.8745 49.3424 16.2251 49.3424 15.5335C49.3424 14.8419 49.3424 14.2346 49.3424 13.7117V3.21091L47.976 3.03379V1.89515L53.7451 0.756516L54.1753 1.03485L54.0741 4.55197V7.74015C55.0693 6.76177 56.267 6.27258 57.6671 6.27258C58.5949 6.27258 59.4383 6.51717 60.1974 7.00636C60.9565 7.47869 61.5553 8.19561 61.9939 9.15712C62.4494 10.1018 62.6771 11.2994 62.6771 12.7502C62.6771 14.1334 62.4156 15.3226 61.8927 16.3179C61.3698 17.3131 60.6866 18.0807 59.8431 18.6205C59.0166 19.1434 58.131 19.4048 57.1863 19.4048C56.461 19.4048 55.8284 19.2783 55.2886 19.0253C54.7488 18.7891 54.2765 18.4433 53.8716 17.9879L53.3656 19.4048L48.1784 19.0253ZM55.3392 8.77758C55.1199 8.77758 54.9091 8.81131 54.7066 8.87879C54.5211 8.94626 54.3355 9.03904 54.15 9.15712V16.6215C54.4873 16.8577 54.8837 16.9758 55.3392 16.9758C56.014 16.9758 56.5537 16.6299 56.9586 15.9383C57.3634 15.2467 57.5659 14.184 57.5659 12.7502C57.5659 11.2994 57.3634 10.2789 56.9586 9.68848C56.5537 9.08121 56.014 8.77758 55.3392 8.77758Z"/>
      <path d="M68.4474 19.4048C66.693 19.4048 65.1411 18.9916 63.7916 18.165L63.9181 14.9262H66.2207L66.6255 17.5577C66.9123 17.6758 67.2075 17.7686 67.5111 17.8361C67.8148 17.8867 68.1269 17.912 68.4474 17.912C69.0884 17.912 69.586 17.8108 69.9402 17.6083C70.2945 17.4059 70.4716 17.0685 70.4716 16.5962C70.4716 16.2588 70.3366 15.9552 70.0667 15.6853C69.8137 15.4154 69.2655 15.1708 68.4221 14.9515L66.9798 14.572C65.9845 14.3021 65.2254 13.8297 64.7025 13.155C64.1796 12.4634 63.9181 11.6284 63.9181 10.65C63.9181 9.38485 64.3989 8.33899 65.3604 7.51242C66.3388 6.68586 67.7389 6.27258 69.5607 6.27258C70.3366 6.27258 71.0536 6.35692 71.7114 6.52561C72.3862 6.69429 73.0694 6.94732 73.761 7.2847L73.5586 10.1439H71.2307L70.674 7.89197C70.5053 7.85823 70.3198 7.83293 70.1174 7.81606C69.9318 7.78232 69.7041 7.76545 69.4342 7.76545C68.9619 7.76545 68.557 7.8751 68.2196 8.09439C67.8991 8.29682 67.7389 8.61732 67.7389 9.05591C67.7389 9.32581 67.857 9.58727 68.0931 9.8403C68.3293 10.0933 68.8859 10.3379 69.7631 10.5741L71.1801 10.9536C72.3609 11.2741 73.2043 11.7718 73.7104 12.4465C74.2333 13.1213 74.4948 13.9563 74.4948 14.9515C74.4948 16.436 73.9465 17.5493 72.8501 18.2915C71.7705 19.0337 70.3029 19.4048 68.4474 19.4048Z"/>
      <path d="M82.007 7.63894C81.619 7.63894 81.2901 7.92571 81.0202 8.49924C80.7503 9.07278 80.5985 10.1439 80.5647 11.7127H81.754C82.3613 11.7127 82.7661 11.5946 82.9685 11.3585C83.1878 11.1055 83.2975 10.6584 83.2975 10.0174C83.2975 9.14025 83.1625 8.52455 82.8926 8.1703C82.6396 7.81606 82.3444 7.63894 82.007 7.63894ZM82.0829 19.4048C80.8178 19.4048 79.6876 19.1434 78.6923 18.6205C77.7139 18.0975 76.938 17.3469 76.3644 16.3685C75.7909 15.3732 75.5041 14.184 75.5041 12.8008C75.5041 11.7043 75.6981 10.7512 76.0861 9.94151C76.4741 9.13182 76.997 8.45707 77.6549 7.91727C78.3128 7.36061 79.0466 6.94732 79.8563 6.67742C80.666 6.40752 81.4841 6.27258 82.3106 6.27258C83.5252 6.27258 84.5289 6.52561 85.3217 7.03167C86.1314 7.52086 86.7387 8.18717 87.1435 9.03061C87.5484 9.85717 87.7508 10.7849 87.7508 11.8139C87.7508 12.0838 87.7424 12.32 87.7255 12.5224C87.7086 12.708 87.6749 12.9188 87.6243 13.155H80.59C80.725 14.3864 81.0877 15.2805 81.6781 15.8371C82.2853 16.3938 82.9601 16.6721 83.7023 16.6721C84.3433 16.6721 84.8916 16.5625 85.347 16.3432C85.8193 16.107 86.2326 15.8203 86.5869 15.4829L87.5737 16.4444C87.0339 17.4734 86.2917 18.224 85.347 18.6964C84.4192 19.1687 83.3312 19.4048 82.0829 19.4048Z"/>
      <path d="M88.7975 19V17.7095L90.0121 17.4312C90.0289 16.8239 90.0374 16.1829 90.0374 15.5082C90.0374 14.8166 90.0374 14.2093 90.0374 13.6864V12.0923C90.0374 11.6199 90.0289 11.2404 90.0121 10.9536C90.0121 10.6669 90.0036 10.4054 89.9868 10.1692C89.9868 9.91621 89.9783 9.62101 89.9615 9.28364L88.5951 9.05591V8.01848L94.1871 6.27258L94.6425 6.55091L94.8449 9.48606C95.1823 8.3896 95.6631 7.5799 96.2872 7.05697C96.9282 6.53404 97.5524 6.27258 98.1596 6.27258C98.7838 6.27258 99.3067 6.45813 99.7284 6.82924C100.167 7.18349 100.428 7.74859 100.513 8.52455C100.479 9.19929 100.277 9.73066 99.9055 10.1186C99.5344 10.4897 99.0958 10.6753 98.5898 10.6753C97.8138 10.6753 97.1053 10.2114 96.4643 9.28364L96.3378 9.10651C96.0342 9.44389 95.7305 9.88248 95.4269 10.4223C95.1401 10.9621 94.9461 11.5187 94.8449 12.0923V13.6864C94.8449 14.1756 94.8449 14.7491 94.8449 15.407C94.8449 16.0648 94.8534 16.689 94.8702 17.2794L96.8439 17.7095V19H88.7975Z"/>
      <path d="M109.671 7.86667V6.67742H114.428V7.86667L112.91 8.1197L108.735 19H106.457L101.953 8.1197L100.739 7.86667V6.67742H108.355V7.86667L107.014 8.1703L109.114 13.99L111.062 8.145L109.671 7.86667Z"/>
      <path d="M124.267 19.4048C123.474 19.4048 122.833 19.253 122.344 18.9494C121.872 18.6289 121.526 18.1819 121.307 17.6083C120.817 18.1481 120.32 18.5867 119.814 18.9241C119.324 19.2446 118.624 19.4048 117.714 19.4048C116.718 19.4048 115.917 19.1181 115.31 18.5445C114.719 17.971 114.424 17.1697 114.424 16.1408C114.424 15.4829 114.568 14.9009 114.854 14.3948C115.158 13.8719 115.681 13.3996 116.423 12.9779C117.182 12.5393 118.245 12.1429 119.611 11.7886C119.814 11.738 120.05 11.679 120.32 11.6115C120.59 11.5272 120.868 11.4513 121.155 11.3838V10.4729C121.155 9.39328 121.028 8.65106 120.775 8.24621C120.539 7.84136 120.025 7.63894 119.232 7.63894C119.164 7.63894 119.097 7.63894 119.029 7.63894C118.979 7.63894 118.92 7.63894 118.852 7.63894V8.49924C118.852 9.52823 118.641 10.262 118.22 10.7006C117.798 11.1223 117.317 11.3332 116.777 11.3332C115.748 11.3332 115.107 10.8777 114.854 9.96682C114.854 8.87035 115.369 7.98475 116.398 7.31C117.444 6.61838 118.987 6.27258 121.028 6.27258C122.783 6.27258 124.014 6.66056 124.722 7.43652C125.448 8.19561 125.811 9.44389 125.811 11.1814V16.9758C125.811 17.2625 125.954 17.4059 126.241 17.4059C126.342 17.4059 126.443 17.3722 126.544 17.3047C126.646 17.2204 126.772 17.0685 126.924 16.8492L127.658 17.2541C127.354 18.0301 126.932 18.5867 126.392 18.9241C125.87 19.2446 125.161 19.4048 124.267 19.4048ZM118.776 15.3564C118.776 15.9805 118.903 16.4444 119.156 16.748C119.409 17.0517 119.721 17.2035 120.092 17.2035C120.21 17.2035 120.337 17.1782 120.472 17.1276C120.623 17.0601 120.851 16.9252 121.155 16.7227V12.573C120.902 12.6405 120.657 12.7333 120.421 12.8514C120.067 13.0201 119.704 13.3068 119.333 13.7117C118.962 14.1165 118.776 14.6647 118.776 15.3564Z"/>
      <path d="M128.165 19.0253V17.7348L129.303 17.4818C129.32 16.8745 129.329 16.2251 129.329 15.5335C129.329 14.8419 129.329 14.2346 129.329 13.7117V3.21091L127.962 3.03379V1.89515L133.731 0.756516L134.161 1.03485L134.06 4.55197V7.74015C135.056 6.76177 136.253 6.27258 137.653 6.27258C138.581 6.27258 139.425 6.51717 140.184 7.00636C140.943 7.47869 141.542 8.19561 141.98 9.15712C142.436 10.1018 142.663 11.2994 142.663 12.7502C142.663 14.1334 142.402 15.3226 141.879 16.3179C141.356 17.3131 140.673 18.0807 139.829 18.6205C139.003 19.1434 138.117 19.4048 137.173 19.4048C136.447 19.4048 135.815 19.2783 135.275 19.0253C134.735 18.7891 134.263 18.4433 133.858 17.9879L133.352 19.4048L128.165 19.0253ZM135.325 8.77758C135.106 8.77758 134.895 8.81131 134.693 8.87879C134.507 8.94626 134.322 9.03904 134.136 9.15712V16.6215C134.474 16.8577 134.87 16.9758 135.325 16.9758C136 16.9758 136.54 16.6299 136.945 15.9383C137.35 15.2467 137.552 14.184 137.552 12.7502C137.552 11.2994 137.35 10.2789 136.945 9.68848C136.54 9.08121 136 8.77758 135.325 8.77758Z"/>
      <path d="M143.904 19V17.7095L145.043 17.4565C145.06 16.8155 145.068 16.1829 145.068 15.5588C145.085 14.9346 145.094 14.3105 145.094 13.6864V3.28682L143.727 3.03379V1.89515L149.572 0.756516L150.002 1.03485L149.901 4.55197V13.6864C149.901 14.3105 149.901 14.9431 149.901 15.5841C149.918 16.2082 149.935 16.8408 149.952 17.4818L151.09 17.7095V19H143.904Z"/>
      <path d="M158.732 7.63894C158.344 7.63894 158.015 7.92571 157.745 8.49924C157.475 9.07278 157.323 10.1439 157.289 11.7127H158.478C159.086 11.7127 159.491 11.5946 159.693 11.3585C159.912 11.1055 160.022 10.6584 160.022 10.0174C160.022 9.14025 159.887 8.52455 159.617 8.1703C159.364 7.81606 159.069 7.63894 158.732 7.63894ZM158.807 19.4048C157.542 19.4048 156.412 19.1434 155.417 18.6205C154.438 18.0975 153.662 17.3469 153.089 16.3685C152.515 15.3732 152.229 14.184 152.229 12.8008C152.229 11.7043 152.423 10.7512 152.811 9.94151C153.199 9.13182 153.722 8.45707 154.379 7.91727C155.037 7.36061 155.771 6.94732 156.581 6.67742C157.39 6.40752 158.209 6.27258 159.035 6.27258C160.25 6.27258 161.253 6.52561 162.046 7.03167C162.856 7.52086 163.463 8.18717 163.868 9.03061C164.273 9.85717 164.475 10.7849 164.475 11.8139C164.475 12.0838 164.467 12.32 164.45 12.5224C164.433 12.708 164.399 12.9188 164.349 13.155H157.315C157.45 14.3864 157.812 15.2805 158.403 15.8371C159.01 16.3938 159.685 16.6721 160.427 16.6721C161.068 16.6721 161.616 16.5625 162.072 16.3432C162.544 16.107 162.957 15.8203 163.311 15.4829L164.298 16.4444C163.758 17.4734 163.016 18.224 162.072 18.6964C161.144 19.1687 160.056 19.4048 158.807 19.4048Z"/>
      <path d="M10.9646 18.9046C9.95224 18.9046 9.07507 18.6853 8.33313 18.2467C7.59386 17.8098 7.0028 17.1909 6.62722 16.4604C6.22789 15.7003 5.93558 14.8965 5.75735 14.0684C5.56825 13.1704 5.47613 12.2574 5.48232 11.3427C5.48232 10.6185 5.52984 9.92616 5.62578 9.26408C5.7208 8.60284 5.89715 7.93067 6.15391 7.24843C6.41066 6.56618 6.74143 5.97468 7.14438 5.47308C7.56389 4.9592 8.1063 4.54092 8.72969 4.25059C9.38391 3.93719 10.1277 3.78091 10.9646 3.78091C11.977 3.78091 12.8542 4.00021 13.5962 4.43879C14.3354 4.87564 14.9265 5.49454 15.3021 6.22506C15.6986 6.97704 15.9883 7.7744 16.1719 8.61712C16.3547 9.459 16.447 10.3681 16.447 11.3427C16.447 12.067 16.3995 12.7593 16.3035 13.4214C16.2013 14.1088 16.0206 14.7844 15.7644 15.437C15.4994 16.1193 15.1705 16.7108 14.7739 17.2124C14.3774 17.714 13.8529 18.1215 13.1996 18.4349C12.5463 18.7483 11.8016 18.9046 10.9646 18.9046ZM12.8999 13.3447C13.4242 12.8211 13.7159 12.0966 13.7058 11.3427C13.7058 10.5639 13.4436 9.89654 12.92 9.34074C12.3955 8.78495 11.7441 8.50705 10.9646 8.50705C10.1852 8.50705 9.53376 8.78495 9.00928 9.34074C8.49569 9.87018 8.21207 10.5928 8.22348 11.3427C8.22348 12.1216 8.48572 12.7889 9.00928 13.3447C9.53376 13.9005 10.1852 14.1784 10.9646 14.1784C11.7441 14.1784 12.3891 13.9005 12.8999 13.3447ZM10.9646 22.6855C17.0199 22.6855 21.9293 17.6068 21.9293 11.3427C21.9293 5.07871 17.0199 0 10.9646 0C4.90942 0 0 5.07871 0 11.3427C0 17.6068 4.90942 22.6855 10.9646 22.6855Z"/>
  </svg>
</svg>`
)});
  main.variable(observer("combined")).define("combined", ["logoAndWordmark"], function(logoAndWordmark){return(
logoAndWordmark
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Variables`
)});
  main.variable(observer("viewof graphicColor")).define("viewof graphicColor", ["Inputs"], function(Inputs){return(
Inputs.text({label: "Graphic color", type: "color", value: "#000000"})
)});
  main.variable(observer("graphicColor")).define("graphicColor", ["Generators", "viewof graphicColor"], (G, _) => G.input(_));
  main.variable(observer("viewof backgroundColor")).define("viewof backgroundColor", ["Inputs"], function(Inputs){return(
Inputs.text({label: "Background color", type: "color", value: "#ffffff"})
)});
  main.variable(observer("backgroundColor")).define("backgroundColor", ["Generators", "viewof backgroundColor"], (G, _) => G.input(_));
  main.variable(observer("viewof transparentBackground")).define("viewof transparentBackground", ["Inputs"], function(Inputs){return(
Inputs.toggle({label: "Transparent background", value: true})
)});
  main.variable(observer("transparentBackground")).define("transparentBackground", ["Generators", "viewof transparentBackground"], (G, _) => G.input(_));
  main.variable(observer("backgroundColorFinal")).define("backgroundColorFinal", ["transparentBackground","backgroundColor"], function(transparentBackground,backgroundColor)
{
  if (transparentBackground) {
    return "transparent"
  }
  else {
    return backgroundColor
  }
}
);
  main.variable(observer("logoNativeX")).define("logoNativeX", function(){return(
21.92930030822754
)});
  main.variable(observer("logoNativeY")).define("logoNativeY", function(){return(
22.68549919128418
)});
  main.variable(observer("logoRatio")).define("logoRatio", ["logoNativeX","logoNativeY"], function(logoNativeX,logoNativeY){return(
logoNativeX/logoNativeY
)});
  main.variable(observer("logoSvgWidth")).define("logoSvgWidth", ["logoWidth"], function(logoWidth){return(
logoWidth
)});
  main.variable(observer("logoSvgHeight")).define("logoSvgHeight", ["logoMaintainRatio","logoSvgWidth","logoRatio","logoHeight","logoGraphicHeight"], function(logoMaintainRatio,logoSvgWidth,logoRatio,logoHeight,logoGraphicHeight)
{
  if (logoMaintainRatio) {
    return Math.round(logoSvgWidth / logoRatio)
  }
  else {
    if (logoHeight >= logoGraphicHeight) {
      return logoHeight
    }
    else {
      return logoGraphicHeight
    }
  }
}
);
  main.variable(observer("logoGraphicWidth")).define("logoGraphicWidth", ["logoWidth","logoPadding"], function(logoWidth,logoPadding){return(
logoWidth - (logoWidth / 100) * (logoPadding * 2)
)});
  main.variable(observer("logoGraphicHeight")).define("logoGraphicHeight", ["logoGraphicWidth","logoRatio"], function(logoGraphicWidth,logoRatio){return(
Math.round(logoGraphicWidth / logoRatio)
)});
  main.variable(observer("logoGraphicX")).define("logoGraphicX", ["logoSvgWidth","logoGraphicWidth"], function(logoSvgWidth,logoGraphicWidth){return(
(logoSvgWidth - logoGraphicWidth) / 2
)});
  main.variable(observer("logoGraphicY")).define("logoGraphicY", ["logoSvgHeight","logoGraphicHeight"], function(logoSvgHeight,logoGraphicHeight){return(
(logoSvgHeight - logoGraphicHeight) / 2
)});
  main.variable(observer("wordmarkNativeX")).define("wordmarkNativeX", function(){return(
133.7665252685547
)});
  main.variable(observer("wordmarkNativeY")).define("wordmarkNativeY", function(){return(
18.749584197998047
)});
  main.variable(observer("wordmarkRatio")).define("wordmarkRatio", ["wordmarkNativeX","wordmarkNativeY"], function(wordmarkNativeX,wordmarkNativeY){return(
wordmarkNativeX/wordmarkNativeY
)});
  main.variable(observer("wordmarkSvgWidth")).define("wordmarkSvgWidth", ["wordmarkWidth"], function(wordmarkWidth){return(
wordmarkWidth
)});
  main.variable(observer("wordmarkSvgHeight")).define("wordmarkSvgHeight", ["wordmarkMaintainRatio","wordmarkSvgWidth","wordmarkRatio","wordmarkHeight","wordmarkGraphicHeight"], function(wordmarkMaintainRatio,wordmarkSvgWidth,wordmarkRatio,wordmarkHeight,wordmarkGraphicHeight)
{
  if (wordmarkMaintainRatio) {
    return Math.round(wordmarkSvgWidth / wordmarkRatio)
  }
  else {
    if (wordmarkHeight >= wordmarkGraphicHeight) {
      return wordmarkHeight
    }
    else {
      return wordmarkGraphicHeight
    }
  }
}
);
  main.variable(observer("wordmarkGraphicWidth")).define("wordmarkGraphicWidth", ["wordmarkWidth","wordmarkPadding"], function(wordmarkWidth,wordmarkPadding){return(
wordmarkWidth - (wordmarkWidth / 100) * (wordmarkPadding * 2)
)});
  main.variable(observer("wordmarkGraphicHeight")).define("wordmarkGraphicHeight", ["wordmarkGraphicWidth","wordmarkRatio"], function(wordmarkGraphicWidth,wordmarkRatio){return(
Math.round(wordmarkGraphicWidth / wordmarkRatio)
)});
  main.variable(observer("wordmarkGraphicX")).define("wordmarkGraphicX", ["wordmarkSvgWidth","wordmarkGraphicWidth"], function(wordmarkSvgWidth,wordmarkGraphicWidth){return(
(wordmarkSvgWidth - wordmarkGraphicWidth) / 2
)});
  main.variable(observer("wordmarkGraphicY")).define("wordmarkGraphicY", ["wordmarkSvgHeight","wordmarkGraphicHeight"], function(wordmarkSvgHeight,wordmarkGraphicHeight){return(
(wordmarkSvgHeight - wordmarkGraphicHeight) / 2
)});
  main.variable(observer("combinedNativeX")).define("combinedNativeX", function(){return(
164.47500610351562
)});
  main.variable(observer("combinedNativeY")).define("combinedNativeY", function(){return(
22.68549919128418
)});
  main.variable(observer("combinedRatio")).define("combinedRatio", ["combinedNativeX","combinedNativeY"], function(combinedNativeX,combinedNativeY){return(
combinedNativeX/combinedNativeY
)});
  main.variable(observer("combinedSvgWidth")).define("combinedSvgWidth", ["combinedWidth"], function(combinedWidth){return(
combinedWidth
)});
  main.variable(observer("combinedSvgHeight")).define("combinedSvgHeight", ["combinedMaintainRatio","combinedSvgWidth","combinedRatio","combinedHeight","combinedGraphicHeight"], function(combinedMaintainRatio,combinedSvgWidth,combinedRatio,combinedHeight,combinedGraphicHeight)
{
  if (combinedMaintainRatio) {
    return Math.round(combinedSvgWidth / combinedRatio)
  }
  else {
    if (combinedHeight >= combinedGraphicHeight) {
      return combinedHeight
    }
    else {
      return combinedGraphicHeight
    }
  }
}
);
  main.variable(observer("combinedGraphicWidth")).define("combinedGraphicWidth", ["combinedWidth","combinedPadding"], function(combinedWidth,combinedPadding){return(
combinedWidth - (combinedWidth / 100) * (combinedPadding * 2)
)});
  main.variable(observer("combinedGraphicHeight")).define("combinedGraphicHeight", ["combinedGraphicWidth","combinedRatio"], function(combinedGraphicWidth,combinedRatio){return(
Math.round(combinedGraphicWidth / combinedRatio)
)});
  main.variable(observer("combinedGraphicX")).define("combinedGraphicX", ["combinedSvgWidth","combinedGraphicWidth"], function(combinedSvgWidth,combinedGraphicWidth){return(
(combinedSvgWidth - combinedGraphicWidth) / 2
)});
  main.variable(observer("combinedGraphicY")).define("combinedGraphicY", ["combinedSvgHeight","combinedGraphicHeight"], function(combinedSvgHeight,combinedGraphicHeight){return(
(combinedSvgHeight - combinedGraphicHeight) / 2
)});
  main.variable(observer()).define(["htl"], function(htl){return(
htl.html`<style>
  svg {
    outline: 1px dashed #ddd;
  }
</style>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Calculate the viewbox for a given SVG`
)});
  main.variable(observer("calculateViewbox")).define("calculateViewbox", function(){return(
function calculateViewbox(svg) {
  document.body.appendChild(svg);
  const {x, y, width, height} = svg.getBBox();
  document.body.removeChild(svg);
  return [x, y, width, height];
}
)});
  main.variable(observer()).define(["calculateViewbox","tester"], function(calculateViewbox,tester){return(
calculateViewbox(tester)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Just replace the \`path\` stuff inside \`tester\`:`
)});
  main.variable(observer("tester")).define("tester", ["html"], function(html){return(
html`<svg><path d="M10.9646 18.9046C9.95224 18.9046 9.07507 18.6853 8.33313 18.2467C7.59386 17.8098 7.0028 17.1909 6.62722 16.4604C6.22789 15.7003 5.93558 14.8965 5.75735 14.0684C5.56825 13.1704 5.47613 12.2574 5.48232 11.3427C5.48232 10.6185 5.52984 9.92616 5.62578 9.26408C5.7208 8.60284 5.89715 7.93067 6.15391 7.24843C6.41066 6.56618 6.74143 5.97468 7.14438 5.47308C7.56389 4.9592 8.1063 4.54092 8.72969 4.25059C9.38391 3.93719 10.1277 3.78091 10.9646 3.78091C11.977 3.78091 12.8542 4.00021 13.5962 4.43879C14.3354 4.87564 14.9265 5.49454 15.3021 6.22506C15.6986 6.97704 15.9883 7.7744 16.1719 8.61712C16.3547 9.459 16.447 10.3681 16.447 11.3427C16.447 12.067 16.3995 12.7593 16.3035 13.4214C16.2013 14.1088 16.0206 14.7844 15.7644 15.437C15.4994 16.1193 15.1705 16.7108 14.7739 17.2124C14.3774 17.714 13.8529 18.1215 13.1996 18.4349C12.5463 18.7483 11.8016 18.9046 10.9646 18.9046ZM12.8999 13.3447C13.4242 12.8211 13.7159 12.0966 13.7058 11.3427C13.7058 10.5639 13.4436 9.89654 12.92 9.34074C12.3955 8.78495 11.7441 8.50705 10.9646 8.50705C10.1852 8.50705 9.53376 8.78495 9.00928 9.34074C8.49569 9.87018 8.21207 10.5928 8.22348 11.3427C8.22348 12.1216 8.48572 12.7889 9.00928 13.3447C9.53376 13.9005 10.1852 14.1784 10.9646 14.1784C11.7441 14.1784 12.3891 13.9005 12.8999 13.3447ZM10.9646 22.6855C17.0199 22.6855 21.9293 17.6068 21.9293 11.3427C21.9293 5.07871 17.0199 0 10.9646 0C4.90942 0 0 5.07871 0 11.3427C0 17.6068 4.90942 22.6855 10.9646 22.6855Z"/></svg>`
)});
  return main;
}
