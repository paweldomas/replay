(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"./src/replay/components/common.js":function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"k",(function(){return r})),n.d(t,"g",(function(){return s})),n.d(t,"d",(function(){return c})),n.d(t,"f",(function(){return i})),n.d(t,"h",(function(){return l})),n.d(t,"i",(function(){return u})),n.d(t,"j",(function(){return p})),n.d(t,"c",(function(){return d})),n.d(t,"b",(function(){return B})),n.d(t,"e",(function(){return y}));const o="replay-";function r(e,...t){const n=null==e?"":e,o=[];for(let r=0;r<t.length;r++)t[r]&&o.push(n+t[r]);return o.join(" ")}const a=e=>e;function s({classes:e,selectClasses:t,classNames:n,classNamePrefix:o}){if(e&&t){const n=t(e);return Array.isArray(n)?n.filter(a).join(" "):n}if(n)return r(o,...n)}function c(e,t){const n=(t||e.currentTarget).getBoundingClientRect();let o;return o=e.touches&&e.touches.length>0?e.touches[0]:e.changedTouches&&e.changedTouches.length>0?e.changedTouches[0]:e,{x:Math.max(0,Math.min(o.pageX-n.left,n.width)),y:Math.max(0,Math.min(o.pageY-n.top,n.height)),width:n.width,height:n.height}}function i(e){return t=>{e.indexOf(t.key)>=0&&(t.preventDefault(),t.stopPropagation())}}const l=(e,t)=>e!==t&&(!(e instanceof Date&&t instanceof Date&&e.getTime()===t.getTime())&&!(Number.isNaN(e)&&Number.isNaN(t))),A=e=>null!=e&&e.constructor==={}.constructor,u=(e,t)=>{if(e===t)return!0;if(A(e)&&A(t)){const n=Object.keys(e),o=Object.keys(t);return n.length===o.length&&(!(n.filter(n=>l(e[n],t[n])).length>0)&&0===o.filter(n=>l(t[n],e[n])).length)}if(Array.isArray(e)&&Array.isArray(t)&&e.length===t.length){for(let n=e.length;n--;)if(e[n]!==t[n])return!1;return!0}return!1};function g(e){if(null==e)return{};{const t={},n=e;return Object.keys(e).forEach(e=>{A(n[e])?t[e]=g(n[e]):t[e]=n[e]}),t}}function p(e,t){const n=g(e);if(t){const e=t;Object.getOwnPropertyNames(e).forEach(t=>{A(e[t])?A(n[t])?n[t]=p(n[t],e[t]):n[t]=g(e[t]):n[t]=e[t]})}return n}const m=(e,t="",n=!1,o=!0)=>n&&0===e?"":e<10&&o?"0".concat(e).concat(t):"".concat(e).concat(t),d=(e,t="-")=>{let n=Math.round(e),o="";"number"!==typeof e||isNaN(e)||e===1/0?n=0:n<0&&(n=-n,o=t);const r=Math.floor(n/86400),a=86400*r,s=Math.floor((n-a)/3600),c=a+3600*s,i=Math.floor((n-c)/60),l=n-c-60*i;return o+m(r,".",!0,!1)+m(s,":",0===r)+m(i,":",!1)+m(l)},B=e=>{const t=e instanceof Date&&!isNaN(e.getTime());let n=0,o=0,r=0;return t&&null!=e&&(n=t?e.getHours():0,o=t?e.getMinutes():0,r=t?e.getSeconds():0),m(n,":",!1)+m(o,":",!1)+m(r)},y=(e,t)=>{let n=null;return{start:()=>{n||(n=setInterval(e,1e3*t))},stop:()=>{n&&(clearInterval(n),n=null)}}}},"./src/replay/components/controls/ExitButton/ExitButton.js":function(e,t,n){"use strict";var o=n("./node_modules/react/index.js"),r=n("./src/replay/components/generic/Button/Button.js"),a=n("./src/replay/components/common.js");class s extends o.Component{render(){const e=this.props,t=e.content,n=e.label,a=e.classNamePrefix,s=e.onClick;return s?o.createElement(r.a,{classNamePrefix:a,className:"exit-button",label:n,onClick:s,content:t}):null}}var c,i,l;c=s,i="defaultProps",l={classNamePrefix:a.a},i in c?Object.defineProperty(c,i,{value:l,enumerable:!0,configurable:!0,writable:!0}):c[i]=l,s.displayName="ExitButton",t.a=s,s.__docgenInfo={description:"",methods:[],displayName:"ExitButton",props:{classNamePrefix:{defaultValue:{value:"defaultClassNamePrefix",computed:!0},required:!1},content:{required:!0,flowType:{name:"ReactNode",raw:"React.Node"},description:"The graphics or similar for the button."},onClick:{required:!0,flowType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback invoked when the button is clicked."}}}},"./src/replay/components/controls/ExitButton/ExitButton.mdx":function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return u}));var o=n("./node_modules/react/index.js"),r=n.n(o),a=n("./node_modules/@mdx-js/tag/dist/index.js"),s=n("./node_modules/docz/dist/index.m.js"),c=n("./src/replay/components/controls/ExitButton/ExitButton.js"),i=n("./node_modules/react-feather/dist/icons/x-circle.js"),l=n("./src/replay/docs/mdx-helpers/SimpleTable.js");n("./src/replay/replay-default.css");function A(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}class u extends r.a.Component{constructor(e){super(e),this.layout=null}render(){const e=this.props,t=e.components,n=A(e,["components"]);return r.a.createElement(a.MDXTag,{name:"wrapper",components:t},r.a.createElement(a.MDXTag,{name:"h1",components:t,props:{id:"exitbutton"}},"ExitButton"),r.a.createElement(a.MDXTag,{name:"p",components:t},"Standalone overlay button for closing the player."),r.a.createElement(a.MDXTag,{name:"h2",components:t,props:{id:"summary"}},"Summary"),r.a.createElement(a.MDXTag,{name:"p",components:t},"Intended to be placed in one of the upper corners of the player. Is used in the default player for providing a way to shut down the player."),r.a.createElement(a.MDXTag,{name:"h2",components:t,props:{id:"example"}},"Example"),r.a.createElement(s.Playground,{__codesandbox:"N4IgZglgNgpgziAXKCA7AJjAHgOgBYAuAtlEqAMYD2qBMNSIAPOhAG4AEE6AvADogAnSpQL8AfIwD0LVmJABfADQg0mXACsEyEFRp0CDSQCojvVO3YAVPBDjsAwpUwBlAIYYARpSzs8rux4wdOyuAK4ElESuBBDkrlBQAJ7sAOZ0MALRMOjsoXBoKWYWAAZUmHDu6F5YGcU47ACSYOyJlKEA5AIw7OShAhBtdniUAO7sBH4Evq4ADjPp6IotbT3uRT14MOQA1uxtU20C7OiU5EMZMIi-BAQzcIiSkikQE6EeOFREkqiUrGiJkjK8Eq1QyZnWTWWoXY2Hm_To5G67mScAIAlCKRSsDsIxeeHGNjsFU83iWM1g_m6mVsSPMtjgoRg62oqTxb3qiAAlGYjJIzBAiDNKAIpgAlGCuchTMBCIjsToSqXtADc_MFwrFioIABEAPIAWXYMsi8q6koIAFoTkQVWqhSKHJEhah9EbZfKcJJsK5BbBbagzOLzXr9TguhgMgAKdbMNhidYWRh4ADMYkc6pdNE46pF2XYuImPScwJJNQEiCkKfj5gs7EYMzEkYaUyiyRdedc6BYMWo8XYMyEd3GlFSMCmL3Y4cw_VQKXzMASnKkDYTdfTztdkmriekccUZhOvSI-hwaQIAFFYMeaAAhRINdCRzrCAjtbmoTnKhTKb2-mA4TQyB0ahaHoRAVBzKZzywF4b3CCJzGNOV2k9OABHISQunJVwAU-DcaDgQEQKEKBCOg2D4OoSRyIIOCbmof0BXtKZgHYAANewIHQ2B2HkN0TQVc0LTACUJgyRjIPYZwmNgSxXA8HikI9SQ0IwrCoBw6RTkIoh0CwC1NigOFCOkv85IUmAJOY5TVMwmBsIBdScKtGAwDCKACA-OA4CsjV2CDKV-OQs0lTtPzWM0Hw-KU9oAAEYCIEQBlQIiunacFUF0VFjlOAAvZwCESbF2G4dhgHWKIBGeVArnaAAGdhkxmLB2n3GsZk7FhZ1qgAWZr2AANma1r1jAECADEfWgRJav4ZxDkRR1MHYAAFIR-CWRKfjgDrERGmsxpoaTcsudgAEYera-QMqyqYAEE5hK9hI1Y8gbCgdBw14zkSrEZ6YxkdhUSKmBuGAQ98sK7F5G3WtgDe6BPuCAAyZHxkSeZKGaBGPq-7h8flMBQkyntUHadgAH4NkR8NIx-q4caR1BrprKQZGrd8zFhPzMDc0IPOen7uD-6NWYelca0TALPPGzIUmvAhYdrOsZFXZXgdgMHysl5Xaw8SVthSIRifQRwoGFWqjZw_bdd1zYIBSQharOgAmOrhra23laFfJSdqroNJiVhLM9r35BZ22ld1xgaLohC1d13RQIIMHGA4rjyB4rcI69ixqHsKBYm2MG6d-otUDgShYBwc2UifGiekLnZshwN8c9trcE7ZuNVykaWcFl1x5f0WGpHFjmzG_EBbKc3CnWofRCKTkiyJg2jKJS2ON4ArQKBA_RDEkdhYrAc2RjCh0jBCOxpaC00tV8h045ZGKcE9N-nnSfoMOflLf8flixxXLuQIAXfwcAAByPoYBrVchAKKd8ULv09J8LaAD0bzDKo6IgW01qUCHNFd0SDJAf1QQxVUAYaAY26HgocpV0y4MHHYNG2sLDGCvtYboVsZg2DOHsI4-QiDQFcEcMaRwxLsA8NvdgvJ1hJ30FcfuEDiyh3YQ4eIUB9Y7E4KgVglBth5hGJscwEipH0TpHYTORcW4yL5DWfOTdthXFLsLdgeiuBmHkBQswt1G7gKgceJ67RsAvAtGYhC_ofEaW8uwLe5iYRYFAugG-WocDrgXjQRgtC4B_VYUDAg0RYhAL5h5bJT08kWEzv46BsDIBYCuLzEBYDvIBJgV0Op6wvEZQsFOKMP0Knl2yq9feNAlgaUCFAJYVSWk1PafApYDii68SehMWwOABz4LgBQ5WEBmiRkWTsfpCcugED6OYUWudGC_wTsraZkDZlwKwGDO5rTanwPbl7F50DnnRPuceD5ttxkLjBkCqAALdYHOLsASF4LbkjJTvDeFsL2Cdx1hYT8q4-ILjgN0AZPSxxnPYKgfmUBtm1hzizFmZg4kIRwCwHaGlEitKCTS8hXMsDWUafzKCa9f4UKnjPeyjKtJnEkLpfShljKSFMuSGA5lq6AW0PIsCIBHjH1PqMC-Uwr7-H8lqRBIVXzeKoZgsppU8lCBGHACmVw7oCEyIkRgrEADaqIZwpAALpXDdQUXi1YumUN8QUiyBUQZ2HNesDqXYChXDqqHYNsAAAyOF9i1TCBEG2kjvDOD8CcEYtUGqFvOv1AAxPYc82oeranPJmrwAhpzOF2jG9gcb1h1unGbC28oraJFrcKDtVcNJ3FOu0KgCRZg4r7fWjIobYC1RsF2OgU7pyik7BAPIvUPbMmDgIDVIwACa86uCYDJqHQ6BBjojoulumsY6u3tBLWdZMZ0BpnXGpm3E6AJjOzqnVAApJm-lDlaoJssp441QbNidlnfAcpciq73pLQAdm1AADgAJzofsLWg2Rs2gYFqiW8855xpvoAKyZtoIku6hcUg1XlLAMAr4z0gUvc7PqLVQ7tpnU27qLauP9oyGbIdOLapjpE2B5mEHqDZTRDB8NZVmTToEI2yUzbW01m4wIYTE6R3id0-lKTN0ZNTAIOgeTcH2qdWbe0N2N6LA7piHEKANGHb0faBEGYhmA0-JM-MdAzZ4ixAsxGmsb8cBmfkyxo6UMR0vCC-QTN-C1OFVjTgMj4HjMV1M6bYsIXFNhbfpF2LcBosEEmkIpIs0QDzT6ItRwy08EbS2pQHakoQ7rCMS8GAqnES1R-CMTIXnMuBr87MckiR8vKqmK4vJuznrTZKgTdob4CvKxOYSszgWm7ybJVi0iuLVwbYECY3LLgSt7ZG757LRphRRFAfCp6i3ZvrHm5GZ7y3VsDOO-YdoPwXT-gsPtnFa3aw_fLsnS7RnRs3ZlbJeSPFSovUnKMOw8grjZKFrk-DN2DGJBvJSJ6lq7BU2JzgKIMxIyWrLpGXUHh1BbE8qweIjI4BU9GJyK4yJOQAUoGgJ8Fo3w8_UHz1AAvVu1UB5wPZxP2CoxR1amudAUgTCOTrXxUHpwKbpwzqUOA8ds-J86uqHqMU63Bxc6OoH8kgzBqB-TMMbl1jEp2G3mtgAu_MyVx3aKrcCNi3blT3uo652AJrjIcByezEjOHo4rjLe52VowQseOwbtFj4L9gABqXwEppx8Q1qDD3Xuw0-8T17MPeeMjIttlICYIevack5DXuskg0QN53J7jvzuvDoESN3iwwAycU8jOzkYSwIBY_-r72vaJ2Cp-AHjgnIOc_tAtJazPOeIAF4Dx7oPpeB-62ALT-njOcDM6gKzsfnOQioESDzkfkYL-MiWOoKfCfy-1mTzkBfS_Cer4tERASE304Gz3lBAPUB31t2AHGySHkyfxZxgGb0P1DzEXu0cD0BoAQMvyQJb1rzb3QBQNrCbzwNb3byd3RWbydzr1737y7jbwRxgCjjNyByuxdA5R5mAW5SkhkjlUYP5SUGnnQjsgchEMZRchKU8jOF3mAkwIMHAjYRMCUOUJUNULUPUNkXMGMHYG1HgDcxUm2DQBCDo1aycyLC6Dd1g00PYQ0NsLsOULsTMFiiYj8lHXnkzAIEIgcgyEkBWkZQyAAFUGgMCCk0AfC_CcJAjgiQJXAwiBAvIfIKFnDJI3CMxF5P4XRv5pUFxGdhRsjYApRhQEj_RkjrJUj8JPCMiMhYhpVC5pxaiuAMhiikiXCHRyiMlKi0hMiajf5JBf5miMpSjXC8IOil5iIq5CIAA1KuUIY8SQaYy_Y8AY1AIYtokYjwsYmgFeSQEIleAnAQHY8Y0ifY5Y1YqYdojYoiLYiYyQSwAUBcMIhoVANAwpKiO448QuF0J4l40mU41o849Y9I5eG4iIxILRbYfUagF4PI0E8EyE1AaE-I6Qko_4-UQEgiSQbwg4yYxoygAqM0Y8bE3E_EiUQk5Y9YGw-wzQlFK-XQyQoGQw8wawqkpQxwlY1E9oLlDyC0LE6QLg7kuARkyQVQbAZYgVYQ2eIiNIjEro6on-DePo7eRVPeOQw-dVM-LVGRa-PVc0A1B-ChVE1iQqTBBhagAAcS_liGySWDPAAGkYAwTKARFzNhgRRehaJzZm4BAlg8BEhPoshmk_lYNCEBIP5SFIg0FjVjSaEmEnpTTUALTujyAykWF1hQUbV8l3VQ5psMylEVFmRUAC4i4MyXE_p3F0A2DfF9YcVAzmVSp2hwk2VMo_McUCjQFflYNSo7lOy_puzI9GzUAINfl2Bf4EkkkUlzQ0l3D9AskmFscaxURClyBikQEzVQcLA8gYA6SmlfkAlm00RGROljULA_AMBYAiztEkcp9VlI8Nk7gcBIU5c0Ybz1kmEHzCzHE6ZjzpgzyYB7TEhtRRhzBSo7SHSvBnSc0NR3SbxPSDEBBIxnV2hzw9ABBWp5R5RTdvzTz0BYB_yAiZgnpIw8dwL61zxg4aArh_ySL0AyL9Ap8Bk3tiKnTSLyLPI8clt6zkLaBUL2AAAfXi-fMC5imi1i_XB0ji9Cr7BOJi502imgV8mAVi7c7lL8hOF87C88z8lg8lI87pScOgacUuAZXxViUFKZXc6Bcy6pY8N5LAKy7yeAKZR7dHVaWM0qF8u8rZVcXxL5Y8BTX0_02gWs6BNnPFPxBy0rBOVsxnQMxyhOXy-AK4Z1asmAYK48eyoMj1UOW5CymyuZLATFT8FFI-KRRGNK-ASMTc5SjyNKgoDK15fK-qyyyRSkcq7S_FU5E7afWvVWGfcYF4d3UFZFSFO3QkfASoTSouYa1Af8wCkYVAUatZDSv8h0ua5mJ3agPCmYRayPZara5FBKn5ay-AZFEiUGfgAc_gJ3YNJ4tQMGOqMvL2WMDgG6iMJ5YAC0M6GGRFOQ-QbuWQeg9mVcbSylDKbmB0LkqYPlSeQQwVUQ9EyoshVAHeICabQ-E-DUyhaMhwDshTF1H1WcL1SmAmucHzdg6ybG-MxMuUtcvJPsjMimWKyK29XKtpR5DMkm7M1mjmtEAoNg8G0zahbBRhTZSzSpVm2ynmrMtM-SBcKWvm6HdlCmoWh8J6EmviolWYwIAQKMoWxwftNALIPG9gepTWogbWpYGaM2i2_MLgb9a2jIH0mAB2J2B2o4MmgWwZKYSG8q2yoJWeQXY1T2omEmZKfsfK8qtnAcR5K4CmTm9gcLVAEK21e1HCRgOO3m2cMQG_dWumls9wF4CAE6dAP20qaOupJbTWhISmeUcmK4cu-BMlHy1mu1B1J6Z1D1MlMRZ6WAccJ6OqZUUAxgIlEKpXWcCYQeiALPLPNXZWNVc8ERJIPYGYGIIRCoP2dgcaYUdgc2fBTgOwRKCw1yESKUNgboCYdwdgCnSQSADyJot-VcN7JOvy51CAU3dc2sBK1unCdZPIPASMYkQu4uv2nPZ--AV-zCzFTpdYcHL-1OxIXnfncmN8ChKlFKIwYO4mU-lkUqj6SOyqnFaq9s6y5tCmLwKuCUVAMkfK2O-OxO5O9gb-x1DO91bO71TOucC1AlLqqq_k4hmZIRWcGuhurAfBkRpYehvy-mEel-k3PigSlbVBzQ67bKWwOksInIUqbrOUVxbRoOjgh0EO7B8wAKzIIK1m0KuRXG0OaKqUJmrm465m8W462yzxK4Om3G2O-x9YWx_hnFe4HG8BHs4mjhjWimJh9OkmsQBxgR-ADMiJlhgoaJqxlx_K-W2cTxG_RJoRubPZPsp8oGHIux3G2ez-lsop2gU2XGtWippm97EpslCwN7JhnAWwJhgBip7IJmpvD-jqwlXxrp3GnAW-7iyMNRuBF0dAYXUXJ8eUdq5ZbFQ7X3cHAZqpoJrynWClGEA7aXBbCx0pvprqkR_BhK2yiRt-BKuAEGzxMGgx6ULB0mUcWifDLqFIOSh7A2pO2gNnRSggLnO_JYHIhWDMgACUsH1ETUvASjoquH1vrUNu-dBzVW1F2UgF6AFgiCLGWhvNtsLB9UCmNN9SMNcHYAAClnALR8FV6-wRgf6pInNGS5xMXkRbtxFNgYRRKcdsprRxRAokcgXXR-KOWpC-hwwCA5IqoxweczwbwXmCgiz9BeWCBVKaxe6xzMgpRsh3myU3tfmIs2g3pYN5c9WIhQhDXI9YBx78Q_o6oDn1XzQtXWKnoTWDXNg4BjdO7OltmQddXWApDTy0h0BLBXWjW0Y9W3p3BA3g2zW3Wx6VdrWW07XsA0QHWRLXRSpw2A3sho3zWPW9tvWlnlZk2NXKn3nnW_WodDnzABlTb9Rog8Ao8sBIw412A62Jhyd-di3U33n1kh4YA2J2ALQcoiAlWlcmMlgeWz9P1VdORsqWgrg22G2ogm2W3F2O2xcu3NW035KOo0h91B3h3R3PMJ3IhR37ZHYCAm853p28AGlT2p27a8A53z3XbJ29cX3RAawA00HMHQ6WRQLHSILXSCBoLYKowDdg2bwYAYLTgDF0AU6HVGAomb8qLhKy3XFyzQcLcZKWKFF2BUPZLWL6LH69kIPKAoOYPm50BWm3rdQwAiKhLCOTw8cfoxBSpbXenBLAPcOd2uglK-GVXbYcPt3PJUR8FaEh5Xixd5mKVUHbnrJfE1HUWLgswkdXB_nEglgPANPiOaw3sSX8ZSoPA7Xwc3IDtK3dnIwSW0BFzMoYAsYdCsgCmPAdFbPEQHPtQnP5dXBTwxx3iYAXECZ3gzx_O6YTPuHEJ4gcULPwcABCSMCBLWpo2wKBCBKzn6eXRL825L-5NL4zs3D2u5r2_enXRnQiygenWO4AeQKfCr9QdgWL0qYlau-XOrj4EzdEQouPAmar9r7LTriIHW-TvyRTuAHNDRUYc8AAR1CD7DU4060506uHIYpGAvnKab2QM6C_C86pMXRBgHzcWcs9sFK6lHS4KZO9PzO_y4_t8QNzuielO7YodLZ1cHmbu5e5vEe6u-e8SDZ2M8acs_u7jcLEa9KgNxvBB7wDtaraNCi4O6gfVz8xYDABEjFbukcGJhmy47gDumGegFGfYt0bgBRdR5U-VdcGdTxyyskSp4dNNx50tfjcB7exR7R_0Ax_wymBtZh_0t27h_M8R_Wwi5x8h5GfA_EuJ9J_Z6wI8Dp8SBp8p-p6byh4koHq9aO-afgdadx_gfO_lxabab1-M4KZ86Z8LEM8kSh7te7sjDVYgCejN-Vwns4AtAtEHt5_04gYa6C4gZ-lM_h8B4-XBwPIR6_YLY_rVWUU4BPScz7BgBm6C0KiOxF7M-i-gcVvJr8iMcecwHsgLgXn2Uq8pmq5v2q9Bzezq8rua6gB28JWq8O52eMr80zgXnKQDThRu2FAdkNqgCejq8B6e7Er-6L7f2GeFAXregY-SBe19ze0u912Ve7-qniHl4Z84_FoXjX6ejz5mAL5dH2X6BX6gDX_maBwj7Cs35dG39KmX977X8B9YM2fmdgfNhdChx_aK5z7Dt-AyH6EwEjApUquSgPYDun_6JUS-NXK4E91Bw-V8EM_IBPnzf4BcUq2lSvmAMaJXNbufmZNnQHyDUB3GfEW_hgPKCD01UkFfmDkECC5BUALoREN5BESJBYuq4IfmeF1DzVaEGQQqK0jZyRhcBFcZKIQJV5iJJ-_9Inut11jz84AT3PgYkjwHJRT-vPDbs9AX6M53s8AxQRvzKYzBEgN_UAX_0aLqCdBa_QFnIIEHUBT-j_clBfwoJFhjB1PHfkED37IDZBoEfAagEsFO5wUwOQtp8g0EOCM2Zg9wQ_wTgfIauMXEXlQB0FydKEntXxD8X87pIPChFV7HoDSDlg3aNjeyCImiBdp1a9ZTNAlBXr3gwAAALQyCUBluwgVbk9DT4wBQ4UaKoRQ0vruV9uZgXTrDyKGFQmg5QoQBdzSEZA1eNdFbOwCuBoBaA6QusOdAajy4o0NdYoHVAAAkwAcYTAHSHyBlhOKDqGY2FDyBigow9gMUGWGrD1hmw7ITsIEB7DUG-jBTn5gSH3FCKOKXQMkiuDEpsu3pIlGsMKTBw62AgJxJmV9T1lBcHQnemOBRwmw8wpUNdsbAwAdNnhVzMlPb0yiX5MA6ACBF8KDgwBfhuwAoTqz2TRkHOTw6gMkh971k3h2tcmEKxS6uA0uRIjAFgKFZ0iSRlvb4mgBeD34P6MI1Ef3Ub4-sZcLzPMMPQ47fYBRmjQdlyOyAs9kRoQVEeiJSDfCsRIiHEZ8PlGYjsRFnXxOgBwgKY12GqYUOzghE5Aj4qGAaD1F_TaVNR2op4s4C2DEiFMWov7lqRNFmj1et6PzMMD6A6j62wzXevBQNERgcgQ7B0XAGtG2j6RP0I-MmAGjmim67ow4LjwwCec_uoY-ETvytGoAbRqYnPB6IEB2Ar4UY39LGJuyCNwgnZVtt6L1F-iJRgY3wPGLuiJj0xmYu0RGMGi2six2UJ4QpmrEHscxCY9AEmJDEZiwxJIodiWMRZXxoxZKC3I_WlGyiMRZ9bEdnlXD3DjwSQ_QJGGDFLAUIaFUPksDqE_Qs8y4u7NEESHTksCvYrcYgDQrBi1eB4o8QIHuynjpSyrMcY5XlBXi9x8PO8TrBXGpUzxyrTse-HRTXDhuDoeIcePbKwd_OhFLUbQFjqedaAII0bpMSCz9inOpUWCd0Bs4FI7OHnLzmjFi7Ui0umE3zuK3uJhdERYI3sTyLTJgjXxCmV0RYDVZMiGJeIlQXABQl1EEJ3QeXJhJ95V1a-kfI-NJASDJBboA3VlkaDPgCSNgWwbYDgFXDUStGHE1CdxJrokSzwILeMaXFjSA96JT0WwJxK4BqSqYGkscPqDQCli2c0jRibWBYkGSVJXEpzqZKyCkSmx9InSS2giH88P8v4tceePjGXi0K-4sAn5P_GRh6JQUz8QdgPGstHx9xfyQBOHFXN1gBXG4SNz8xngni3FC_KKGJiZFCKx4CYE4GcRT5yyE-FChfnckvC3aIIpETlPiANBtQsdbKRkAvxNSnoNfKcSLwGSLkRQpUsuGFTeyETKpjU7UEoJ0QNSoAHU0qDigICtSBAF-CKWOGGCLBJpbU-INVLzHTCYxoQzFHOzE4zABps_W2PP1GnTTxpWgzOBKAEALSlpqwxaWNLP61gHp7U7UJ1JJRWCwhulaHFPF2jbA-2O8agKjXhQMA8k_AMBvwCuD8AgQxIKoN4AyAWhfwsqDaOsH4A7p3BUM9gPwDqg4BcZdUVGTWH4DlByA_QFeslCxn8AHugiWVAkh9C0zMA5ISgIkDzB5BfUhqQAsWDhmggBAhMiwPwCiBoBKZKgN6jvD5nYyQAjMgygiAgDwAsZAyfgIamFkAA9F9DgCfTqzxZ_MwQFqGEiiRNgvMpABLOVkuw8ZOAVDFrIlkczrQKstWRrLOhXUv2niAVCCG8B9dIAKQIGagBBmqlwI5UEALQF9BZAoZMMs0LQHXy6zxs_AeQAoHDhAA",__position:0,__code:"<div\n  style={{ backgroundColor: 'gray', height: '120px', position: 'relative' }}\n>\n  <ExitButton\n    content={<XCircle />}\n    onClick={() => console.log('Exit clicked.')}\n  />\n</div>",__scope:{props:this?this.props:n,ExitButton:c.a,XCircle:i.a,SimpleTable:l.a}},r.a.createElement("div",{style:{backgroundColor:"gray",height:"120px",position:"relative"}},r.a.createElement(c.a,{content:r.a.createElement(i.a,null),onClick:()=>console.log("Exit clicked.")}))),r.a.createElement(a.MDXTag,{name:"h2",components:t,props:{id:"props"}},"Props"),r.a.createElement(s.PropsTable,{of:c.a}),r.a.createElement(a.MDXTag,{name:"h2",components:t,props:{id:"component-dom-with-class-names"}},"Component DOM with class names"),r.a.createElement(a.MDXTag,{name:"p",components:t},"Please read the ",r.a.createElement(a.MDXTag,{name:"a",components:t,parentName:"p",props:{href:"/custom-replay/skins-styles"}},"general principles")," for Replay class names and styling."),r.a.createElement(l.a,{rows:[{Element:"div","Class name":"exit-button","Generic class name":"button",States:"",Parent:""},{Element:"div","Class name":"","Generic class name":"",States:"",Parent:".exit-button"}]}))}}u.__docgenInfo={description:"",methods:[],displayName:"MDXContent"}},"./src/replay/components/generic/Button/Button.js":function(e,t,n){"use strict";var o=n("./node_modules/react/index.js"),r=n("./src/replay/components/common.js");function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const s=e=>e.button;class c extends o.Component{constructor(...e){super(...e),a(this,"handleClick",()=>this.props.onClick&&this.props.onClick()),a(this,"handleKeyDown",Object(r.f)(["Enter"," "])),a(this,"handleKeyUp",e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this.handleClick())})}render(){const e=this.props,t=e.label,n=e.className,a=e.classNamePrefix,c=e.classes,i=e.content,l=Object(r.g)({classes:c,selectClasses:s,classNames:["button",n],classNamePrefix:a});return o.createElement("div",{title:t,onClick:this.handleClick,onKeyDown:this.handleKeyDown,onKeyUp:this.handleKeyUp,className:l,role:"button",tabIndex:0},o.createElement("div",{tabIndex:-1},i))}}a(c,"defaultProps",{useDefaultClassNaming:!0}),t.a=c,c.__docgenInfo={description:"",methods:[{name:"handleClick",docblock:null,modifiers:[],params:[],returns:null},{name:"handleKeyUp",docblock:null,modifiers:[],params:[{name:"keyboardEvent",type:{name:"KeyboardEvent",alias:"KeyboardEvent"}}],returns:null}],displayName:"Button",props:{useDefaultClassNaming:{defaultValue:{value:"true",computed:!1},required:!1},label:{required:!1,flowType:{name:"string"},description:""},content:{required:!1,flowType:{name:"ReactNode",raw:"React.Node"},description:""},onClick:{required:!1,flowType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}}},"./src/replay/docs/mdx-helpers/SimpleTable.js":function(e,t,n){"use strict";var o=n("./node_modules/react/index.js");function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const c={padding:0,tableLayout:"auto",boxShadow:"0 0 0 1px #CED4DE",borderSpacing:0,borderColor:"gray",borderCollapse:"collapse",borderStyle:"hidden",borderRadius:"4px",overflowY:"hidden",fontSize:"14px",color:"#13161F",width:"100%",display:"table"},i={color:"#7D899C",background:"#EEF1F5",textAlign:"left",fontSize:"14px",borderSpacing:0,borderCollapse:"collapse"},l={orderSpacing:0,borderCollapse:"collapse"},A={padding:"20px",verticalAlign:"top"},u=a({},A,{fontStyle:"italic",opacity:.5}),g=a({},A,{fontFamily:'"Source Code Pro",monospace',whiteSpace:"nowrap"}),p=({rows:e})=>{const t=e?e.map(e=>Object.values(e).join("-")).join("-"):"";if(e&&e.length){const n=Object.keys(e[0]);return o.createElement("table",{style:c},o.createElement("thead",{style:i},o.createElement("tr",{style:l},n.map(e=>o.createElement("th",{key:"header-"+e,style:A},e)))),o.createElement("tbody",null,e.map((e,n)=>o.createElement("tr",{key:t+"-row-"+n,style:l},Object.values(e).map((e,r)=>{return o.createElement("td",{key:t+"-cell-"+n+"-"+r,style:(a=e,""===a?u:g)},(e=>""===e?"none":e)(e));var a})))))}};t.a=p,p.__docgenInfo={description:"",methods:[],displayName:"SimpleTable",props:{rows:{required:!1,flowType:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ [string]: string }",signature:{properties:[{key:{name:"string"},value:{name:"string",required:!0}}]}}],raw:"Array<{ [string]: string }>"},description:""}}}},"./src/replay/replay-default.css":function(e,t,n){}}]);
//# sourceMappingURL=components-controls-exit-button-exit-button.37d2082b81987473d2f9.js.map