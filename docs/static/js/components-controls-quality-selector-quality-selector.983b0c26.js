(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"./src/replay/components/common.js":function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"k",(function(){return r})),n.d(t,"g",(function(){return s})),n.d(t,"d",(function(){return i})),n.d(t,"f",(function(){return l})),n.d(t,"h",(function(){return c})),n.d(t,"i",(function(){return m})),n.d(t,"j",(function(){return u})),n.d(t,"c",(function(){return h})),n.d(t,"b",(function(){return f})),n.d(t,"e",(function(){return b}));const a="replay-";function r(e,...t){const n=null==e?"":e,a=[];for(let r=0;r<t.length;r++)t[r]&&a.push(n+t[r]);return a.join(" ")}const o=e=>e;function s({classes:e,selectClasses:t,classNames:n,classNamePrefix:a}){if(e&&t){const n=t(e);return Array.isArray(n)?n.filter(o).join(" "):n}if(n)return r(a,...n)}function i(e,t){const n=(t||e.currentTarget).getBoundingClientRect();let a;return a=e.touches&&e.touches.length>0?e.touches[0]:e.changedTouches&&e.changedTouches.length>0?e.changedTouches[0]:e,{x:Math.max(0,Math.min(a.pageX-n.left,n.width)),y:Math.max(0,Math.min(a.pageY-n.top,n.height)),width:n.width,height:n.height}}function l(e){return t=>{e.indexOf(t.key)>=0&&(t.preventDefault(),t.stopPropagation())}}const c=(e,t)=>e!==t&&(!(e instanceof Date&&t instanceof Date&&e.getTime()===t.getTime())&&!(Number.isNaN(e)&&Number.isNaN(t))),p=e=>null!=e&&e.constructor==={}.constructor,m=(e,t)=>{if(e===t)return!0;if(p(e)&&p(t)){const n=Object.keys(e),a=Object.keys(t);return n.length===a.length&&(!(n.filter(n=>c(e[n],t[n])).length>0)&&0===a.filter(n=>c(t[n],e[n])).length)}if(Array.isArray(e)&&Array.isArray(t)&&e.length===t.length){for(let n=e.length;n--;)if(e[n]!==t[n])return!1;return!0}return!1};function d(e){if(null==e)return{};{const t={},n=e;return Object.keys(e).forEach(e=>{p(n[e])?t[e]=d(n[e]):t[e]=n[e]}),t}}function u(e,t){const n=d(e);if(t){const e=t;Object.getOwnPropertyNames(e).forEach(t=>{p(e[t])?p(n[t])?n[t]=u(n[t],e[t]):n[t]=d(e[t]):n[t]=e[t]})}return n}const g=(e,t="",n=!1,a=!0)=>n&&0===e?"":e<10&&a?"0".concat(e).concat(t):"".concat(e).concat(t),h=(e,t="-")=>{let n=Math.round(e),a="";"number"!==typeof e||isNaN(e)||e===1/0?n=0:n<0&&(n=-n,a=t);const r=Math.floor(n/86400),o=86400*r,s=Math.floor((n-o)/3600),i=o+3600*s,l=Math.floor((n-i)/60),c=n-i-60*l;return a+g(r,".",!0,!1)+g(s,":",0===r)+g(l,":",!1)+g(c)},f=e=>{const t=e instanceof Date&&!isNaN(e.getTime());let n=0,a=0,r=0;return t&&null!=e&&(n=t?e.getHours():0,a=t?e.getMinutes():0,r=t?e.getSeconds():0),g(n,":",!1)+g(a,":",!1)+g(r)},b=(e,t)=>{let n=null;return{start:()=>{n||(n=setInterval(e,1e3*t))},stop:()=>{n&&(clearInterval(n),n=null)}}}},"./src/replay/components/controls/QualitySelector/QualitySelector.js":function(e,t,n){"use strict";var a=n("./node_modules/react/index.js"),r=n("./src/replay/components/generic/Selector/Selector.js"),o=n("./src/replay/components/common.js");function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class i extends a.Component{constructor(...e){super(...e),s(this,"handleSelect",e=>{this.props.setProperties&&("fix-bitrate"===this.props.selectionStrategy?this.props.setProperties({bitrateFix:e}):this.props.setProperties({bitrateCap:e}))}),s(this,"bitrateToItem",e=>({id:e,label:e===1/0?this.props.autoLabel:this.props.formatBitrateLabel(e,e===this.props.currentBitrate),data:e})),s(this,"isSelected",(e,t,n)=>{const a=this.props,r=a.bitrateFix,o=a.bitrateCap,s=a.selectionStrategy,i=null!=r&&null!=o?"fix-bitrate"===s?r:o:r||o;return"min"===i?1===t:"max"===i?t===n.length-1:e===i})}render(){const e=this.props,t=e.bitrates,n=e.label,o=e.toggleContent,s=e.classNamePrefix;if(Array.isArray(t)&&t.length>1){const e=[1/0].concat(t),i=e.filter(this.isSelected)[0]||e[0];return a.createElement(r.a,{items:e,itemMapper:this.bitrateToItem,classNamePrefix:s,className:"quality-selector",selectedItem:i,label:n,onSelect:this.handleSelect,reverseOrder:!0,expandedToggleContent:o,collapsedToggleContent:o})}return null}}s(i,"defaultProps",{classNamePrefix:o.a,selectionStrategy:"cap-bitrate"}),s(i,"streamStateKeysForObservation",["bitrates","currentBitrate","bitrateFix","bitrateCap"]),i.displayName="QualitySelector",t.a=i,i.__docgenInfo={description:"",methods:[{name:"handleSelect",docblock:null,modifiers:[],params:[{name:"bitrate",type:{name:"number"}}],returns:null},{name:"bitrateToItem",docblock:null,modifiers:[],params:[{name:"bitrate",type:{name:"number"}}],returns:null},{name:"isSelected",docblock:null,modifiers:[],params:[{name:"bitrate",type:{name:"number"}},{name:"index",type:{name:"number"}},{name:"arr",type:{name:"Array",elements:[{name:"number"}],raw:"Array<number>",alias:"Array"}}],returns:null}],displayName:"QualitySelector",props:{classNamePrefix:{defaultValue:{value:"defaultClassNamePrefix",computed:!0},required:!1},selectionStrategy:{defaultValue:{value:"'cap-bitrate'",computed:!1},required:!1,flowType:{name:"union",raw:"'cap-bitrate' | 'fix-bitrate'",elements:[{name:"literal",value:"'cap-bitrate'"},{name:"literal",value:"'fix-bitrate'"}]},description:"Configures whether the selector should specify bitrate cap or fixing."},bitrates:{required:!1,flowType:{name:"Array",elements:[{name:"number"}],raw:"Array<number>"},description:"\u21d8\ufe0e The list of bitrates available for adaptive selection, and for being fixed or set as cap level."},currentBitrate:{required:!1,flowType:{name:"number"},description:"\u21d8\ufe0e The currently playing bitrate."},bitrateFix:{required:!1,flowType:{name:"number",nullable:!0},description:"\u21d8\ufe0e If playback is (already) fixed to one bitrate, this prop is set."},bitrateCap:{required:!1,flowType:{name:"number",nullable:!0},description:"\u21d8\ufe0e If adaptive bitrate selection is (already) capped at a level, this prop is set."},toggleContent:{required:!0,flowType:{name:"ReactNode",raw:"React.Node"},description:"The content of the toggle button of the selector."},setProperties:{required:!1,flowType:{name:"signature",type:"function",raw:"({ bitrateFix: ?number } | { bitrateCap: ?number }) => void",signature:{arguments:[{name:"",type:{name:"union",raw:"{ bitrateFix: ?number } | { bitrateCap: ?number }",elements:[{name:"signature",type:"object",raw:"{ bitrateFix: ?number }",signature:{properties:[{key:"bitrateFix",value:{name:"number",nullable:!0,required:!0}}]}},{name:"signature",type:"object",raw:"{ bitrateCap: ?number }",signature:{properties:[{key:"bitrateCap",value:{name:"number",nullable:!0,required:!0}}]}}]}}],return:{name:"void"}}},description:"\u21d7 When one item is clicked, this callback is invoked with an object having a property with either the name bitrateCap or bitrateFix and a value according to the selected bitrate. For the auto option, the value is Infinity."},autoLabel:{required:!0,flowType:{name:"string"},description:"The label for the selector item used for resetting capped or fixed bitrate."},formatBitrateLabel:{required:!0,flowType:{name:"signature",type:"function",raw:"(number, boolean) => string",signature:{arguments:[{name:"",type:{name:"number"}},{name:"",type:{name:"boolean"}}],return:{name:"string"}}},description:"Should return the item text to be displayed for each bitrate. The second argument indicates if the bitrate is currently playing."}}}},"./src/replay/components/controls/QualitySelector/QualitySelector.mdx":function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return u}));var a=n("./node_modules/react/index.js"),r=n.n(a),o=n("./node_modules/@mdx-js/tag/dist/index.js"),s=n("./node_modules/docz/dist/index.m.js"),i=n("./src/replay/components/controls/QualitySelector/QualitySelector.js"),l=n("./src/replay/docs/mdx-helpers/ShowCase.js"),c=n("./node_modules/react-feather/dist/icons/settings.js"),p=n("./src/replay/docs/mdx-helpers/SimpleTable.js"),m=n("./src/replay/docs/props-footnote.md");function d(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}class u extends r.a.Component{constructor(e){super(e),this.layout=null}render(){const e=this.props,t=e.components,n=d(e,["components"]);return r.a.createElement(o.MDXTag,{name:"wrapper",components:t},r.a.createElement(o.MDXTag,{name:"h1",components:t,props:{id:"qualityselector"}},"QualitySelector"),r.a.createElement(o.MDXTag,{name:"p",components:t},"Control bar widget for controlling adaptive streaming quality and strategy."),r.a.createElement(o.MDXTag,{name:"h2",components:t,props:{id:"summary"}},"Summary"),r.a.createElement(o.MDXTag,{name:"p",components:t},"The quality selector lists the stream's bitrates. It also indicates what bitrate currently playing. According to configuration, selecting one of the listed items, can either fix the bitrate selection to this bitrate, or cap the range for adaptive bitrate selection. Fixing means that the adaptive bitrate selection will be deactivated. Capping does not deactivate it, but means that no higher bitrates than the selected one will be selected adaptively. The selector displays one item for reverting to full adaptive bitrate selection without fixing or capping."),r.a.createElement(o.MDXTag,{name:"p",components:t},"The stream's available bitrates are specified in the prop ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"bitrates"),", and the currently playing or loading bitrate is specified with ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"currentBitrate"),". Bitrates are specified in kbps."),r.a.createElement(o.MDXTag,{name:"p",components:t},"The control is only rendered if there are more than one bitrate reported. The item text will be based on the bitrate numbers, but formatted with the ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"formatBitrateLabel")," callback prop."),r.a.createElement(o.MDXTag,{name:"p",components:t},"The quality selector uses the ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"<Selector />")," generic component. It can be configured through the prop ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"selectionStrategy")," into the two mentioned modes with ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"'fix-bitrate'")," or ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"'cap-bitrate''"),"."),r.a.createElement(o.MDXTag,{name:"p",components:t},"With ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"'fix-bitrate'"),", upon clicking on one selector item representing a track, it invokes ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"setProperties({ bitrateFix: value })")," where value is the bitrate of the clicked selector item. "),r.a.createElement(o.MDXTag,{name:"p",components:t},"With ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"'cap-bitrate'"),", upon clicking on one selector item representing a track, it invokes ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"setProperties({ bitrateCap: value })")," where value is the bitrate of the clicked selector item."),r.a.createElement(o.MDXTag,{name:"p",components:t},"For the selector item resetting fixed or capped bitrate, the item text must be provided in the ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"autoLabel")," prop. If this item is selected, ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"setProperties({ bitrateFix: Infinity })")," or ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"setProperties({ bitrateCap: Infinity })")," is invoked."),r.a.createElement(o.MDXTag,{name:"h2",components:t,props:{id:"example"}},"Example"),r.a.createElement(s.Playground,{__codesandbox:"undefined",__position:0,__code:"() => {\n  const bitrates = [800, 1000, 2500, 3600]\n  const formatBitrateLabel = (bitrate, isPlaying) =>\n    bitrate + ' kbps' + (isPlaying ? ' \u2022' : '')\n  return (\n    <ShowCase\n      height=\"160px\"\n      render={({ setProperties, bitrateCap }) => (\n        <QualitySelector\n          setProperties={setProperties}\n          bitrates={bitrates}\n          currentBitrate={1000}\n          bitrateCap={bitrateCap}\n          autoLabel=\"Auto quality\"\n          toggleContent={<Settings />}\n          selectionStrategy=\"cap-bitrate\"\n          formatBitrateLabel={formatBitrateLabel}\n        />\n      )}\n    />\n  )\n}",__scope:{props:this?this.props:n,QualitySelector:i.a,ShowCase:l.a,Settings:c.a,SimpleTable:p.a,Footnote:m.a}},()=>{const e=[800,1e3,2500,3600],t=(e,t)=>e+" kbps"+(t?" \u2022":"");return r.a.createElement(l.a,{height:"160px",render:({setProperties:n,bitrateCap:a})=>r.a.createElement(i.a,{setProperties:n,bitrates:e,currentBitrate:1e3,bitrateCap:a,autoLabel:"Auto quality",toggleContent:r.a.createElement(c.a,null),selectionStrategy:"cap-bitrate",formatBitrateLabel:t})})}),r.a.createElement(o.MDXTag,{name:"p",components:t},"The example doesn't show the ",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"currentBitrate")," adapting to the new setting."),r.a.createElement(o.MDXTag,{name:"h2",components:t,props:{id:"props"}},"Props"),r.a.createElement(s.PropsTable,{of:i.a}),r.a.createElement(m.a,null),r.a.createElement(o.MDXTag,{name:"h2",components:t,props:{id:"component-dom-with-class-names"}},"Component DOM with class names"),r.a.createElement(o.MDXTag,{name:"p",components:t},"Please read the ",r.a.createElement(o.MDXTag,{name:"a",components:t,parentName:"p",props:{href:"/custom-replay/skins-styles"}},"general principles")," for Replay class names and styling."),r.a.createElement(p.a,{rows:[{Element:"div","Class name":"quality-selector","Generic class name":"selector",States:"collapsed, expanded",Parent:""},{Element:"div","Class name":"selector-toggle","Generic class name":"toggle-button",States:"toggled-on, toggled-off",Parent:".quality-selector"},{Element:"div","Class name":"","Generic class name":"",States:"",Parent:".selector-toggle"},{Element:"div","Class name":"selector-items","Generic class name":"",States:"",Parent:".quality-selector"},{Element:"div (0..n)","Class name":"selector-item","Generic class name":"",States:"selected",Parent:".selector-items"},{Element:"div (0..n)","Class name":"","Generic class name":"",States:"",Parent:".selector-item"}]}))}}u.__docgenInfo={description:"",methods:[],displayName:"MDXContent"}},"./src/replay/components/generic/Selector/Selector.js":function(e,t,n){"use strict";var a=n("./node_modules/react/index.js"),r=n("./src/replay/components/common.js"),o=n("./src/replay/components/generic/ToggleButton/ToggleButton.js");function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const i=e=>e.selectorItem,l=e=>e.selectorItemSelected||e.selectorItem;class c extends a.Component{constructor(...e){super(...e),s(this,"handleRef",e=>{this.props.onRef(e,this.props.index)}),s(this,"handleClick",()=>this.props.onSelect&&this.props.onSelect(this.props.item.data)),s(this,"handleKeyDown",Object(r.f)(["Enter"," "])),s(this,"handleKeyUp",e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this.handleClick())})}render(){const e=this.props,t=e.className,n=e.classNamePrefix,o=e.classes,s=e.defaultItemClassName,c=e.item,p=e.isSelected,m=e.canReceiveFocus,d=e.selectedClassName,u=c.label,g=Object(r.g)({classes:o,classNamePrefix:n,selectClasses:p?l:i,classNames:[t,s,p?d:null]}),h=m?0:void 0;return a.createElement("div",{role:"option","aria-selected":p,className:g,ref:this.handleRef,onClick:this.handleClick,onKeyDown:this.handleKeyDown,onKeyUp:this.handleKeyUp,tabIndex:h},a.createElement("div",{tabIndex:-1},u))}}function p(e,t,n,a){const r=(t?n.slice(0).reverse():n).concat(a);for(let o=0;o<r.length;o++)if(r[o]===document.activeElement)if(e){if(o>0)for(let e=o-1;e>=0;e--){const t=r[e];if(t)return t.focus(),t}}else if(o<r.length-1)for(let e=o+1;e<r.length;e++){const t=r[e];if(t)return t.focus(),t}}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}c.__docgenInfo={description:"",methods:[{name:"handleRef",docblock:null,modifiers:[],params:[{name:"element",type:{name:"HTMLElement",nullable:!0}}],returns:null},{name:"handleClick",docblock:null,modifiers:[],params:[],returns:null},{name:"handleKeyUp",docblock:null,modifiers:[],params:[{name:"keyboardEvent",type:{name:"KeyboardEvent",alias:"KeyboardEvent"}}],returns:null}],displayName:"SelectorItem",props:{item:{required:!0,flowType:{name:"signature",type:"object",raw:"{\n  label: string,\n  id?: Id,\n  data?: any\n}",signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"id",value:{name:"Id",required:!1}},{key:"data",value:{name:"any",required:!1}}]}},description:""},index:{required:!0,flowType:{name:"number"},description:""},isSelected:{required:!0,flowType:{name:"boolean"},description:""},canReceiveFocus:{required:!0,flowType:{name:"boolean"},description:""},defaultItemClassName:{required:!0,flowType:{name:"string"},description:""},selectedClassName:{required:!0,flowType:{name:"string"},description:""},onSelect:{required:!1,flowType:{name:"signature",type:"function",raw:"any => void",signature:{arguments:[{name:"",type:{name:"any"}}],return:{name:"void"}}},description:""},onRef:{required:!0,flowType:{name:"signature",type:"function",raw:"(?HTMLElement, number) => void",signature:{arguments:[{name:"",type:{name:"HTMLElement",nullable:!0}},{name:"",type:{name:"number"}}],return:{name:"void"}}},description:""}}};const d=e=>e.selectorCollapsed||e.selector,u=e=>e.selectorExpanded||e.selector,g=e=>e.selectorItemsContainer;class h extends a.Component{constructor(e){super(e),m(this,"focusableItems",[]),m(this,"toggleElement",null),m(this,"onToggleRef",e=>{this.toggleElement=e}),m(this,"handleToggle",e=>this.setState({isExpanded:e})),m(this,"handleItemRef",(e,t)=>{this.focusableItems[t]=e}),m(this,"renderSelectorItem",(e,t)=>{const n=this.props.itemMapper(e);return a.createElement(c,{key:n.id,item:n,index:t,onSelect:this.props.onSelect,onRef:this.handleItemRef,isSelected:e===this.props.selectedItem,canReceiveFocus:this.state.isExpanded,selectedClassName:"selected",defaultItemClassName:"selector-item",className:this.props.itemClassName,classes:this.props.classes,classNamePrefix:this.props.classNamePrefix})}),m(this,"handleKeyDown",e=>{switch(e.key){case"ArrowUp":case"Up":return void e.preventDefault();case"ArrowDown":case"Down":return void(this.state.isExpanded&&e.preventDefault());default:return}}),m(this,"handleKeyUp",e=>{if(this.state.isExpanded){if("ArrowUp"!==e.key&&"Up"!==e.key||(e.preventDefault(),p(!0,this.props.reverseOrder||!1,this.focusableItems,this.toggleElement)),"ArrowDown"===e.key||"Down"===e.key){e.preventDefault(),p(!1,this.props.reverseOrder||!1,this.focusableItems,this.toggleElement)===this.toggleElement&&this.setState({isExpanded:!1})}}else"ArrowUp"!==e.key&&"Up"!==e.key||(e.preventDefault(),this.setState({isExpanded:!0}))}),m(this,"handleMouseLeave",()=>{this.setState({isExpanded:!1})}),this.state={isExpanded:!1}}render(){const e=this.props,t=e.className,n=e.classNamePrefix,s=e.classes,i=e.items,l=e.collapsedToggleContent,c=e.expandedToggleContent,p=e.reverseOrder,m=e.label,h=i?p?i.map(this.renderSelectorItem).reverse():i.map(this.renderSelectorItem):null,f=Object(r.g)({classes:s,classNamePrefix:n,selectClasses:this.state.isExpanded?u:d,classNames:[t,"selector",this.state.isExpanded?"expanded":"collapsed"]}),b=Object(r.g)({classes:s,selectClasses:g,classNamePrefix:n,classNames:["selector-items"]}),y=s?{toggleButtonOff:s.selectorToggle||s.selectorToggleOff,toggleButtonOn:s.selectorToggleOn}:null;return a.createElement("div",{className:f,onKeyUp:this.handleKeyUp,onKeyDown:this.handleKeyDown,onMouseLeave:this.handleMouseLeave},a.createElement(o.a,{isOn:this.state.isExpanded,className:"selector-toggle",classNamePrefix:n,classes:y,label:m,onToggle:this.handleToggle,onRef:this.onToggleRef,toggledOffContent:l,toggledOnContent:c}),a.createElement("div",{role:"listbox",className:b},h))}}m(h,"defaultProps",{useDefaultClassNaming:!0});t.a=h;h.__docgenInfo={description:"",methods:[{name:"onToggleRef",docblock:null,modifiers:[],params:[{name:"toggleElement",type:{name:"HTMLElement",nullable:!0}}],returns:null},{name:"handleToggle",docblock:null,modifiers:[],params:[{name:"isOn",type:{name:"boolean"}}],returns:null},{name:"handleItemRef",docblock:null,modifiers:[],params:[{name:"itemElement",type:{name:"HTMLElement",nullable:!0}},{name:"index",type:{name:"number"}}],returns:null},{name:"renderSelectorItem",docblock:null,modifiers:[],params:[{name:"item",type:{name:"any"}},{name:"index",type:{name:"number"}}],returns:null},{name:"handleKeyDown",docblock:null,modifiers:[],params:[{name:"keyboardEvent",type:{name:"KeyboardEvent",alias:"KeyboardEvent"}}],returns:null},{name:"handleKeyUp",docblock:null,modifiers:[],params:[{name:"keyboardEvent",type:{name:"KeyboardEvent",alias:"KeyboardEvent"}}],returns:null},{name:"handleMouseLeave",docblock:null,modifiers:[],params:[],returns:null}],displayName:"Selector",props:{useDefaultClassNaming:{defaultValue:{value:"true",computed:!1},required:!1},items:{required:!0,flowType:{name:"Array",elements:[{name:"any"}],raw:"Array<any>"},description:""},selectedItem:{required:!1,flowType:{name:"any"},description:""},reverseOrder:{required:!1,flowType:{name:"boolean"},description:""},itemClassName:{required:!1,flowType:{name:"string"},description:""},collapsedToggleContent:{required:!1,flowType:{name:"ReactNode",raw:"React.Node"},description:""},expandedToggleContent:{required:!1,flowType:{name:"ReactNode",raw:"React.Node"},description:""},label:{required:!1,flowType:{name:"string"},description:""},itemMapper:{required:!0,flowType:{name:"signature",type:"function",raw:"any => ItemData",signature:{arguments:[{name:"",type:{name:"any"}}],return:{name:"ItemData"}}},description:""},onSelect:{required:!1,flowType:{name:"signature",type:"function",raw:"any => void",signature:{arguments:[{name:"",type:{name:"any"}}],return:{name:"void"}}},description:""}}}},"./src/replay/components/generic/ToggleButton/ToggleButton.js":function(e,t,n){"use strict";var a=n("./node_modules/react/index.js"),r=n("./src/replay/components/common.js");function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const s=e=>e.toggleButtonOff||e.toggleButton,i=e=>e.toggleButtonOn||e.toggleButton;class l extends a.Component{constructor(...e){super(...e),o(this,"handleClick",()=>this.props.onToggle&&this.props.onToggle(!this.props.isOn)),o(this,"handleKeyDown",Object(r.f)(["Enter"," "])),o(this,"handleKeyUp",e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this.handleClick())})}render(){const e=this.props,t=e.isOn,n=e.label,o=e.className,l=e.classNamePrefix,c=e.toggledOnContent,p=e.toggledOffContent,m=e.onRef,d=e.classes,u=t?"toggled-on":"toggled-off",g=Object(r.g)({classes:d,selectClasses:t?i:s,classNamePrefix:l,classNames:[o,"toggle-button",u]}),h=t?c:p;return a.createElement("div",{role:"button","aria-pressed":t,title:n,onClick:this.handleClick,onKeyUp:this.handleKeyUp,onKeyDown:this.handleKeyDown,ref:m,className:g,tabIndex:0},a.createElement("div",{tabIndex:-1},h))}}o(l,"defaultProps",{useDefaultClassNaming:!0}),t.a=l,l.__docgenInfo={description:"Renders a button with two states - toggled on and off. When clicked, it reports back the opposite state.",methods:[{name:"handleClick",docblock:null,modifiers:[],params:[],returns:null},{name:"handleKeyUp",docblock:null,modifiers:[],params:[{name:"keyboardEvent",type:{name:"KeyboardEvent",alias:"KeyboardEvent"}}],returns:null}],displayName:"ToggleButton",props:{useDefaultClassNaming:{defaultValue:{value:"true",computed:!1},required:!1},isOn:{required:!1,flowType:{name:"boolean"},description:"Set to true if the button should be in the toggled on mode."},label:{required:!1,flowType:{name:"string"},description:"The label will appear in the title attribute of the root DOM element of the toggle button."},toggledOffContent:{required:!1,flowType:{name:"ReactNode",raw:"React.Node"},description:"The button content to be displayed when the button is toggled off."},toggledOnContent:{required:!1,flowType:{name:"ReactNode",raw:"React.Node"},description:"The button content to be displayed when the button is toggled on."},onToggle:{required:!1,flowType:{name:"signature",type:"function",raw:"boolean => void",signature:{arguments:[{name:"",type:{name:"boolean"}}],return:{name:"void"}}},description:"A callback method that will be invoked when the button is clicked and the value toggled. If the button has been toggled on, true is passed to the callback."},onRef:{required:!1,flowType:{name:"signature",type:"function",raw:"(?HTMLElement) => void",signature:{arguments:[{name:"",type:{name:"HTMLElement",nullable:!0}}],return:{name:"void"}}},description:"A callback method invoked with the rendered button element, for focus purposes."}}}},"./src/replay/docs/mdx-helpers/ShowCase.js":function(e,t,n){"use strict";var a=n("./node_modules/react/index.js");n("./src/replay/replay-default.css");function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class s extends a.Component{constructor(e){super(e),o(this,"setProperties",e=>this.setState((e=>{const t={};return Object.keys(e).forEach(n=>{let a=e[n];switch(n){case"selectedAudioTrack":t.currentAudioTrack=a;break;case"selectedTextTrack":t.currentTextTrack=a;break;default:t[n]=a}}),t})(e))),this.state={}}render(){const e=this.setProperties,t=this.state,n=this.props,s=n.render,i=n.height,l=i?{width:"100%",height:i}:{width:"100%"};return a.createElement("div",null,a.createElement("div",{style:l}),a.createElement("div",{className:"replay-controls-bar",style:{justifyContent:"center"}},s(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},t,{setProperties:e}))))}}t.a=s,s.__docgenInfo={description:"",methods:[{name:"setProperties",docblock:null,modifiers:[],params:[{name:"props",type:{name:"PlaybackProps",alias:"PlaybackProps"}}],returns:null}],displayName:"ShowCase",props:{render:{required:!0,flowType:{name:"signature",type:"function",raw:"(VideoStreamState & { setProperties: PlaybackProps => void }) => React.Node",signature:{arguments:[{name:"",type:{name:"intersection",raw:"VideoStreamState & { setProperties: PlaybackProps => void }",elements:[{name:"VideoStreamState"},{name:"signature",type:"object",raw:"{ setProperties: PlaybackProps => void }",signature:{properties:[{key:"setProperties",value:{name:"signature",type:"function",raw:"PlaybackProps => void",signature:{arguments:[{name:"",type:{name:"PlaybackProps"}}],return:{name:"void"}},required:!0}}]}}]}}],return:{name:"ReactNode",raw:"React.Node"}}},description:""},height:{required:!1,flowType:{name:"string"},description:""}}}},"./src/replay/docs/mdx-helpers/SimpleTable.js":function(e,t,n){"use strict";var a=n("./node_modules/react/index.js");function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const i={padding:0,tableLayout:"auto",boxShadow:"0 0 0 1px #CED4DE",borderSpacing:0,borderColor:"gray",borderCollapse:"collapse",borderStyle:"hidden",borderRadius:"4px",overflowY:"hidden",fontSize:"14px",color:"#13161F",width:"100%",display:"table"},l={color:"#7D899C",background:"#EEF1F5",textAlign:"left",fontSize:"14px",borderSpacing:0,borderCollapse:"collapse"},c={orderSpacing:0,borderCollapse:"collapse"},p={padding:"20px",verticalAlign:"top"},m=o({},p,{fontStyle:"italic",opacity:.5}),d=o({},p,{fontFamily:'"Source Code Pro",monospace',whiteSpace:"nowrap"}),u=({rows:e})=>{const t=e?e.map(e=>Object.values(e).join("-")).join("-"):"";if(e&&e.length){const n=Object.keys(e[0]);return a.createElement("table",{style:i},a.createElement("thead",{style:l},a.createElement("tr",{style:c},n.map(e=>a.createElement("th",{key:"header-"+e,style:p},e)))),a.createElement("tbody",null,e.map((e,n)=>a.createElement("tr",{key:t+"-row-"+n,style:c},Object.values(e).map((e,r)=>{return a.createElement("td",{key:t+"-cell-"+n+"-"+r,style:(o=e,""===o?m:d)},(e=>""===e?"none":e)(e));var o})))))}};t.a=u,u.__docgenInfo={description:"",methods:[],displayName:"SimpleTable",props:{rows:{required:!1,flowType:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ [string]: string }",signature:{properties:[{key:{name:"string"},value:{name:"string",required:!0}}]}}],raw:"Array<{ [string]: string }>"},description:""}}}},"./src/replay/docs/props-footnote.md":function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n("./node_modules/react/index.js"),r=n.n(a),o=n("./node_modules/@mdx-js/tag/dist/index.js");function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}class i extends r.a.Component{constructor(e){super(e),this.layout=null}render(){const e=this.props,t=e.components;s(e,["components"]);return r.a.createElement(o.MDXTag,{name:"wrapper",components:t},r.a.createElement(o.MDXTag,{name:"p",components:t},"Props marked with \u21d8 are updated with the video streamer's ",r.a.createElement(o.MDXTag,{name:"a",components:t,parentName:"p",props:{href:"/reference/observable-stream-state"}},"state property")," having the same name, when connected by the ",r.a.createElement(o.MDXTag,{name:"a",components:t,parentName:"p",props:{href:"/architecture/connected-controls#connecting-the-controls"}},r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"a"},"connectControl()")," HOC"),". The \ufe0e",r.a.createElement(o.MDXTag,{name:"inlineCode",components:t,parentName:"p"},"setProperties()")," callback prop is marked with \ufe0e\u21d7 because it is connected for changing the playback state. More info in the architecture description of ",r.a.createElement(o.MDXTag,{name:"a",components:t,parentName:"p",props:{href:"/architecture/overview#arrows-and-boxes"}},"two-way data flow"),"."))}}i.__docgenInfo={description:"",methods:[],displayName:"MDXContent"}},"./src/replay/replay-default.css":function(e,t,n){}}]);
//# sourceMappingURL=components-controls-quality-selector-quality-selector.153fdafba047ba4f55eb.js.map